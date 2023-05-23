<?php
/**
 * Header Navbar (bootstrap5)
 *
 * @package Understrap
 * @since 1.1.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$container = get_theme_mod( 'understrap_container_type' );
?>

<nav id="main-nav" class="navbar navbar-expand-md navbar-light bg-white" aria-labelledby="main-nav-label">

  <h2 id="main-nav-label" class="screen-reader-text">
    <?php esc_html_e( 'Main Navigation', 'understrap' ); ?>
  </h2>


  <div class="container-lg">

    <!-- Your site branding in the menu -->
    <?php get_template_part( 'global-templates/navbar-branding' ); ?>


  </div><!-- .container(-fluid) -->

</nav><!-- #main-nav -->
