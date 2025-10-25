<?php
/**
 * Plugin Name: LankaDeals Custom API
 * Description: Custom endpoints for LankaDeals Alert admin panel
 * Version: 1.0.0
 * Author: LankaDealsAlert
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Register custom post types
require_once plugin_dir_path(__FILE__) . 'includes/custom-post-types.php';
// Register custom API endpoints
require_once plugin_dir_path(__FILE__) . 'includes/api-endpoints.php';
// Register custom fields
require_once plugin_dir_path(__FILE__) . 'includes/custom-fields.php';

// Activation hook
register_activation_hook(__FILE__, 'lankadeals_activate');
function lankadeals_activate() {
    // Flush rewrite rules on activation
    flush_rewrite_rules();
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'lankadeals_deactivate');
function lankadeals_deactivate() {
    // Flush rewrite rules on deactivation
    flush_rewrite_rules();
}