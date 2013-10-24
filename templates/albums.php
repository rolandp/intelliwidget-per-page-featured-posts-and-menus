<?php
if ( !defined('ABSPATH')) exit;
/**
 * albums.php - Template for album covers
 *
 * This can be copied to a folder named 'intelliwidget' in your theme
 * to customize the output.
 *
 * @package IntelliWidget
 * @subpackage templates
 * @author Lilaea Media
 * @copyright 2013
 * @access public
 */
?>
<style type="text/css">
.intelliwidget-album-container { text-align: center; }
</style>
<?php
if ( $selected->have_posts() ) : while ($selected->have_posts()) : $selected->the_post();
?>
<div id="intelliwidget_<?php the_intelliwidget_ID(); ?>" class="intelliwidget-album-container">
    <?php if ( has_intelliwidget_image() ) : ?>
    <div class="intelliwidget-album-container-<?php echo $instance['image_size'];?> intelliwidget-align-<?php echo $instance['imagealign']; ?>">
        <?php the_intelliwidget_image(); ?>
    </div>
    <?php endif; ?>
    <h3 id="intelliwidget_title_<?php the_intelliwidget_ID(); ?>" class="intelliwidget-title">
        <?php the_intelliwidget_link(); ?>
    </h3>
</div>
<?php endwhile; endif; ?>