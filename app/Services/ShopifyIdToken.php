<?php

namespace App\Services;

use Illuminate\Auth\AuthenticationException;

class ShopifyIdToken
{
    public function shopFromBearer(?string $authorization): string
    {
        if (!is_string($authorization) || !preg_match('/^Bearer ([A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+)$/', $authorization, $match)) {
            throw new AuthenticationException('A Shopify ID token is required.');
        }

        $secret = config('block_builder.client_secret');
        $clientId = config('block_builder.client_id');
        if (!is_string($secret) || $secret === '' || !is_string($clientId) || $clientId === '') {
            throw new AuthenticationException('Shopify app credentials are not configured.');
        }

        [$header64, $payload64, $signature64] = explode('.', $match[1]);
        $header = $this->decodeJson($header64);
        $payload = $this->decodeJson($payload64);
        $signature = $this->decode($signature64);

        if (($header['alg'] ?? null) !== 'HS256' || ($header['typ'] ?? null) !== 'JWT') {
            throw new AuthenticationException('Invalid Shopify token.');
        }
        if (!hash_equals(hash_hmac('sha256', $header64.'.'.$payload64, $secret, true), $signature)) {
            throw new AuthenticationException('Invalid Shopify token.');
        }

        $now = time();
        if (($payload['aud'] ?? null) !== $clientId
            || !is_numeric($payload['exp'] ?? null) || (int) $payload['exp'] <= $now
            || !is_numeric($payload['nbf'] ?? null) || (int) $payload['nbf'] > $now
            || !is_numeric($payload['iat'] ?? null) || (int) $payload['iat'] > $now) {
            throw new AuthenticationException('Expired or invalid Shopify token.');
        }

        $destination = parse_url((string) ($payload['dest'] ?? ''));
        $issuer = parse_url((string) ($payload['iss'] ?? ''));
        $shop = strtolower((string) ($destination['host'] ?? ''));
        if (($destination['scheme'] ?? '') !== 'https'
            || ($issuer['scheme'] ?? '') !== 'https'
            || $shop === '' || ($issuer['host'] ?? '') !== $shop
            || !preg_match('/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/', $shop)) {
            throw new AuthenticationException('Invalid Shopify store.');
        }

        return $shop;
    }

    private function decodeJson(string $value): array
    {
        $decoded = json_decode($this->decode($value), true);
        if (!is_array($decoded)) throw new AuthenticationException('Invalid Shopify token.');
        return $decoded;
    }

    private function decode(string $value): string
    {
        $decoded = base64_decode(strtr($value, '-_', '+/'), true);
        if ($decoded === false || rtrim(strtr(base64_encode($decoded), '+/', '-_'), '=') !== $value) {
            throw new AuthenticationException('Invalid Shopify token.');
        }
        return $decoded;
    }
}
