<?php
/**
 * Block Name: Image Content
 */

// create id attribute for specific styling
$block_class = 'image-content';

$order = get_field('switch_order');
$order1 = '';
$order2 = '';
if ($order) {
  $order1 = 'order-md-1';
  $order2 = 'order-md-2';
}

$content_overlay = get_field('content_overlay');
$overlap = '';
if ($content_overlay) {
  $overlap = 'overlap';
}

$stagger_content = get_field('stagger');
$stagger = '';
if ($stagger_content) {
  $stagger = 'stagger';
}

$icon = get_field('icon');
$image = get_field('image');
$category = get_field('category');
$title = get_field('headline');
$title_size = get_field('headline_size');
$desc = get_field('description');
$disclaimer = get_field('disclaimer');
$buttons = get_field('buttons');
$button_enabled = get_field('enable_button');
$button_links_enabled = get_field('multiple_links');
$button_links = get_field('button_links');
$add_video = get_field('add_video');
$video = get_field('video');
$add_icon = get_field('add_icon');

$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?>
         class="<?php echo $block_class; ?><?php if ($overlap) : echo ' ' . $overlap; endif; ?><?php if ($stagger) : echo ' ' . $stagger; endif; ?>">
  <div class="container">
    <div class="row align-content-center">
      <?php if ($content_overlay) : ?>
        <div class="col-md-7 col-sm-12<?php if ($order2) : echo ' order-1 ' . $order2; endif; ?>">
          <?php if ($add_video):
            $id = FOAC::randomNumber('2') ?>
            <div class="image-container">
              <button class="video" type="button" data-bs-toggle="modal" data-bs-target="#video-<?php echo $id; ?>">
                <?php echo wp_get_attachment_image($video['image'], 'full'); ?>
              </button>
            </div>

            <div id="video-<?php echo $id; ?>" class="video-modal modal fade" tabindex="-1"
                 aria-labelledby="video-<?php echo $id; ?>-Label" aria-hidden="true">
              <?php
              preg_match('/src="(.+?)"/', $video['video_embed'], $matches);
              $src = $matches[1];
              $new_src = '';
              $class = '';
              // add extra params to iframe src
              if (strpos($src, 'youtube') !== false) {
                $params = array(
                  'controls' => 1,
                  'hd' => 1,
                  'autohide' => 1,
                  'autoplay' => 1
                );
                $new_src = add_query_arg($params, $src);
                $class = 'youtube';
              } elseif (strpos($src, 'vimeo') !== false) {
                $new_src = $src;
                $class = 'vimeo';
              }
              $video_embed = str_replace($src, '', $video['video_embed']); ?>
              <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="ratio ratio-16x9<?php if ($class): echo ' ' . $class; endif; ?>"
                         data-src="<?php echo $new_src ?>">
                      <div id="video-<?php echo $id; ?>-<?php echo $class ?>-player"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

          <?php elseif ($image): ?>
            <?php ?>
            <div class="image-container">
              <?php echo wp_get_attachment_image($image, 'full'); ?>
              <?php if ($add_icon): ?>
                <div class="<?php if ($icon['icon']) {
                  echo 'text-' . $icon['color'] . '-' . $icon['shade'] . ' ';
                } ?>icon-container">
                  <?php if ($icon['icon']) {
                    echo $icon['icon'];
                  } else if ($icon['use_image']) {
                    echo wp_get_attachment_image($icon['image'], 'full');
                  } ?>
                </div>
              <?php endif; ?>
            </div>
          <?php endif; ?>
        </div>
        <div class="col-md-5 col-sm-11 text-content<?php if ($add_icon): echo ' has-icon'; endif; ?><?php if ($overlap) : echo ' ' . $overlap; endif; ?><?php if ($stagger) : echo ' ' . $stagger; endif; ?><?php if ($order1) : echo ' order-2 ' . $order1; endif; ?>">
          <div class="content-container">
            <?php if ($category): ?>
              <pre class="h6"><?php echo $category; ?></pre>
            <?php endif; ?>
            <?php if ($title): ?>
            <<?php echo $title_size ?>><?php echo $title; ?></<?php echo $title_size ?>>
          <?php endif; ?>
          <?php if ($desc): ?>
            <p class="desc"><?php echo $desc; ?></p>
          <?php endif; ?>
          <?php if ($button_enabled): ?>
            <?php if ($button_links_enabled): ?>
              <div class="button-container">
                <div class="row">
                  <?php foreach ($button_links as $button_link):
                    $link = '';
                    if ($button_link['link_type'] == 'link') {
                      $link = $button_link['link'];
                    } else if ($button_link['link_type'] == 'external') {
                      $link = $button_link['external_url'];
                    } ?>
                    <div class="col-xl-4 col-lg-6 col-md-12">
                      <a class="btn btn-link-interactive btn-sm"
                         href="<?php echo $link ?>"><?php echo $button_link['name'] ?></a>
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            <?php else: ?>
              <div class="button-container">
                <?php foreach ($buttons as $button):
                  FOAC::button($button, '');
                endforeach; ?>
              </div>
            <?php endif; ?>
          <?php endif; ?>
          <?php if ($disclaimer) { ?>
            <p class="legal"><?php echo $disclaimer; ?></p>
          <?php } ?>
        </div>

      <?php else : ?>
        <div class="col-md-6 col-sm-12<?php if ($order2) : echo ' order-1 ' . $order2; endif; ?>">
          <?php if ($add_video):
            $id = FOAC::randomNumber('2') ?>
            <div class="image-container">
              <button class="video" type="button" data-bs-toggle="modal" data-bs-target="#video-<?php echo $id; ?>">
                <?php echo wp_get_attachment_image($video['image'], 'full'); ?>
              </button>
            </div>

            <div id="video-<?php echo $id; ?>" class="video-modal modal fade" tabindex="-1"
                 aria-labelledby="video-<?php echo $id; ?>-Label" aria-hidden="true">
              <?php
              preg_match('/src="(.+?)"/', $video['video_embed'], $matches);
              $src = $matches[1];
              $new_src = '';
              $class = '';
              // add extra params to iframe src
              if (strpos($src, 'youtube') !== false) {
                $params = array(
                  'controls' => 1,
                  'hd' => 1,
                  'autohide' => 1,
                  'autoplay' => 1
                );
                $new_src = add_query_arg($params, $src);
                $class = 'youtube';
              } elseif (strpos($src, 'vimeo') !== false) {
                $new_src = $src;
                $class = 'vimeo';
              }
              $video_embed = str_replace($src, '', $video['video_embed']); ?>
              <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="ratio ratio-16x9<?php if ($class): echo ' ' . $class; endif; ?>"
                         data-src="<?php echo $new_src ?>">
                      <div id="video-<?php echo $id; ?>-<?php echo $class ?>-player"></div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          <?php elseif ($image): ?>
            <?php ?>
            <div class="image-container">
              <?php echo wp_get_attachment_image($image, 'full'); ?>
              <?php if ($add_icon): ?>
                <div class="<?php if ($icon['icon']) {
                  echo 'text-' . $icon['color'] . '-' . $icon['shade'] . ' ';
                } ?>icon-container">
                  <?php if ($icon['icon']) {
                    echo $icon['icon'];
                  } else if ($icon['use_image']) { ?>
                    <img width="40" height="40" src="<?php echo $icon['image']['url']; ?>"
                         alt="<?php echo $icon['image']['alt'] ?>"/>
                  <?php } ?>
                </div>
              <?php endif; ?>
            </div>
          <?php endif; ?>
        </div>
        <div class="col-md-6 col-sm-11 text-content<?php if ($order1) {
          echo ' order-2 ' . $order1;
        } ?>">
          <div class="content-container">
            <?php if ($category): ?>
              <pre class="h6"><?php echo $category; ?></pre>
            <?php endif; ?>
            <?php if ($title): ?>
            <<?php echo $title_size ?>><?php echo $title; ?></<?php echo $title_size ?>>
          <?php endif; ?>
          <?php if ($desc): ?>
            <p class="desc"><?php echo $desc; ?></p>
          <?php endif; ?>
          <?php if ($button_enabled): ?>
            <div class="button-container">
              <?php foreach ($buttons as $button):
                FOAC::button($button, '');
              endforeach; ?>
            </div>
          <?php endif; ?>
          <?php if ($disclaimer) { ?>
            <p class="legal"><?php echo $disclaimer; ?></p>
          <?php } ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>
