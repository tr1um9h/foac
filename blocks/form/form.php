<?php
/**
 * Block Name: Form
 */

// create id attribute for specific styling
$block_class = 'form';
$disable_title = get_field('disable_title');
$disable_description = get_field('disable_description');
$show_privacy_disclaimer = get_field('show_privacy_disclaimer');
$title = true;
$description = true;
if($disable_title):
  $title = false;
endif;
if($disable_description):
  $description = false;
endif;
if($show_privacy_disclaimer):
  $form_disclaimer = get_option('privacy_disclaimer');
else:
  $form_disclaimer = get_option('form_disclaimer');
endif;
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
?>
<section id="form" class="<?php echo $block_class ?> bg-white">
  <div class="container">
    <?php
    $form = get_field('form');
    gravity_form($form, $title, $description, false, '', true);
    ?>
    <div class="row justify-content-center">
      <div class="col-12 col-lg-8">
        <?php if ($form_disclaimer) { ?>
          <p class="legal"><?php echo $form_disclaimer; ?></p>
        <?php } ?>
      </div>
    </div>
  </div>
</section>
