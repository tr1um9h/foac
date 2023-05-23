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

<footer>
  <div class="site-footer" id="wrapper-footer">
    <div class="container-xl">
      <div class="row justify-content-between footer-navs-row">
        <div class="col-12 footer-navs">
          <div class="row justify-content-between">
            <?php if (has_nav_menu('our-companies')) : ?>
              <div class="col-12 col-sm-6 col-md-3 site-footer-nav">
                <h6 class="nav-title">Our Companies</h6>
                <?php wp_nav_menu(
                  array(
                    'theme_location' => 'our-companies',
                    'menu_class' => 'list-unstyled',
                  )
                ); ?>
              </div>
            <?php endif; ?>
            <?php if (has_nav_menu('about-us')) : ?>
              <div class="col-12 col-sm-6 col-md-3 site-footer-nav">
                <h6 class="nav-title">About Us</h6>
                <?php wp_nav_menu(
                  array(
                    'theme_location' => 'about-us',
                    'menu_class' => 'list-unstyled',
                  )
                ); ?>
              </div>
            <?php endif; ?>
            <?php if (has_nav_menu('resources')) : ?>
              <div class="col-12 col-sm-6 col-md-3 site-footer-nav">
                <h6 class="nav-title">Resources</h6>
                <?php wp_nav_menu(
                  array(
                    'theme_location' => 'resources',
                    'menu_class' => 'list-unstyled',
                  )
                ); ?>
              </div>
            <?php endif; ?>
            <?php if (!empty(get_option('disclaimer')) || !empty(get_option('facebook')) || !empty(get_option('twitter')) || !empty(get_option('linkedin'))) : ?>
              <div class="col-12 col-sm-6 col-md-3 legal-holder">
                <?php if (!empty(get_option('facebook')) || !empty(get_option('twitter')) || !empty(get_option('linkedin'))) { ?>
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
                <?php } ?>
                <?php if (has_nav_menu('privacy')) : ?>
                  <?php wp_nav_menu(
                    array(
                      'theme_location' => 'privacy',
                      'menu_class' => 'list-unstyled',
                    )
                  ); ?>
                <?php endif;?>
                <p class="legal disclaimer">
                  <?php echo get_option('disclaimer'); ?>
                </p>
              </div>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div><!-- container -->
  </div><!-- #wrapper-footer -->
</footer>

<?php // Closing div#page from php. ?>
</div><!-- #page -->
<?php wp_footer(); ?>

</body>
</html>

