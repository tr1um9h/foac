<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package understrap
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
  exit; // Exit if accessed directly.
}
get_header('no-nav');
$triangle_pixel_enabled = get_field('enable_triangle_pixel');
$gray_pixel_enabled = get_field('enable_gray_pixel');
$chevron_pixel_enabled = get_field('enable_chevron_pixel');
?>

<main id="content-wrapper">
  <?php while ( have_posts() ) :
    the_post();
    get_template_part( 'loop-templates/content', 'empty' );
  endwhile;?>
</main>

<?php get_footer('no-nav'); ?>
