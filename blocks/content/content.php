<?php
/**
 * Block Name: Card Tiles
 */
$block_class = 'content';
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
      <div class="row justify-content-center">
        <div class="col-12">
          <?php if (get_field('title')) {?>
            <h1><?php the_field('title')?></h1>
          <?php } ?>
          <p><?php the_field('content'); ?></p>
        </div>
      </div>
  </div>
</section>
