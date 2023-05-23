<?php
/**
 * Block Name: Three Col Row
 */
$block_class = 'three-col-row';
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
        <div class="col-md-12">
          <h1><?php the_field('title'); ?></h1>
        </div>
      </div>
    <?php } ?>
    <?php
    if (have_rows('cols')): ?>
    <div class="row cols">
      <?php while (have_rows('cols')) : the_row();
      $icon = get_sub_field('icon');
      $title = get_sub_field('title');
      $content = get_sub_field('content');?>
      <div class="col-md-4 content-col">
        <div class="<?php if ($icon['icon']) {
          echo 'text-' . $icon['color'] . '-' . $icon['shade'] . ' ';
        } ?>icon-container">
          <?php if ($icon['icon']) {
            echo $icon['icon'];
          } else if ($icon['use_image']) { ?>
            <img width="48" height="48" src="<?php echo $icon['image']['url']; ?>"
                 alt="<?php echo $icon['image']['alt'] ?>"/>
          <?php } ?>
        </div>
        <h4><?php echo $title;?></h4>
        <p><?php echo $content;?></p>
      </div>
      <?php endwhile; ?>
      <?php endif; ?>
    </div>
  </div>
</section>
