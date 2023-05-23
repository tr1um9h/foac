<?php
if (function_exists('acf_add_options_page')) {

  acf_add_options_page(array(
    'page_title'  => __('404 Page'),
    'menu_title'  => __('404 Page'),
    'menu_slug'   => '404',
    'redirect'    => false,
  ));

}
