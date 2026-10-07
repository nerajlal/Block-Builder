<?php

use App\Services\ShopifyIdToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::redirect('/', '/demo');
Route::get('/demo', fn () => view('catalog', ['demo' => true]))->name('demo');
Route::get('/app', fn () => view('catalog', ['demo' => false]))->name('app');

Route::post('/app/bootstrap', function (Request $request, ShopifyIdToken $tokens) {
    $shop = $tokens->shopFromBearer($request->header('Authorization'));
    $clientId = config('block_builder.client_id');

    return response()->json([
        'shop' => $shop,
        'components' => collect(config('block_builder.components'))->map(function ($component) use ($shop, $clientId) {
            $component['install_url'] = 'https://'.$shop.'/admin/themes/current/editor?'.http_build_query([
                'template' => 'product',
                'addAppBlockId' => $clientId.'/'.$component['handle'],
                'target' => 'newAppsSection',
            ], '', '&', PHP_QUERY_RFC3986);
            return $component;
        })->all(),
    ]);
})->name('app.bootstrap');
