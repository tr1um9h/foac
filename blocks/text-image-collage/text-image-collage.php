<?php
/**
 * Block Name: Text Image Collage
 */
$block_class = 'text-image-collage';
$three_image_collage = get_field('three_image_collage');
$four_image_collage = get_field('four_image_collage');
$add_white_bg = get_field('add_white_background');
$button_enabled = get_field('enable_button');
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?>
         class="<?php echo $block_class; ?><?php if ($add_white_bg): echo ' bg-white'; endif; ?>">
  <div class="container h-100">
    <div class="row align-items-center h-100">
      <div class="col-lg-6 text-content">
        <div class="content-container">
          <h1><?php the_field('title') ?></h1>
          <p><?php the_field('content') ?></p>
          <?php if ($button_enabled) { ?>
            <div class="button-holder">
              <?php if (have_rows('buttons')):
                while (have_rows('buttons')) : the_row();
                  $button = get_sub_field('button');
                  FOAC::button($button, '');
                endwhile;
              endif; ?>
            </div>
          <?php } ?>
          <?php if (get_field('disclaimer')) {?>
            <p class="legal"><?php the_field('disclaimer')?></p>
          <?php }?>
        </div>
      </div>
      <div
        class="col-lg-6 h-100<?php if ($three_image_collage): echo ' three-image'; endif; ?><?php if ($four_image_collage): echo ' four-image'; endif; ?>">
        <?php
        if ($four_image_collage):
          echo '<div class="collage-holder">';
          if (have_rows('four_images')):
            while (have_rows('four_images')) : the_row();
              $image = get_sub_field('image');
              $background = get_sub_field('add_background');
              $add_video = get_sub_field('add_video');
              $video = get_sub_field('video');
              $bg_Class = '';
              if ($background) {
                $bg_Class = 'bg-' . $background;
              } ?>
              <?php if ($add_video) {
                $id = FOAC::randomNumber('2'); ?>
                <button class="video" type="button" data-bs-toggle="modal" data-bs-target="#video-<?php echo $id; ?>">
                  <?php echo wp_get_attachment_image($video['image'], 'full'); ?>
                </button>
                <div id="video-<?php echo $id; ?>" class="video-modal modal fade" tabindex="-1"
                     aria-labelledby="video-<?php echo $id; ?>-Label" aria-hidden="true">
                  <?php
                  preg_match('/src="(.+?)"/', $video['video'], $matches);
                  $src = $matches[1];
                  $new_src = '';
                  $class = '';
                  // add extra params to iframe src
                  if (str_contains($src, 'youtube')) {
                    $params = array(
                      'controls' => 1,
                      'hd' => 1,
                      'autohide' => 1,
                      'autoplay' => 1
                    );
                    $new_src = add_query_arg($params, $src);
                    $class = 'youtube';
                  } elseif (str_contains($src, 'vimeo')) {
                    $new_src = $src;
                    $class = 'vimeo';
                  } ?>
                  <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="ratio ratio-16x9<?php if($class): echo ' '.$class; endif;?>" data-src="<?php echo $new_src ?>">
                          <div id="video-<?php echo $id;?>-<?php echo $class?>-player"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <?php } else { ?>
                <?php echo wp_get_attachment_image($image, 'full', '', ['class' => $bg_Class]);
              }
            endwhile;
          endif;
          echo '</div>';
        elseif ($three_image_collage):
          echo '<div class="collage-holder">';
          if (have_rows('three_images')):
            while (have_rows('three_images')) : the_row();
              $image = get_sub_field('image');
              $background = get_sub_field('add_background');
              $add_video = get_sub_field('add_video');
              $video = get_sub_field('video');
              $bg_Class = '';
              if ($background) {
                $bg_Class = 'bg-' . $background;
              } ?>
              <?php if ($add_video) {
                $id = FOAC::randomNumber('2'); ?>
                <button class="video" type="button" data-bs-toggle="modal" data-bs-target="#video-<?php echo $id; ?>">
                  <?php echo wp_get_attachment_image($video['image'], 'full'); ?>
                </button>
                <div id="video-<?php echo $id; ?>" class="video-modal modal fade" tabindex="-1"
                     aria-labelledby="video-<?php echo $id; ?>-Label" aria-hidden="true">
                  <?php
                  preg_match('/src="(.+?)"/', $video['video'], $matches);
                  $src = $matches[1];
                  $new_src = '';
                  $class = '';
                  // add extra params to iframe src
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
                ?>
                  <div class="modal-dialog modal-dialog-centered modal-xl">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        <div class="ratio ratio-16x9<?php if($class): echo ' '.$class; endif;?>" data-src="<?php echo $new_src?>">
                          <div id="video-<?php echo $id;?>-<?php echo $class?>-player"></div>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              <?php } else {
                echo wp_get_attachment_image($image, 'full', '', ['class' => $bg_Class]);
              }
            endwhile;
          endif;
          echo '</div>';
        endif;
        ?>
      </div>
    </div>
  </div>
</section>
