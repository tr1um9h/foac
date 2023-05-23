<?php
/**
 * Block Name: Multi CTA
 */
$block_class = 'multi-cta';
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?> class="<?php echo $block_class ?> bg-primary">
  <div class="container">
    <?php if (get_field('title')) { ?>
      <div class="row justify-content-center">
        <div class="col-md-8">
          <h3><?php the_field('title'); ?></h3>
          <p><?php the_field('content') ?></p>
        </div>
      </div>
    <?php } ?>
    <?php
    if (have_rows('buttons')): ?>
    <div class="row justify-content-center">
      <?php while (have_rows('buttons')) : the_row(); ?>
        <div class="col-md-12 col-lg-auto button-holder">
          <?php FOAC::button(get_sub_field('button'), ''); ?>
        </div>
      <?php endwhile;
      endif; ?>
    </div>
    <?php if (get_field('disclaimer')) {?>
      <div class="row">
        <div class="col-12">
          <p class="legal"><?php the_field('disclaimer')?></p>
        </div>
      </div>
    <?php }?>
  </div>
</section>
