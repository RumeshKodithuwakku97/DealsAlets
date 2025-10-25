<?php
// Add these to your theme's functions.php file

// Enable CORS for React app
function enable_cors() {
    header("Access-Control-Allow-Origin: " . get_http_origin());
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Credentials: true");
    header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
}

add_action('init', 'enable_cors');

// Add custom REST API fields for deals
function add_deals_custom_fields() {
    register_rest_field('deals', 'meta', array(
        'get_callback' => function($post_arr) {
            return get_post_meta($post_arr['id']);
        },
        'update_callback' => function($value, $post) {
            foreach ($value as $key => $data) {
                update_post_meta($post->ID, $key, $data);
            }
        },
        'schema' => null,
    ));
}
add_action('rest_api_init', 'add_deals_custom_fields');