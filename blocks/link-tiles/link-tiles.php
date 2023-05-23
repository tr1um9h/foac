<?php
/**
 * Block Name: Link Tiles
 */
$block_class = 'link-tiles';
$link_tiles = get_field('link_tiles');
$four_image_collage = get_field('four_image_collage');
$add_white_bg = get_field('add_white_background');
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
          <?php if (get_field('title')) { ?>
            <h1><?php the_field('title'); ?></h1>
          <?php } ?>
          <?php if (get_field('content')) { ?>
            <p><?php the_field('content') ?></p>
          <?php } ?>
        </div>
      </div>
    <?php } ?>
    <?php
    $link_tile_count = count(get_field('link_tiles'));
    if (have_rows('link_tiles')):
    $count = 0; ?>
    <div class="row justify-content-center<?php if ($link_tile_count % 2 == 0): echo ' even'; endif; ?>">
      <?php while (have_rows('link_tiles')) :
      the_row();
      $link_type = get_sub_field('link_type');
      $page_link = get_sub_field('page_link');
      $file_url = get_sub_field('file');
      $external_url = get_sub_field('external_url');
      $page_anchor = get_sub_field('anchor');
      $email_phone = get_sub_field('email_phone');
      $href = '';
      $target = '';
      $icon = get_sub_field('icon');
      $link_name = get_sub_field('link_name');
      $link_sub_text = get_sub_field('link_sub_text');
      if ($link_sub_text) {
        $link_sub_text = '<br><span>' . $link_sub_text . '</span>';
      }
      switch ($link_type) {
        case 'page_link':
          $href = $page_link;
          break;
        case 'file':
          $href = $file_url;
          $target = 'target= "_blank"';
          break;
        case 'external_url':
          $href = $external_url;
          $target = 'target= "_blank"';
          break;
        case 'page_anchor':
          $href = '#' . $page_anchor;
          break;
        case 'email':
          $href = 'mailto:' . $email_phone;
          break;
        case 'phone':
          $href = 'tel:+1' . $email_phone;
          break;
      } ?>
      <?php if ($link_tile_count % 2 == 0) {
      if ($count > 0 && (($count % 2) == 0)) { ?>
    </div>
    <div class="row justify-content-center even">
      <?php
      } ?>
      <div class="col-sm-12 col-md-8 col-lg-6 col-xl-4 tile">
        <?php echo '<a class="d-flex" href="' . $href . '" target="' . $target . '">' . $icon . '<span>' . $link_name . $link_sub_text . '</span></a>'; ?>
      </div>
      <?php } else { ?>
        <div class="col-sm-12 col-md-8  col-lg-6 col-xl-4 tile">
          <?php echo '<a class="d-flex" href="' . $href . '" target="' . $target . '">' . $icon . '<span>' . $link_name . $link_sub_text . '</span></a>'; ?>
        </div>
      <?php
      }
      $count++;
      endwhile; ?>
      <?php endif; ?>
    </div>
  </div>
</section>
