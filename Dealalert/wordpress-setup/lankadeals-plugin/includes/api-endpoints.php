<?php
// Register custom REST API routes
add_action('rest_api_init', function () {
    
    // Subscribe endpoint
    register_rest_route('lankadeals/v1', '/subscribe', array(
        'methods' => 'POST',
        'callback' => 'lankadeals_add_subscriber',
        'permission_callback' => '__return_true'
    ));
    
    // Get subscribers endpoint
    register_rest_route('lankadeals/v1', '/subscribers', array(
        'methods' => 'GET',
        'callback' => 'lankadeals_get_subscribers',
        'permission_callback' => 'lankadeals_check_admin_permission'
    ));
    
    // Delete subscriber endpoint
    register_rest_route('lankadeals/v1', '/subscribers/(?P<id>\d+)', array(
        'methods' => 'DELETE',
        'callback' => 'lankadeals_delete_subscriber',
        'permission_callback' => 'lankadeals_check_admin_permission'
    ));
    
    // Send newsletter endpoint
    register_rest_route('lankadeals/v1', '/newsletter/send', array(
        'methods' => 'POST',
        'callback' => 'lankadeals_send_newsletter',
        'permission_callback' => 'lankadeals_check_admin_permission'
    ));
    
    // Analytics endpoint
    register_rest_route('lankadeals/v1', '/analytics', array(
        'methods' => 'GET',
        'callback' => 'lankadeals_get_analytics',
        'permission_callback' => 'lankadeals_check_admin_permission'
    ));
});

// Add subscriber function
function lankadeals_add_subscriber($request) {
    $email = sanitize_email($request['email']);
    
    if (!is_email($email)) {
        return new WP_Error('invalid_email', 'Invalid email address', array('status' => 400));
    }
    
    // Check if email already exists
    $existing = get_posts(array(
        'post_type' => 'subscribers',
        'meta_query' => array(
            array(
                'key' => 'subscriber_email',
                'value' => $email
            )
        )
    ));
    
    if (!empty($existing)) {
        return new WP_Error('email_exists', 'Email already subscribed', array('status' => 400));
    }
    
    // Create subscriber post
    $subscriber_id = wp_insert_post(array(
        'post_type' => 'subscriber',
        'post_title' => $email,
        'post_status' => 'publish',
        'meta_input' => array(
            'subscriber_email' => $email,
            'subscription_date' => current_time('mysql'),
            'subscription_status' => 'active'
        )
    ));
    
    if ($subscriber_id) {
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Successfully subscribed',
            'id' => $subscriber_id
        ));
    } else {
        return new WP_Error('subscription_failed', 'Subscription failed', array('status' => 500));
    }
}

// Get subscribers function
function lankadeals_get_subscribers($request) {
    $subscribers = get_posts(array(
        'post_type' => 'subscribers',
        'posts_per_page' => -1,
        'post_status' => 'publish'
    ));
    
    $data = array();
    foreach ($subscribers as $subscriber) {
        $data[] = array(
            'id' => $subscriber->ID,
            'email' => $subscriber->post_title,
            'date' => $subscriber->post_date,
            'status' => 'active'
        );
    }
    
    return rest_ensure_response($data);
}

// Delete subscriber function
function lankadeals_delete_subscriber($request) {
    $id = $request['id'];
    
    $result = wp_delete_post($id, true);
    
    if ($result) {
        return rest_ensure_response(array(
            'success' => true,
            'message' => 'Subscriber deleted successfully'
        ));
    } else {
        return new WP_Error('delete_failed', 'Failed to delete subscriber', array('status' => 500));
    }
}

// Send newsletter function
function lankadeals_send_newsletter($request) {
    $data = $request->get_json_params();
    
    // Here you would integrate with your email service
    // For now, just return success
    return rest_ensure_response(array(
        'success' => true,
        'message' => 'Newsletter sent successfully',
        'recipients' => 150 // Example count
    ));
}

// Get analytics function
function lankadeals_get_analytics($request) {
    $deals_count = wp_count_posts('deals');
    $subscribers_count = wp_count_posts('subscribers');
    
    return rest_ensure_response(array(
        'deals' => array(
            'total' => $deals_count->publish,
            'draft' => $deals_count->draft
        ),
        'subscribers' => array(
            'total' => $subscribers_count->publish
        )
    ));
}

// Admin permission check
function lankadeals_check_admin_permission() {
    return current_user_can('manage_options');
}