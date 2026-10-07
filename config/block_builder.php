<?php

return [
    'client_id' => env('SHOPIFY_CLIENT_ID'),
    'client_secret' => env('SHOPIFY_CLIENT_SECRET'),
    'components' => [
        ['handle' => 'trust-strip', 'name' => 'Trust strip', 'category' => 'Trust', 'description' => 'A refined row for real store policies and payment reassurance.', 'placement' => 'Product page', 'accent' => '#e7ece8'],
        ['handle' => 'delivery-note', 'name' => 'Delivery note', 'category' => 'Shipping', 'description' => 'A merchant-controlled dispatch message without an invented delivery date.', 'placement' => 'Product page', 'accent' => '#e7edf5'],
        ['handle' => 'product-highlights', 'name' => 'Product highlights', 'category' => 'Product info', 'description' => 'Three concise, editable reasons to choose a product.', 'placement' => 'Product page', 'accent' => '#f2e9e2'],
        ['handle' => 'offer-callout', 'name' => 'Offer callout', 'category' => 'Promotions', 'description' => 'Present a real offer with clear terms and an optional link.', 'placement' => 'Product page', 'accent' => '#f1e9ee'],
        ['handle' => 'stock-message', 'name' => 'Stock message', 'category' => 'Product info', 'description' => 'Show availability from Shopify inventory without artificial scarcity.', 'placement' => 'Product page', 'accent' => '#ebe9f2'],
    ],
];
