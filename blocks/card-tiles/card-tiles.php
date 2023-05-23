<?php
/**
 * Block Name: Card Tiles
 */
$block_class = 'card-tiles';
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?> class="<?php echo $block_class ?>">
  <div class="container">
    <?php if (get_field('title')) { ?>
      <div class="row justify-content-center">
        <div class="col-md-10">
          <h2><?php the_field('title'); ?></h2>
        </div>
      </div>
    <?php } ?>
    <?php
    if (have_rows('tiles')): ?>
    <div class="row justify-content-center">
      <?php while (have_rows('tiles')) : the_row();
        $icon = get_sub_field('icon');
        $title = get_sub_field('title');
        $excerpt = get_sub_field('excerpt');
        $content = get_sub_field('content'); ?>
        <div class="col-md-6 col-xl-4 col-xxl-3 tile-holder">
          <div class="tile">
            <div class="front">
              <div class="<?php if ($icon['icon']) {
                echo 'text-' . $icon['color'] . '-' . $icon['shade'] . ' ';
              } ?>icon-container">
                <?php if ($icon['icon']) {
                  echo $icon['icon'];
                } else if ($icon['use_image']) {
                  echo wp_get_attachment_image($icon['image'], 'full');
                } ?>
              </div>
              <?php if ($title) {?>
                <h4><?php echo $title; ?></h4>
              <?php } ?>
              <?php if ($excerpt) { ?>
                <p><?php echo $excerpt; ?></p>
              <?php } ?>
              <div class="details"><i class="fa-regular fa-circle-plus"></i><span>View Details</span></div>
            </div>
            <div class="back">
              <div class="content-holder">
                <div class="close"><i class="fa-light fa-circle-xmark"></i></div>
                <p><?php echo $content; ?></p>
              </div>
            </div>
          </div>
        </div>
      <?php endwhile;
      endif; ?>
    </div>
  </div>
</section>
