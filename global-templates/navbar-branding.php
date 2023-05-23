<?php
/**
 * Navbar branding
 *
 * @package Understrap
 * @since 1.2.0
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

if ( ! has_custom_logo() ) { ?>

	<?php if ( is_front_page() && is_home() ) : ?>

		<h1 class="navbar-brand mb-0">
			<a rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="url">
				<?php bloginfo( 'name' ); ?>
			</a>
		</h1>

	<?php else : ?>

		<a class="navbar-brand" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" itemprop="url">
			<?php bloginfo( 'name' ); ?>
		</a>

	<?php endif; ?>

	<?php
} else {
  if (has_custom_logo()) {
    $text_logo_id = get_theme_mod( 'custom_logo' );
    $image = wp_get_attachment_image_url( $text_logo_id, 'full');
    $text_icon = get_theme_mod('icon');
    echo '<a href="'. esc_url( home_url( '/' ) ) .'" class="navbar-brand custom-logo-link">';
    if ($text_icon) {
      echo '<img width="38" height="34" class="custom-icon-logo img-fluid" src="' . $text_icon . '" alt="' . get_bloginfo() . 'Icon"> <img width="163" height="30" class="custom-text-logo img-fluid" src="' . $image . '" alt="' . get_bloginfo() . ' Text">';
    } else {
      echo '<img width="163" height="30" class="custom-text-logo img-fluid" src="' . $image . '" alt="' . get_bloginfo() . ' Text">';
    }
    echo '</a>';
  }
}
