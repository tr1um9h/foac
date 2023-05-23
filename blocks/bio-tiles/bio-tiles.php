<?php
/**
 * Block Name: Bio Tiles
 */
$block_class = 'bio-tiles';
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
$display_style = get_field('display_style');
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?>
         class="<?php echo $block_class ?><?php if ($display_style === 'scrollable'): echo ' ' . $display_style; endif; ?>">
  <div class="container">
    <?php if (get_field('title')) { ?>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <<?php the_field('title_size'); ?>><?php the_field('title'); ?></<?php the_field('title_size'); ?>>
    </div>
  </div>
  <?php } ?>
  <?php
  if (have_rows('bio_tiles')):
  $count = 1; ?>
  <div class="bio-tile-holder">
    <?php while (have_rows('bio_tiles')) :
    the_row();
    $image = get_sub_field('headshot');
    $name = get_sub_field('name');
    $title = get_sub_field('title');
    $company = get_sub_field('company');
    $description = get_sub_field('description') ?>
    <div class="bio-tile card-<?php echo $count ?> is-collapsed">
      <div class="bio-inner js-expander">
        <?php echo wp_get_attachment_image($image, 'full'); ?>
        <div class="details-holder">
          <h4><?php echo $name; ?></h4>
          <p class="title"><?php echo $title ?></p>
          <p class="company"><?php echo $company ?></p>
          <i class="icon fa-regular fa-circle-plus"></i>
        </div>
      </div>
      <?php if ($display_style === 'scrollable'): echo '</div>'; endif; ?>
      <div
        class="description-holder card-<?php echo $count ?><?php if ($display_style === 'scrollable'): echo ' collapse'; endif; ?>">
        <p class="description js-collapse"><?php the_sub_field('description') ?></p>
      </div>
      <?php if ($display_style === 'grid'): echo '</div>'; endif; ?>
      <?php
      $count++;
      endwhile;
      endif; ?>
    </div>
</section>
