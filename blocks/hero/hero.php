<?php
/**
 * Block Name: Hero
 */

// create id attribute for specific styling
$block_class = 'hero';
$add_background_image = get_field('add_background_image');
$layout_options = get_field('layout_options');
$option_one = get_field('option_1');
$option_two = get_field('option_2');
$option_three = get_field('option_3');
$cares_gradient = '';
if($option_one) {
  $cares_gradient = $option_one['add_cares_gradient'];
}
$padding = '';
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section
  class="<?php echo $block_class . ' ' . $layout_options; ?><?php echo $add_background_image ? ' has-background-image' : ''; ?><?php echo ($cares_gradient) ? ' cares-bg' : ''; ?>"
  <?php if ($add_background_image) : ?>style="background-image:url(<?php the_field('background_image') ?>);"<?php endif; ?>>
  <div class="container-xl h-100">
    <div class="row h-100 align-items-center">
      <?php if ($layout_options === 'option1') :
        $button_enabled = $option_one['enable_button'];
        if($cares_gradient) {
          $content_align = 'center';
        } else {
          $content_align = $option_one['content_align'];
        }?>
        <div
          class="col-12 d-flex justify-content-<?php echo $content_align ?> text-<?php echo $content_align ?><?php echo ($option_one['remove_foa_icon']) ? ' remove-icon' : ''; ?>">
          <?php if (!$option_one['add_logo'] && !$option_one['description'] && !$button_enabled):
            $padding = ' shorten';
          endif;?>
          <div class="hero-content option1<?php echo $padding?>">
            <?php if ($option_one['add_logo']) {?>
              <img width="293" height="143" src="<?php echo $option_one['logo']['url']?>" alt="<?php echo $option_one['logo']['alt']?>">
            <?php } ?>
            <?php if ($option_one['title']) { ?>
              <h1 class="<?php echo $option_one['title_size']; ?>"><?php echo $option_one['title']; ?></h1>
            <?php } ?>
            <?php if ($option_one['description']) { ?>
              <p><?php echo $option_one['description']; ?></p>
            <?php } ?>
            <?php if ($button_enabled) {
              if ($option_one['buttons']):
                foreach ($option_one['buttons'] as $button):
                  FOAC::button($button['button'], '');
                endforeach;
              endif;
            } ?>
          </div>
        </div>
      <?php elseif ($layout_options === 'option2') :
        $button_enabled = $option_two['enable_button'] ?>
        <div class="col-lg-6 col-sm-12">
          <div class="hero-content option2">
            <?php if ($option_two['title']) { ?>
              <h1 class="<?php echo $option_two['title_size']; ?>"><?php echo $option_two['title']; ?></h1>
            <?php } ?>
            <?php if ($option_two['description']) { ?>
              <p><?php echo $option_two['description']; ?></p>
            <?php } ?>
            <?php if ($button_enabled) {
              if ($option_two['buttons']):
                foreach ($option_two['buttons'] as $button):
                  FOAC::button($button['button'], '');
                endforeach;
              endif;
            } ?>
          </div>
        </div>
        <div class="col-lg-6 col-sm-12">
          <div class="hero-image option2">
            <?php echo wp_get_attachment_image($option_two['image'], 'full'); ?>
          </div>
        </div>
      <?php elseif ($layout_options === 'option3') : ?>
        <div class="col-md-6 col-12">
          <div class="hero-content option3">
            <h1 class="<?php echo $option_three['title_size']; ?>"><?php echo $option_three['title']; ?></h1>
            <div class="row">
              <div class="col-sm-5 col-md-8">
                <p><?php echo $option_three['description']; ?></p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-12 h-100">
          <div class="hero-image option3">

            <?php
            if ($option_three['images']):
              foreach ($option_three['images'] as $image):?>
                <?php echo wp_get_attachment_image($image['image'], 'full'); ?>
              <?php
              endforeach;
            endif; ?>
          </div>
        </div>
      <?php endif; ?>
    </div>
  </div>
</section>
