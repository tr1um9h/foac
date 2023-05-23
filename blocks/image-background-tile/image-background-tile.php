<?php
/**
 * Block Name: Image Background Tile
 */

// create id attribute for specific styling
$block_class = 'image-background-tile';
$add_white_background = get_field('white_background');
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section class="<?php echo $block_class ?><?php if($add_white_background): echo ' bg-white'; endif;?>">
  <div class="container">
    <?php if (get_field('title')):?>
    <div class="row">
      <div class="col-12">
        <h1><?php the_field('title') ?></h1>
      </div>
    </div>
    <?php endif; ?>
    <?php if (have_rows('tiles')): ?>
    <div class="row">
      <?php while (have_rows('tiles')) : the_row(); ?>
      <div class="col-md-6">
        <div class="tile-holder" style="background-image:url(<?php the_sub_field('image');?>)">
          <h3><?php the_sub_field('title')?></h3>
          <p><?php the_sub_field('content')?></p>
          <?php FOAC::button(get_sub_field('button'), '');?>
        </div>
      </div>
      <?php endwhile; ?>
    </div>
    <?php endif; ?>
  </div>
</section>
