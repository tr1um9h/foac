<?php
/**
 * Block Name: Three Image Text
 */

// create id attribute for specific styling
$block_class = 'three-image-text';
$overlap = get_field('section_overlay');
$button_enabled = get_field('enable_button');
$block_title = get_field('block_title');
$anchor = '';
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>

<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?> class="<?php echo $block_class; ?><?php echo ($overlap) ? ' section-overlap' : ''; ?>">
  <div class="container">
    <?php if ($block_title): ?>
      <div class="row">
        <div class="col-12">
          <h1><?php echo $block_title; ?></h1>
        </div>
      </div>
    <?php endif; ?>
    <div class="card-holder">
      <div class="row">
        <?php
        if (have_rows('section_images')):
          $count = 1;
          while (have_rows('section_images')) : the_row();
            $image = get_sub_field('image');
            $title = get_sub_field('title');
            $desc = get_sub_field('description'); ?>
            <div class="col-lg-4 col-md-12 three-image-text-single">
              <div class="<?php echo $block_class; ?>-content">
                <?php if ($image): ?>
                  <div class="image-container">
                    <img width="480" height="277" src="<?php echo $image['url']; ?>" alt="<?php echo $image['alt'] ?>"/>
                  </div>
                <?php endif; ?>
                <div class="content-container">
                  <div class="content-row">
                    <?php if ($title): ?>
                      <h4><?php echo $title; ?></h4>
                    <?php endif; ?>
                    <?php if ($desc): ?>
                      <p><?php echo $desc; ?></p>
                    <?php endif; ?>
                    <?php if ($button_enabled) {
                      FOAC::button(get_sub_field('button'), '');
                    } ?>
                  </div>
                </div>
              </div>
            </div>
            <?php
            $count++;
          endwhile;
        endif; ?>
      </div>
    </div>
  </div>
</section>
