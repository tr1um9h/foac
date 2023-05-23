<?php
/**
 * Block Name: CTA
 */
$block_class = 'cta';
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
    <div class="col-12">
      <div class="cta-holder">
        <h1 class="display-3"><?php the_field('title');?></h1>
        <?php FOAC::button(get_field('button'), '');?>
      </div>
    </div>
  </div>
</section>
