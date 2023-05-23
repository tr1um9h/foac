<?php

add_filter( 'gform_stripe_cancel_url', function ( $url, $form_id ) {
  return 'https://www.financeofamerica.com/about/philanthropy/';
}, 10, 2 );

add_filter( 'gform_stripe_success_url', function ($url, $form_id, $query ) {
  GFCommon::log_debug( __METHOD__ . '(): Original URL: ' . $url );
  // Replace example.com with your site domain.
  $components = parse_url( $url);
  $url = str_replace( $components['host'].':'.$components['port'], 'www.financeofamerica.com', $url );
  GFCommon::log_debug( __METHOD__ . '(): New URL: ' . $url );
  return $url;
}, 10, 3 );
