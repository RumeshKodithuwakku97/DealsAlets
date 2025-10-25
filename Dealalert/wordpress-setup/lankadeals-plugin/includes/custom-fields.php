<?php
// Add custom fields for deals
add_action('init', function() {
    if (function_exists('acf_add_local_field_group')) {
        acf_add_local_field_group(array(
            'key' => 'group_deal_info',
            'title' => 'Deal Information',
            'fields' => array(
                array(
                    'key' => 'field_original_price',
                    'label' => 'Original Price',
                    'name' => 'original_price',
                    'type' => 'number',
                    'instructions' => 'Enter the original price before discount',
                ),
                array(
                    'key' => 'field_discount_price',
                    'label' => 'Discount Price',
                    'name' => 'discount_price',
                    'type' => 'number',
                    'instructions' => 'Enter the discounted price',
                ),
                array(
                    'key' => 'field_deal_url',
                    'label' => 'Deal URL',
                    'name' => 'deal_url',
                    'type' => 'url',
                    'instructions' => 'Enter the URL for the deal',
                ),
                array(
                    'key' => 'field_store_name',
                    'label' => 'Store Name',
                    'name' => 'store_name',
                    'type' => 'text',
                    'instructions' => 'Enter the store name',
                ),
                array(
                    'key' => 'field_expiry_date',
                    'label' => 'Expiry Date',
                    'name' => 'expiry_date',
                    'type' => 'date_picker',
                    'instructions' => 'Select when this deal expires',
                ),
                array(
                    'key' => 'field_category',
                    'label' => 'Category',
                    'name' => 'category',
                    'type' => 'text',
                    'instructions' => 'Enter deal category (e.g., Electronics, Fashion)',
                ),
                array(
                    'key' => 'field_featured',
                    'label' => 'Featured Deal',
                    'name' => 'featured',
                    'type' => 'true_false',
                    'instructions' => 'Mark this as a featured deal',
                    'default_value' => 0,
                )
            ),
            'location' => array(
                array(
                    array(
                        'param' => 'post_type',
                        'operator' => '==',
                        'value' => 'deals',
                    ),
                ),
            ),
        ));
    }
});