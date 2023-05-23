<?php
/**
 * Block Name: Disclaimer
 */
$block_class = 'disclaimer';
$add_white_background = get_field('white_background');
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?> class="<?php echo $block_class ?><?php if($add_white_background): echo ' bg-white'; endif;?>">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-10">
        <div class="cta-holder">
          <h4><?php the_field('title'); ?></h4>
          <?php the_field('disclaimer'); ?>
        </div>
      </div>
    </div>
  </div>
</section>
