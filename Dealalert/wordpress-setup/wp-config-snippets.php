<?php
// Add these to your wp-config.php file for JWT authentication

// JWT Authentication Secret Key
define('JWT_AUTH_SECRET_KEY', 'your-secret-key-here');
// Enable CORS
define('JWT_AUTH_CORS_ENABLE', true);

// Optional: Increase memory limit for image handling
define('WP_MEMORY_LIMIT', '256M');

// Optional: Enable debug mode for development
// define('WP_DEBUG', true);
// define('WP_DEBUG_LOG', true);
// define('WP_DEBUG_DISPLAY', false);