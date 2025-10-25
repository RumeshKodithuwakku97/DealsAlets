<?php
// Register Deals custom post type
function register_deals_post_type() {
    $labels = array(
        'name' => 'Deals',
        'singular_name' => 'Deal',
        'menu_name' => 'Deals',
        'add_new' => 'Add New Deal',
        'add_new_item' => 'Add New Deal',
        'edit_item' => 'Edit Deal',
        'new_item' => 'New Deal',
        'view_item' => 'View Deal',
        'search_items' => 'Search Deals',
        'not_found' => 'No deals found',
        'not_found_in_trash' => 'No deals found in Trash'
    );

    $args = array(
        'labels' => $labels,
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-megaphone',
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'show_in_rest' => true,
        'rest_base' => 'deals',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
    );

    register_post_type('deals', $args);
}
add_action('init', 'register_deals_post_type');

// Register Subscribers custom post type
function register_subscribers_post_type() {
    $labels = array(
        'name' => 'Subscribers',
        'singular_name' => 'Subscriber',
        'menu_name' => 'Subscribers',
        'add_new' => 'Add New Subscriber',
        'add_new_item' => 'Add New Subscriber',
        'edit_item' => 'Edit Subscriber',
        'new_item' => 'New Subscriber',
        'view_item' => 'View Subscriber',
        'search_items' => 'Search Subscribers',
        'not_found' => 'No subscribers found',
        'not_found_in_trash' => 'No subscribers found in Trash'
    );

    $args = array(
        'labels' => $labels,
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => array('title'),
        'show_in_rest' => true,
        'rest_base' => 'subscribers',
        'rest_controller_class' => 'WP_REST_Posts_Controller',
    );

    register_post_type('subscribers', $args);
}
add_action('init', 'register_subscribers_post_type');