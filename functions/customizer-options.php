<?php
function register_icon($wp_customize)
{
  $wp_customize->add_setting(
    'icon',
    array(
      'default' => '',
      'type' => 'theme_mod', // you can also use 'theme_mod'
      'capability' => 'manage_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Upload_Control(
    $wp_customize,
    'icon',
    array(
      'label' => __('Icon', 'foac'),
      'description' => __('Upload Icon Separate from Logo Text', 'foac'),
      'settings' => 'icon',
      'priority' => 9,
      'section' => 'title_tagline',
    )
  ));
}

add_action('customize_register', 'register_icon');
function register_foac_blocks($wp_customize)
{
  $wp_customize->add_section(
    'custom_foac_blocks',
    array(
      'title' => __('FOAC Blocks', 'foac'),
      'capability' => 'edit_theme_options',
      'description' => __('View FOAC Block', 'foac'),
      'priority' => 20,
    )
  );

  $wp_customize->add_setting(
    'foac_blocks',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
    $wp_customize,
    'foac_blocks',
    array(
      'label' => __('FOAC Blocks', 'foac'),
      'settings' => 'foac_blocks',
      'priority' => 10,
      'section' => 'custom_foac_blocks',
      'type' => 'text',
      'input_attrs' => array(
        'readonly' => true,
      )
    )
  ));

  $wp_customize->add_setting(
    'foac_blocks_version',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
    $wp_customize,
    'foac_blocks_version',
    array(
      'label' => __('FOAC Blocks Version', 'foac'),
      'settings' => 'foac_blocks_version',
      'priority' => 10,
      'section' => 'custom_foac_blocks',
      'type' => 'text',
      'input_attrs' => array(
        'readonly' => true,
      )
    )
  ));

}

add_action('customize_register', 'register_foac_blocks');

function register_footer_settings($wp_customize)
{
  $wp_customize->add_section(
    'custom_footer_settings',
    array(
      'title' => __('Footer Settings', 'foac'),
      'capability' => 'edit_theme_options',
      'description' => __('Edit Footer Settings', 'foac'),
      'priority' => 20,
    )
  );
  $wp_customize->add_setting(
    'facebook',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
    $wp_customize,
    'facebook',
    array(
      'label' => __('Facebook Link', 'foac'),
      'settings' => 'facebook',
      'priority' => 10,
      'section' => 'custom_footer_settings',
      'type' => 'text',
    )
  ));

  $wp_customize->add_setting(
    'twitter',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
    $wp_customize,
    'twitter',
    array(
      'label' => __('Twitter Link', 'foac'),
      'settings' => 'twitter',
      'priority' => 10,
      'section' => 'custom_footer_settings',
      'type' => 'text',
    )
  ));

  $wp_customize->add_setting(
    'linkedin',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
    $wp_customize,
    'linkedin',
    array(
      'label' => __('LinkedIn Link', 'foac'),
      'settings' => 'linkedin',
      'priority' => 10,
      'section' => 'custom_footer_settings',
      'type' => 'text',
    )
  ));

  $wp_customize->add_setting(
    'youtube',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
    $wp_customize,
    'youtube',
    array(
      'label' => __('YouTube Link', 'foac'),
      'settings' => 'youtube',
      'priority' => 10,
      'section' => 'custom_footer_settings',
      'type' => 'text',
    )
  ));

  $wp_customize->add_setting(
    'disclaimer',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
    $wp_customize,
    'disclaimer',
    array(
      'label' => __('Footer Copyright', 'foac'),
      'settings' => 'disclaimer',
      'priority' => 10,
      'section' => 'custom_footer_settings',
      'type' => 'textarea',
    )
  ));
}

add_action('customize_register', 'register_footer_settings');

function register_default_form_settings($wp_customize)
{
  $wp_customize->add_section(
    'default_disclaimers',
    array(
      'title' => __('Default Disclaimers', 'foac'),
      'capability' => 'edit_theme_options',
      'description' => __('Default Disclaimers for Site', 'foac'),
      'priority' => 20,
    )
  );

  $wp_customize->add_setting(
    'form_disclaimer',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
      $wp_customize,
      'form_disclaimer',
      array(
        'label' => __('Form Disclaimer', 'foac'),
        'settings' => 'form_disclaimer',
        'priority' => 10,
        'section' => 'default_disclaimers',
        'type' => 'textarea',
      )
    )
  );
  $wp_customize->add_setting(
    'privacy_disclaimer',
    array(
      'default' => '',
      'type' => 'option', // you can also use 'theme_mod'
      'capability' => 'edit_theme_options'
    )
  );

  $wp_customize->add_control(new WP_Customize_Control(
      $wp_customize,
      'privacy_disclaimer',
      array(
        'label' => __('Privacy Disclaimer', 'foac'),
        'settings' => 'privacy_disclaimer',
        'priority' => 10,
        'section' => 'default_disclaimers',
        'type' => 'textarea',
      )
    )
  );
}

add_action('customize_register', 'register_default_form_settings');
