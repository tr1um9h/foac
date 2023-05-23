<?php
	if (!class_exists('FOAC')) {
		class FOAC
		{

			/**
			 * Static property to hold our singleton instance
			 *
			 */
			static $instance = false;


			/**
			 * If an instance exists, this returns it.  If not, it creates one and
			 * returns it.
			 *
			 * @return FOAC
			 */
			public static function init()
			{
				if (!self::$instance) {
					self::$instance = new self;
				}
				return self::$instance;
			}


			/**
			 * This is our constructor
			 *
			 * @return void
			 */

			/**
			 * changes wordpress default search functionality from '/?s=searchterm' to '/search/searchterm'
			 */
			public function wpb_change_search_url()
			{
				if (is_search() && !empty($_GET['s'])) {
					wp_redirect(home_url("/search/") . urlencode(get_query_var('s')));
					exit();
				}
			}


			/*****************************************************************************************************************
			 * Below are custom functions, specifically for this theme, and for handling special string helper functions
			 *****************************************************************************************************************/


			/**
			 * User Friendly Format of Phone Number
			 */
			public static function format_phonenumber($phoneString)
			{

				$from = trim($phoneString);
				$formatPhoneNumber = ($from != "") ? sprintf("(%s) %s-%s", substr($from, 0, 3), substr($from, 3, 3),
					substr($from, 6, 4)) : "";

				return $formatPhoneNumber;
			}


			/**
			 * format phone number to click to call format
			 */
			public static function click_to_call($phoneString)
			{

				$remove = ["(", ")", " "];
				$add = ["", "", "-"];
				$formatPhoneNumber = str_replace($remove, $add, $phoneString);

				return $formatPhoneNumber;
			}


			/**
			 * Gets percentage for ratings 0 to 5, rounded to the first decimal
			 */
			public static function get_rating_percent($rating)
			{
				$percent = round((round($rating, 1) / 5), 1, PHP_ROUND_HALF_ODD) * 100;

				return $percent;
			}

			public static function encode($string)
			{
				return mb_encode_numericentity($string, [0x000000, 0x10ffff, 0, 0xffffff], 'UTF-8');
			}

			public static function apostrophe($string)
			{
				$last_char = substr($string, -1);
				$apostrophe = '';
				if ($last_char === 's') {
					$apostrophe = '\'';
				} else {
					$apostrophe = '\'s';
				}
				return $string . $apostrophe;
			}

			public static function button($button, $style)
			{
				// if the button is inside an ACF repeater it is handled differently
				if ( isset( $button['value'] ) ) {
					$button = $button['value'];
				}
				$href = '';
        $size = '';
				$tag = 'a';
				$target = '';
				$data_target = '';
				$data_toggle = '';
				$disabled = '';
        $data_desktop = '';
        $video_button_class = '';

        if ( isset( $button['icon'] ) ) {
          if ($button['icon_placement'] == 'before') {
            $text = $button['icon'] . '<span>'.$button['text'].'</span>';
          } else if ($button['icon_placement'] == 'after') {
	          $text = '<span>' . $button['text'] . '</span>' . $button['icon'];
          } else if (isset($button['text']) && $button['icon_placement'] == '') {
	          $text = $button['text'];
          } else {
            $text  = $button['icon'];
          }
        } else {
          $text = $button['text'];
        }

				// if style variable is not empty, append a space
				if ($style) $style =  $style. ' ';
        if ($button['size'] == 'btn-sm') {
	        $size = $button['size'] . ' ';
          $data_desktop = 'data-desktop="btn-sm"';
        } else if ($button['size']) {
	        $size = $button['size'] . ' ';
        }
				if ($button['page_anchor']=='form-block') {
					$button_id = ' id="contact"';
				} else {
					$button_id = '';
				}


				// depending on the link type, href content is different and if not linked <a> tag is replaced with <span>
				switch ($button['link_type']) {
					case 'page_link':
						if (!empty($button['page_anchor'])) {
							$href = $button['page_link'].'#'.$button['page_anchor'];
						} else {
							$href = $button['page_link'];
						}

						break;
					case 'file':
						$href = $button['file_url'];
						$target = 'target= "_blank"';
						break;
					case 'external_url':
						$href = $button['external_url'];
						$target = 'target= "_blank"';
						break;
					case 'page_anchor':
						$href = '#' . $button['page_anchor'];
						break;
          case 'email':
            $href = 'mailto:' . $button['email_phone'];
            break;
          case 'phone':
            $href = 'tel:+1' . $button['email_phone'];
            break;
					case 'modal':
            $tag = 'button';
						$data_target = 'data-bs-target="#'.$button['button_target'].'-modal"';
						$data_toggle = 'data-bs-toggle="modal"';
						$button_id = ' id="modal-link"';
            if ($button['modal_content']['content_type'] == 'video') {
              $video_button_class = ' video';
            }
						break;
					case 'none':
						$tag = 'button';
						$disabled = 'disabled="disabled"';
						break;
				}

				echo '<' . $tag . $button_id . ' class="' . $style . $size . $button['style'] . $video_button_class . '"'. $data_toggle . $data_target . $data_desktop .' href="' . $href . '" role="button"'. $target . $disabled .'>' . $text . '</' . $tag . '>';

				if($button['link_type'] === 'modal') {?>
					<div class="video-modal modal fade" id="<?php echo $button['button_target']?>-modal" tabindex="-1" role="dialog" aria-labelledby="<?php echo $button['button_target']?>-modal" aria-hidden="true">
						<div class="modal-dialog modal-dialog-centered modal-xl">
							<div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
								<div class="modal-body">
									<?php if( !empty($button['modal_content']) ) {
										$content_type = $button['modal_content']['content_type'];
										if ($content_type == 'form') { ?>
											<?php $form = $button['form'];
											gravity_form( $form, false, false, false, '', true);
											if (!empty(get_option('form_disclaimer'))) {?>
												<div class="legal"><?php echo get_option('form_disclaimer'); ?></div>
											<?php }
										} else if ($content_type == 'video') {
											$video_embed = $button['modal_content']['video'];
											if (!empty($video_embed)) {
												preg_match('/src="(.+?)"/', $video_embed, $matches);
                        $src = $matches[1];
                        $new_src = '';
                        $class = '';
                        if( strpos($src, 'youtube') !== false) {
                          $params = array(
                            'controls' => 1,
                            'hd' => 1,
                            'autohide' => 1,
                            'autoplay' => 1
                          );
                          $new_src = add_query_arg($params, $src);
                          $class = 'youtube';
                        } elseif( strpos($src, 'vimeo') !== false) {
                          $new_src = $src;
                          $class = 'vimeo';
                        }
                      } ?>

											<div class="ratio ratio-16x9 <?php if($class): echo ' '.$class; endif;?>" data-src="<?php echo $new_src?>">
                        <div id="<?php echo $button['button_target']?>-modal-<?php echo $class?>-player"></div>
											</div>
										<?php } ?>
									<?php } ?>
								</div>
							</div>
						</div>
					</div>
				<?php }
			}

			public static function getFormByName($name)
			{
				$forms = GFAPI::get_forms();
				foreach ($forms as $key => $form) {
					if($form['title'] === $name){
						return $form['id'];
					}
				}
				return false;
			}

			public static function est_reading_time( $content = '', $wpm = 250 ) {
				$clean_content = strip_shortcodes( $content );
				$clean_content = strip_tags( $clean_content );
				$word_count = str_word_count( $clean_content );
				$time = ceil( $word_count / $wpm );
				return $time;
			}

			public static function breadcrumb() {

				$showOnHome = 0; // 1 - show breadcrumbs on the homepage, 0 - don't show
				$delimiter = ' / '; // delimiter between crumbs
				$home = 'Home'; // text for the 'Home' link
				$showCurrent = 1; // 1 - show current post/page title in breadcrumbs, 0 - don't show
				$before = '<strong class="active">'; // tag before the current crumb
				$after = '</strong>'; // tag after the current crumb

				global $post;
				$homeLink = get_bloginfo('url');

				if (is_home() || is_front_page()) {

					if ($showOnHome == 1) echo '<div class="breadcrumbs b4"><a href="' . $homeLink . '">' . $home . '</a></></div>';

				} else {

					echo '<div class="breadcrumbs b4"><a href="' . $homeLink . '">' . $home . '</a> <span class="divider">' . $delimiter . '</span>';

					if ( is_category() ) {
						global $wp_query;
						$cat_obj = $wp_query->get_queried_object();
						$thisCat = $cat_obj->term_id;
						$thisCat = get_category($thisCat);
						$parentCat = get_category($thisCat->parent);
						if ($thisCat->parent != 0) echo(get_category_parents($parentCat, TRUE, ' ' . $delimiter . ' '));
						echo $before . 'Archive by category "' . single_cat_title('', false) . '"' . $after;

					} elseif ( is_search() ) {
						echo $before . 'Search results for "' . get_search_query() . '"' . $after;

					} elseif ( is_day() ) {
						echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $delimiter . ' ';
						echo '<a href="' . get_month_link(get_the_time('Y'),get_the_time('m')) . '">' . get_the_time('F') . '</a> ' . $delimiter . ' ';
						echo $before . get_the_time('d') . $after;

					} elseif ( is_month() ) {
						echo '<a href="' . get_year_link(get_the_time('Y')) . '">' . get_the_time('Y') . '</a> ' . $delimiter . ' ';
						echo $before . get_the_time('F') . $after;

					} elseif ( is_year() ) {
						echo $before . get_the_time('Y') . $after;

					} elseif ( is_single() && !is_attachment() ) {
						if ( get_post_type() == 'authors' ) {
							$post_type = get_post_type_object(get_post_type());
							echo $post_type->labels->singular_name . ' ' . $delimiter . ' ';
							if ($showCurrent == 1) echo $before . get_the_title() . $after;
						} else if ( get_post_type() != 'post' ) {
							$post_type = get_post_type_object(get_post_type());
							$slug = $post_type->rewrite;
							echo '<a href="' . $homeLink . '/' . $slug['slug'] . '/">' . $post_type->labels->singular_name . '</a> ' . $delimiter . ' ';
							if ($showCurrent == 1) echo $before . get_the_title() . $after;
						} else {
							$cat = get_the_category(); $cat = $cat[0];
							$cats = get_category_parents($cat, TRUE, '');
							if ($showCurrent == 0) $cats = preg_replace("/^(.+)\s$delimiter\s$/", "$1", $cats);
							$post_type = get_post_type_object(get_post_type());
							$slug = $post_type->rewrite;
							echo '<a href="' . $homeLink . '/' . $slug . '/">' . $post_type->labels->singular_name . '</a> ' . $delimiter . $cats;
							//if ($showCurrent == 1) echo $before . get_the_title() . $after;
						}

					} elseif ( !is_single() && !is_page() && get_post_type() != 'post' && !is_404() ) {
						$post_type = get_post_type_object(get_post_type());
						echo $before . $post_type->labels->singular_name . $after;

					} elseif ( is_attachment() ) {
						$parent = get_post($post->post_parent);
						$cat = get_the_category($parent->ID); $cat = $cat[0];
						echo get_category_parents($cat, TRUE, ' ' . $delimiter . ' ');
						echo '<a href="' . get_permalink($parent) . '">' . $parent->post_title . '</a> ' . $delimiter . ' ';
						if ($showCurrent == 1) echo $before . get_the_title() . $after;

					} elseif ( is_page() && !$post->post_parent ) {
						if ($showCurrent == 1) echo $before . get_the_title() . $after;

					} elseif ( is_page() && $post->post_parent ) {
						$parent_id  = $post->post_parent;
						$breadcrumbs = array();
						while ($parent_id) {
							$page = get_page($parent_id);
							$breadcrumbs[] = '<a href="' . get_permalink($page->ID) . '">' . get_the_title($page->ID) . '</a>';
							$parent_id  = $page->post_parent;
						}
						$breadcrumbs = array_reverse($breadcrumbs);
						foreach ($breadcrumbs as $crumb) echo $crumb . ' ' . $delimiter . ' ';
						if ($showCurrent == 1) echo $before . get_the_title() . $after;

					} elseif ( is_tag() ) {
						echo $before . 'Posts tagged "' . single_tag_title('', false) . '"' . $after;

					} elseif ( is_author() ) {
						global $author;
						$userdata = get_userdata($author);
						echo $before . 'Articles posted by ' . $userdata->display_name . $after;

					} elseif ( is_404() ) {
						echo $before . 'Error 404' . $after;
					}

					if ( get_query_var('paged') ) {
						if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ' (';
						echo __('Page') . ' ' . get_query_var('paged');
						if ( is_category() || is_day() || is_month() || is_year() || is_search() || is_tag() || is_author() ) echo ')';
					}

					echo '</div>';

				}
			}

			public static function parseTag($content, $tg)
			{
				if (!empty($content)) {
					$dom = new DOMDocument;
					$dom->loadHTML($content);
					$attr = [];
					foreach ($dom->getElementsByTagName($tg) as $tag) {
						foreach ($tag->attributes as $attribName => $attribNodeVal) {
							$attr[$attribName] = $tag->getAttribute($attribName);
						}
					}
					return $attr;
				}
        return false;
			}

      public static function randomNumber($n) {
	      $characters = '0123456789';
	      $randomString = '';
	      for ($i = 0; $i < $n; $i++) {
		      $index = rand(0, strlen($characters) - 1);
		      $randomString .= $characters[$index];
	      }
	      return $randomString;
      }
		}
		// Instantiate our class
		$FOAC = FOAC::init();
	}
