<?php
if ( !defined('ABSPATH')) exit;
/**
 * menu.php - Template for Custom Page Menus
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

<ul class="intelliwidget-menu">
<?php global $iwgt_post;
if ( !empty($selected)) : foreach($selected as $iwgt_post) : ?>
  <li id="intelliwidget_<?php the_intelliwidget_ID(); ?>" class="intelliwidget-menu-item">
    <?php if ( has_intelliwidget_image() ) : ?>
    <div class="intelliwidget-image-container-<?php echo $instance['image_size'];?> intelliwidget-align-<?php echo $instance['imagealign']; ?>">
      <?php the_intelliwidget_image(); ?>
    </div>
    <?php endif; ?>
    <?php the_intelliwidget_link(); ?>
  </li>
  <?php endforeach; endif; ?>
</ul>
