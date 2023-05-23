<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package Understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

get_header();

$title = get_field( 'error_title', 'option' );
$content = get_field( 'error_content', 'option' );
$image = get_field('error_image', 'option');
?>


  <main class="error-404" id="content-wrapper" style="background-image:url(<?php echo $image?>)">
    <div class="container">
      <div class="row align-items-xl-center justify-content-center h-100">
        <div class="col-md-8">
          <h1 class="display-2"><?php echo $title;?></h1>
          <p><?php echo $content?></p>
          <?php
          if( have_rows('error_buttons', 'option')):
            while( have_rows('error_buttons', 'option')) : the_row();
              $button = get_sub_field('button');
              FOAC::button($button, '');
            endwhile;
          endif;
          ?>
        </div>
      </div>
    </div>
  </main><!-- content-wrapper -->

<?php
get_footer();
