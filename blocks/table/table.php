<?php
/**
 * Block Name: Table
 */
$block_class = 'table';
$table = get_field('table');
$anchor = '';
if (!empty($block['className'])) {
  $block_class = $block_class.' '.$block['className'];
}
if (!empty($block['anchor'])) {
  $anchor = $block['anchor'];
}
?>
<section <?php if ($anchor) : ?>id="<?php echo $anchor ?>"<?php endif; ?> class="<?php echo $block_class ?>">
  <div class="container">
    <?php if (get_field('title')) { ?>
      <div class="row">
        <div class="col-12">
          <h4><?php the_field('title'); ?></h4>
        </div>
      </div>
    <?php } ?>
    <div class="row">
      <div class="col-12">
        <?php if (!empty ($table)) {
          echo '<table>';

          if (!empty($table['caption'])) {

            echo '<caption>' . $table['caption'] . '</caption>';
          }

          if (!empty($table['header'])) {

            echo '<thead>';

            echo '<tr>';

            foreach ($table['header'] as $th) {

              echo '<th>';
              echo $th['c'];
              echo '</th>';
            }

            echo '</tr>';

            echo '</thead>';
          }

          echo '<tbody>';

          foreach ($table['body'] as $tr) {

            echo '<tr>';

            foreach ($tr as $td) {

              echo '<td>';
              echo $td['c'];
              echo '</td>';
            }

            echo '</tr>';
          }

          echo '</tbody>';

          echo '</table>';
        } ?>
      </div>
    </div>
  </div>
</section>
