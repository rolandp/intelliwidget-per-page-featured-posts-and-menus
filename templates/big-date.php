<?php
if ( !defined('ABSPATH')) exit;
/**
 * big-date.php - Template for showing big date next to excerpt (calendar)
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
global $iwgt_post;
if ( !empty($selected)) : foreach($selected as $iwgt_post) : 
?>

<div id="intelliwidget_<?php the_intelliwidget_ID(); ?>" class="intelliwidget-big-date clearfix">
  <div class="intelliwidget-date"><span class="intelliwidget-month"> <?php the_intelliwidget_date('M'); ?> </span> <span class="intelliwidget-day"> <?php the_intelliwidget_date('j'); ?> </span></div>
  <div class="intelliwidget-item">
    <?php if ( has_intelliwidget_image() ) : ?>
    <div class="intelliwidget-image-container-<?php echo $instance['image_size'];?> intelliwidget-align-<?php echo $instance['imagealign']; ?>">
      <?php the_intelliwidget_image(); ?>
    </div>
    <?php endif; ?>
    <h3 id="intelliwidget_title_<?php the_intelliwidget_ID(); ?>" class="intelliwidget-title">
      <?php the_intelliwidget_link(); ?>
    </h3>
    <div id="intelliwidget_excerpt_<?php the_intelliwidget_ID(); ?>" class="intelliwidget-excerpt">
      <?php the_intelliwidget_excerpt(); ?>
      <span id="intelliwidget_more_link_<?php the_intelliwidget_ID(); ?>" class="intelliwidget-more-link">
      <?php the_intelliwidget_link(get_the_intelliwidget_id(), $instance['link_text']); ?>
      </span></div>
  </div>
</div>
<?php endforeach; endif; ?>
