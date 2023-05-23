<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

if (!defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}

$container = get_theme_mod('understrap_container_type');
?>

<?php get_template_part('sidebar-templates/sidebar', 'footerfull'); ?>

<footer class="no-nav">
  <div class="site-footer" id="wrapper-footer">
    <div class="container-xl">
      <?php if (!empty(get_option('disclaimer')) || !empty(get_option('facebook')) || !empty(get_option('twitter')) || !empty(get_option('linkedin'))) : ?>
      <div class="row">
        <div class="col-12">
          <div class="legal-social-holder">
            <div class="row align-items-center">
              <?php if (!empty(get_option('disclaimer'))) { ?>
                <div class="col-12 col-md-6 d-flex align-items-center">
                  <p class="legal disclaimer">
                    <?php echo get_option('disclaimer'); ?>
                  </p>
                  <?php if (has_nav_menu('privacy')) : ?>
                    <?php wp_nav_menu(
                      array(
                        'theme_location' => 'privacy',
                        'menu_class' => 'list-unstyled',
                      )
                    ); ?>
                  <?php endif;?>
                </div>
              <?php } ?>
              <?php if (!empty(get_option('facebook')) || !empty(get_option('twitter')) || !empty(get_option('linkedin'))) { ?>
                <div class="col-12 col-md-6 d-flex justify-content-md-end">
                  <div class="social-link-holder">
                    <?php if (!empty(get_option('facebook'))) { ?>
                      <a class="social-link" href="<?php echo get_option('facebook') ?>" aria-label="facebook" target="_blank">
                        <i class="fab fa-facebook" aria-hidden="true"></i>
                      </a>
                    <?php } ?>
                    <?php if (!empty(get_option('twitter'))) { ?>
                      <a class="social-link" href="<?php echo get_option('twitter') ?>" aria-label="twitter" target="_blank">
                        <i class="fab fa-twitter" aria-hidden="true"></i>
                      </a>
                    <?php } ?>
                    <?php if (!empty(get_option('linkedin'))) { ?>
                      <a class="social-link" href="<?php echo get_option('linkedin'); ?>" aria-label="linkedin" target="_blank">
                        <i class="fab fa-linkedin-in" aria-hidden="true"></i>
                      </a>
                    <?php } ?>
                    <?php if (!empty(get_option('youtube'))) { ?>
                      <a class="social-link" href="<?php echo get_option('youtube'); ?>" aria-label="youtube" target="_blank">
                        <i class="fab fa-youtube" aria-hidden="true"></i>
                      </a>
                    <?php } ?>
                  </div>
                </div>
              <?php } ?>
            </div>
          </div>
        </div>
        <?php endif; ?>
      </div><!-- container -->
    </div><!-- #wrapper-footer -->
</footer>

<?php // Closing div#page from php. ?>
</div><!-- #page -->
<?php wp_footer(); ?>

</body>
</html>

