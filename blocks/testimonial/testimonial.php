<?php
/**
 * Block Name: Testimonials Block
 */

// create id attribute for specific styling
$block_class = 'testimonials-block';
$testimonial_id = 'testimonial-' . FOAC::randomNumber('2');

$items = get_field("items_to_show");
$select_testimonials = get_field("select_testimonials");
$category = get_field("testimonial_category");

if (!$select_testimonials) :
  $category_name = $category->name;
  $args = array(
    'numberposts' => $items,
    'category_name' => $category_name,
    'order' => 'ASC',
    'post_type' => 'testimonials',
  );
  $the_query = new WP_Query($args);
endif;

$anchor = '';
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
?>

<section class="<?php echo $block_class; ?>">
  <div class="container-xl">
    <div id="<?php echo $testimonial_id; ?>" class="testimonial-holder carousel carousel-dark carousel-fade" data-bs-interval="false">
      <?php if ($select_testimonials) {
        $testimonials = get_field('testimonials');
        $count = 1;
        $total_count = count($testimonials); ?>
        <div class="carousel-inner">
          <?php foreach ($testimonials as $testimonial) {
            $image = get_the_post_thumbnail($testimonial);
            $category = get_field('category', $testimonial);
            $name = get_field('name', $testimonial);
            $job_title = get_field('job_title', $testimonial);
            $content_body = get_field('content_body', $testimonial);
            ?>
            <div class="row justify-content-center carousel-item align-items-center <?php if ($count === 1) : ?>active<?php endif; ?>"
                 data-bs-interval="10000" data-count="<?php echo $count; ?>">
              <div class="offset-md-1 col-md-4 col-sm-12 col-12">
                <?php if ($image): ?>
                  <div class="image-container">
                    <?php echo $image ?>
                  </div>
                <?php endif; ?>
              </div>
              <div class="offset-md-1 col-md-5 col-8 text-content">
                <div class="content-container">
                  <?php if ($category): ?>
                    <h6><?php echo $category; ?></h6>
                  <?php endif; ?>
                  <?php if ($content_body): ?>
                    <?php if (strlen($content_body) > '100') { ?>
                      <h2>&ldquo;<?php echo $content_body; ?>&rdquo;</h2>
                    <?php } else { ?>
                      <h1>&ldquo;<?php echo $content_body; ?>&rdquo;</h1>
                    <?php } ?>
                  <?php endif; ?>
                  <?php if ($name): ?>
                    <h4><?php echo $name; ?></h4>
                  <?php endif; ?>
                  <?php if ($job_title): ?>
                    <p><?php echo $job_title; ?></p>
                  <?php endif; ?>
                </div>
              </div>
            </div>

            <?php $count++;
          } ?>
        </div>
        <?php if ($total_count > 1) { ?>
          <div class="carousel-controls-holder">
            <button class="carousel-control-prev" type="button" data-bs-target="#<?php echo $testimonial_id; ?>"
                    data-bs-slide="prev">
              <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
              <span class="visually-hidden">Previous</span>
            </button>
            <div class="carousel-count">
              <span class="count">1</span> / <span class="total"><?php echo $total_count; ?></span>
            </div>
            <button class="carousel-control-next" type="button" data-bs-target="#<?php echo $testimonial_id; ?>"
                    data-bs-slide="next">
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        <?php } ?>
        <?php
      } else {
        $count = 1;
        if ($the_query->have_posts()):
          $total_count = $the_query->found_posts; ?>

          <div class="carousel-inner">
            <?php while ($the_query->have_posts()): $the_query->the_post();
              $image = get_the_post_thumbnail(get_the_ID());
              $category = get_field('category', get_the_ID());
              $name = get_field('name', get_the_ID());
              $job_title = get_field('job_title', get_the_ID());
              $content_body = get_field('content_body', get_the_ID()); ?>
              <div class="row carousel-item align-items-center <?php if ($count === 1) : ?>active<?php endif; ?>"
                   data-bs-interval="10000" data-count="<?php echo $count; ?>">
                <div class="offset-md-1 col-md-4 col-sm-12 col-12">
                  <?php if ($image): ?>
                    <div class="image-container">
                      <?php echo $image ?>
                    </div>
                  <?php endif; ?>
                </div>
                <div class="offset-md-1 col-md-5 col-8 text-content">
                  <div class="content-container">
                    <?php if ($category): ?>
                      <h6><?php echo $category; ?></h6>
                    <?php endif; ?>
                    <?php if ($content_body): ?>
                      <?php if (strlen($content_body) > '100') { ?>
                        <h2>&ldquo;<?php echo $content_body; ?>&rdquo;</h2>
                      <?php } else { ?>
                        <h1>&ldquo;<?php echo $content_body; ?>&rdquo;</h1>
                      <?php } ?>
                    <?php endif; ?>
                    <?php if ($name): ?>
                      <h4><?php echo $name; ?></h4>
                    <?php endif; ?>
                    <?php if ($job_title): ?>
                      <p class="location"><?php echo $job_title; ?></p>
                    <?php endif; ?>
                  </div>
                </div>
              </div>
              <?php $count++; endwhile; ?>
          </div>
          <?php if ($total_count > 1) { ?>
          <div class="carousel-controls-holder">
            <button class="carousel-control-prev" type="button" data-bs-target="#<?php echo $testimonial_id; ?>"
                    data-bs-slide="prev">
              <i class="fa-solid fa-arrow-left" aria-hidden="true"></i>
              <span class="visually-hidden">Previous</span>
            </button>
            <div class="carousel-count">
              <span class="count">1</span> / <span class="total"><?php echo $total_count; ?></span>
            </div>
            <button class="carousel-control-next" type="button" data-bs-target="#<?php echo $testimonial_id; ?>"
                    data-bs-slide="next">
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        <?php } ?>

        <?php endif;
        ?>
        <?php wp_reset_query();
      } ?>
    </div>
  </div>
</section>
