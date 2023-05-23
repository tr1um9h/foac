<?php
// UnderStrap's includes directory.
$foac_functions_dir = 'functions';

// Array of files to include.
$foac_includes = array(
  '/setup.php',                           // Theme setup and custom theme supports.
  '/custom-functions.php',                // Custom Functions for theme.
  '/gf-functions.php',                    // GF Functions for theme.
  '/soil.php',                            // Soil Config.
  '/blocks.php',                          // Load Custom Blocks.
  '/customizer-options.php',              // Customizer Options.
  '/nav-menu.php',                        // Menu regions.
  '/wide-gutenberg.php',                  // Wide Gutenberg.
  '/body-class.php',                      // Body Class
  '/admin-bar.php',                       // WP Admin Bar CSS
  '/gf-bootstrap5.php',                   // Gravity Forms Functions for Boostrap 5
  '/acf-options.php',                     // ACF Options
  '/google-fonts.php',                    // Remove Google Fonts
  '/remove-parent-templates.php',         // Remove Parent Templates
  '/special-enqueue.php',                 // Special Enqueue
  '/gf-stripe-url.php'                    // Gravity Forms Stripe Url
);

foreach ($foac_includes as $file) {
  require_once get_theme_file_path($foac_functions_dir . $file);
}
