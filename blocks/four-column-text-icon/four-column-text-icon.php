<?php
/**
 * Block Name: Four Column Text Icon
 */

// create id attribute for specific styling
$block_class = 'four-column-text-icon';
$block_title = get_field('title');
$denim_background = get_field('denim_background');
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>

<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?> class="<?php echo $block_class; ?><?php if ($denim_background) : ?> bg-primary<?php endif; ?>">
  <div class="container-xl">
    <?php if ($block_title): ?>
      <div class="row">
        <div class="col-sm-12">
          <h1 class="block-title"><?php echo $block_title; ?></h1>
        </div>
      </div>
    <?php endif; ?>
    <div class="row tiles">
      <?php
      if (have_rows('section_content')):
        $count = 1;
        while (have_rows('section_content')) : the_row();
          $use_image = get_sub_field('use_image');
          $image = get_sub_field('image');
          $icon = get_sub_field('icon');
          $pre_title = get_sub_field('pre_title');
          $headline = get_sub_field('headline');
          $headline_size = get_sub_field('headline_size');
          $desc = get_sub_field('description');
          $button_enabled = get_sub_field('enable_button'); ?>
          <div class="col-lg-3 col-md-5 col-sm-10">
            <div class="four-col-text-icon-content">
              <?php if ($icon): ?>
                <div class="<?php if ($icon['icon']) {
                  echo 'text-' . $icon['color'] . '-' . $icon['shade'] . ' ';
                } ?>image-container">
                  <?php if ($icon['icon']) {
                    echo $icon['icon'];
                  } else if ($icon['use_image']) {
                    echo wp_get_attachment_image($icon['image'], 'full');
                  } ?>
                </div>
              <?php endif; ?>
              <div class="content-container">
                <?php if ($pre_title): ?>
                  <p class="pre-title"><?php echo $pre_title; ?></p>
                <?php endif; ?>
                <?php if ($headline): ?>
                  <p <?php if ($headline_size): echo 'class="' . $headline_size . '"'; else: echo 'class="h5"'; endif; ?>><?php echo $headline; ?></p>
                <?php endif; ?>
                <?php if ($desc): ?>
                  <p class="description"><?php echo $desc; ?></p>
                <?php endif; ?>
                <?php if ($button_enabled) {
                  FOAC::button(get_sub_field('button'), '');
                } ?>
              </div>
            </div>
          </div>
          <?php
          $count++;
        endwhile;
      endif; ?>
    </div>
  </div>
</section>
