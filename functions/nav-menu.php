<?php
// Register Nav Menus

function register_my_menus()
{
  register_nav_menus(
    array(
      'our-companies' => __('Our Companies'),
      'about-us' => __('About Us'),
      'resources' => __('Resources'),
      'privacy' => __('Privacy'),
    )
  );
}

add_action('init', 'register_my_menus');
// End Register Nav Menus
