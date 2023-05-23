<?php
/**
 * Block Name: Three Icon Text
 */
$block_class = 'three-icon-text';
$overlap = get_field('section_overlay');
$section_title = get_field('title');
$disclaimer = get_field('disclaimer');
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?> class="<?php echo $block_class; ?>">
  <div class="container">
    <?php if ($section_title) { ?>
      <div class="row justify-content-center">
        <div class="col-12 col-md-8">
          <h1><?php echo $section_title; ?></h1>
        </div>
      </div>
    <?php } ?>
    <?php if (have_rows('tiles')): ?>
    <div class="row tiles justify-content-center">
      <?php while (have_rows('tiles')) : the_row();
        $icon = get_sub_field('icon');
        $title = get_sub_field('title');
        $content = get_sub_field('content');
        $use_image = get_field('use_image'); ?>
        <div class="col-md-4 tile-holder">
          <div class="<?php if ($icon['icon']) {
            echo 'text-' . $icon['color'] . '-' . $icon['shade'] . ' ';
          } ?>icon-container">
            <?php if ($icon['icon']) {
              echo $icon['icon'];
            } else if ($icon['use_image']) {
              echo wp_get_attachment_image($icon['image'], 'full');
            } ?>
          </div>
          <?php if ($title) { ?>
            <h4><?php echo $title ?></h4>
          <?php } ?>
          <?php if ($content) { ?>
            <p><?php echo $content ?></p>
          <?php } ?>
        </div>
      <?php endwhile;
      endif; ?>
    </div>
    <?php if ($disclaimer) { ?>
      <div class="row justify-content-center">
        <div class="col-12 col-md-10">
          <p class="legal"><?php echo $disclaimer ?></p>
        </div>
      </div>
    <?php } ?>
  </div>
</section>
