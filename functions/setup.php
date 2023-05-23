<?php
	/**
	 * Understrap Child Theme functions and definitions
	 *
	 * @package UnderstrapChild
	 */

// Exit if accessed directly.
	defined( 'ABSPATH' ) || exit;



	/**
	 * Removes the parent themes stylesheet and scripts from inc/enqueue.php
	 */
	function understrap_remove_scripts() {
		wp_dequeue_style( 'understrap-styles' );
		wp_deregister_style( 'understrap-styles' );

		wp_dequeue_script( 'understrap-scripts' );
		wp_deregister_script( 'understrap-scripts' );
	}
	add_action( 'wp_enqueue_scripts', 'understrap_remove_scripts', 20 );



	/**
	 * Enqueue our stylesheet and javascript file
	 */
	function theme_enqueue_styles() {

		// Get the theme data.
		$the_theme = wp_get_theme();

		$suffix = defined( 'SCRIPT_DEBUG' ) && SCRIPT_DEBUG ? '' : '.min';
		// Grab asset urls.
		$theme_styles  = "/css/foac{$suffix}.css";
		$theme_scripts = "/js/foac{$suffix}.js";
    if (is_front_page()) {
      wp_enqueue_style_special( 'home-critical', get_stylesheet_directory_uri() . '/critical/home.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('our-partners')) {
      wp_enqueue_style_special( 'partners-critical', get_stylesheet_directory_uri() . '/critical/partners.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('homeowners')) {
      wp_enqueue_style_special( 'homeowners-critical', get_stylesheet_directory_uri() . '/critical/homeowners.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('about')) {
      wp_enqueue_style_special( 'about-critical', get_stylesheet_directory_uri() . '/critical/about.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('leadership')) {
      wp_enqueue_style_special( 'leadership-critical', get_stylesheet_directory_uri() . '/critical/leadership.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('esg')) {
      wp_enqueue_style_special( 'esg-critical', get_stylesheet_directory_uri() . '/critical/esg.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('dei')) {
      wp_enqueue_style_special( 'dei-critical', get_stylesheet_directory_uri() . '/critical/dei.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('philanthropy')) {
      wp_enqueue_style_special( 'philanthropy-critical', get_stylesheet_directory_uri() . '/critical/philanthropy.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('grant-recipients')) {
      wp_enqueue_style_special( 'grant-recipients-critical', get_stylesheet_directory_uri() . '/critical/grant-recipients.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('credit-card-giving')) {
      wp_enqueue_style_special( 'credit-card-giving-critical', get_stylesheet_directory_uri() . '/critical/credit-card-giving.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('careers')) {
      wp_enqueue_style_special( 'careers-critical', get_stylesheet_directory_uri() . '/critical/careers.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('okta-help')) {
      wp_enqueue_style_special( 'okta-help-critical', get_stylesheet_directory_uri() . '/critical/okta-help.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('contact')) {
      wp_enqueue_style_special( 'contact-critical', get_stylesheet_directory_uri() . '/critical/contact.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('terms-of-use')) {
      wp_enqueue_style_special( 'terms-of-use-critical', get_stylesheet_directory_uri() . '/critical/terms-of-use.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('privacy-policy')) {
      wp_enqueue_style_special( 'privacy-critical', get_stylesheet_directory_uri() . '/critical/privacy.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('customer')) {
      wp_enqueue_style_special( 'privacy-customer-critical', get_stylesheet_directory_uri() . '/critical/privacy-customer.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('notice-at-collection')) {
      wp_enqueue_style_special( 'privacy-notice-at-collection-critical', get_stylesheet_directory_uri() . '/critical/privacy-notice-at-collection.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('employee')) {
      wp_enqueue_style_special( 'privacy-employee-critical', get_stylesheet_directory_uri() . '/critical/privacy-employee.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if (is_page('vendor')) {
      wp_enqueue_style_special( 'privacy-vendor-critical', get_stylesheet_directory_uri() . '/critical/privacy-vendor.min.css', array(), $the_theme->get( 'Version' ), 'all', 'asyncPreload' );
    } else if( is_404() ) {
      wp_enqueue_style_special('404-critical', get_stylesheet_directory_uri() . '/critical/404.min.css', array(), $the_theme->get('Version'), 'all', 'asyncPreload');
    }
		wp_enqueue_style_special( 'foac', get_stylesheet_directory_uri() . $theme_styles, array(), $the_theme->get( 'Version' ), 'print', 'async' );
		wp_enqueue_style( 'gotham', 'https://cloud.typography.com/6638236/7561632/css/fonts.css' );
    if (!is_user_logged_in()) {
      wp_deregister_style('dashicons');
      wp_deregister_style('wp-block-library');
      wp_deregister_style('classic-theme-styles');
    }
		wp_enqueue_script_special( 'jquery', '', '', '', 'true', 'defer' );
		wp_enqueue_script_special( 'foac', get_stylesheet_directory_uri() . $theme_scripts, array('megamenu', 'megamenu-pro'), $the_theme->get( 'Version' ), true, 'defer');
		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
	}
	add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );



	/**
	 * Load the child theme's text domain
	 */
	function add_child_theme_textdomain() {
		load_child_theme_textdomain( 'understrap-child', get_stylesheet_directory() . '/languages' );
	}
	add_action( 'after_setup_theme', 'add_child_theme_textdomain' );



	/**
	 * Overrides the theme_mod to default to Bootstrap 5
	 *
	 * This function uses the `theme_mod_{$name}` hook and
	 * can be duplicated to override other theme settings.
	 *
	 * @param string $current_mod The current value of the theme_mod.
	 * @return string
	 */
	function understrap_default_bootstrap_version( $current_mod ) {
		return 'bootstrap5';
	}
	add_filter( 'theme_mod_understrap_bootstrap_version', 'understrap_default_bootstrap_version', 20 );



	/**
	 * Loads javascript for showing customizer warning dialog.
	 */
	function understrap_child_customize_controls_js() {
		wp_enqueue_script(
			'understrap_child_customizer',
			get_stylesheet_directory_uri() . '/js/customizer-controls.js',
			array( 'customize-preview' ),
			'20130508',
			true
		);
	}
	add_action( 'customize_controls_enqueue_scripts', 'understrap_child_customize_controls_js' );
