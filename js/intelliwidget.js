/*!
 * intelliwidget.js - Javascript for the Admin.
 *
 * @package IntelliWidget
 * @subpackage js
 * @author Lilaea Media
 * @copyright 2013
 * @access public
 *
 */

jQuery(document).ready(function($) {
    /**
     * Ajax Save Custom Post Type Data
     */
    var iw_save_cdfdata = function(){
        // disable the button until ajax returns
        $(this).prop('disabled', true);
        // clear previous success/fail icons
        $('.iw-copy-container,.iw-save-container,.iw-cdf-container').removeClass('success failure');
        // unbind button from click event
        $('body').off('click', '#iw_cdfsave', iw_save_cdfdata);
        // show spinner
        $('#intelliwidget_cpt_spinner').show();
        // build post data array
        var postData = {};
        // find inputs for this section
        $('input[name=post_ID],input[name=iwpage],.intelliwidget-input').each(function(index, element) {
            // get field id
            fieldID = $(this).attr('id');
            postData[fieldID] = $(this).val();
        });
        // add wp ajax action to array
        postData['action'] = 'iw_cdfsave';
        // send to wp
        $.post(  
            // get ajax url from localized object
            IWAjax.ajaxurl,  
            //Data  
            postData,
            //on success function  
            function(response){
                // release button
                $('#iw_cdfsave').prop('disabled', false);
                // hide spinner
                $('#intelliwidget_cpt_spinner').hide();
                // show check mark
                $('.iw-cdf-container').addClass('success');
                return false;  
            }
        ).fail(function(){
            // release button
            $('#iw_cdfsave').prop('disabled', false);
            // hide spinner
            $('#intelliwidget_cpt_spinner').hide();
            // show red X
            $('.iw-cdf-container').addClass('failure');
            return false;  
        });  
  
        return false;  
    },
    /**
     * Ajax Save IntelliWidget Meta Box Data
     */
    iw_save_postdata = function (){ 
                
        $('.iw-copy-container,.iw-save-container,.iw-cdf-container').removeClass('success failure');
        var thisID          = $(this).prop('id'),
            // get section selector
            sectionform     = $(this).parents('.inside').first(),
            // get controls container selector
            savecontainer   = $(sectionform).find('.iw-save-container'),
            // get button selector
            savebutton      = $(sectionform).find('.iw-save'),
            // parse id to get section number
            pre             = 'intelliwidget_' + thisID.split('_')[1],
            // build post data array
            postData        = {};
        // disable the button until ajax returns
        $(savebutton).prop('disabled', true);;
        // show spinner
        $('#' + pre + '_spinner').show();
        // unbind button from click event
        $('body').off('click', savebutton, iw_save_postdata);
        // special handling for post types (array of checkboxes)
        postData[ pre + '_post_types'] = [];
        // find inputs for this section
        $('input[name=post_ID],input[name=iwpage],input[type=text][id^='+pre+'],input[type=checkbox][id^='+pre+']:checked,select[id^='+pre+'],textarea[id^='+pre+'],input[type=hidden][id^='+pre+']').each(
            function(index, element) {
            // get field id
            fieldID = $(this).attr('id');
            if (fieldID.indexOf('_post_types') > 0) {
                // special handling for post types
                postData[pre + '_post_types'].push($(this).val());
            } else {
                // otherwise add to post data
                postData[fieldID] = $(this).val();
            }
        });
        // add wp ajax action to array
        postData['action'] = 'iw_save';
        // send to wp
        $.post(  
            // get ajax url from localized object
            IWAjax.ajaxurl,  
            //Data  
            postData,
            //on success function  
            function(response){
                if ('fail' == response) {
                    // show red X
                    $(savecontainer).addClass('failure');
                } else {
                    // refresh section form
                    $(sectionform).html(response);
                    // since postbox.js does not delegate events, we have to rebind toggles on refresh
                    $(sectionform).find('.postbox h3, .postbox, .handlediv').on('click', function(e){
                        $(this).parent('.postbox').toggleClass('closed');
                    });
                    // show check mark
                    $(sectionform).find('.iw-save-container').addClass('success');
                }
                // release button
                $(savebutton).prop('disabled', false);
                // hide spinner
                $('#' + pre + '_spinner').hide();
                return false;  
            }
        ).fail(function(){
            // release button
            $(savebutton).prop('disabled', false);
            // hide spinner
            $('#' + pre + '_spinner').hide();
            // show red X
            $(savecontainer).addClass('failure');
            return false;  
        });  
        return false;  
    },

    /**
     * Ajax Save Copy Page Input
     */
    iw_copy_page = function (){ 
        // disable the button until ajax returns
        $(this).prop('disabled', true);
        // clear previous success/fail icons
        $('.iw-copy-container,.iw-save-container,.iw-cdf-container').removeClass('success failure');
        // unbind button from click event
        $('body').off('click', '#iw_copy', iw_copy_page);
        // show spinner
        $('#intelliwidget_spinner').show();
        // build post data array
        var postData = {};
        // find inputs for this section
        $('input[name=post_ID],input[name=iwpage],select[id=intelliwidget_widget_page_id]').each(function(index, element) {
            // get field id
            fieldID = $(this).attr('id');
            postData[fieldID] = $(this).val();
        });
        // add wp ajax action to array
        postData['action'] = 'iw_copy';
        // send to wp
        $.post(  
            // get ajax url from localized object
            IWAjax.ajaxurl,  
            //Data  
            postData,
            //on success function  
            function(response){
                // release button
                $('#iw_copy').prop('disabled', false);
                // hide spinner
                $('#intelliwidget_spinner').hide();
                // show check mark
                $('.iw-copy-container').addClass('success');
                return false;  
            }
        ).fail(function(){
            // release button
            $('#iw_copy').prop('disabled', false);
            // hide spinner
            $('#intelliwidget_spinner').hide();
            // show red X
            $('.iw-copy-container').addClass('failure');
            return false;  
        });  
  
        return false;  
    },

    /**
     * Ajax Add new IntelliWidget Meta Box Section
     */
    iw_add_meta_box = function (e){ 
        // don't act like a link
        e.stopPropagation();
        // ignore click if we are in process
        if ($(this).hasClass('disabled')) return false;
        // disable the button until ajax returns
        $(this).addClass('disabled');
        // clear previous success/fail icons
        $('.iw-copy-container,.iw-save-container,.iw-cdf-container').removeClass('success failure');
        // get id of button
        var thisID   = $(this).attr('id'),
            // munge selector
            sel      = '#' + thisID,
            // get href from link
            href     = $(this).attr('href'),
            // build post data array from query string
            postData = iw_url_to_array(href);
        // show spinner
        $('#intelliwidget_spinner').show();
        // add wp ajax action to array
        postData['action'] = 'iw_add';
        // send to wp
        $.post(  
            // get ajax url from localized object
            IWAjax.ajaxurl,  
            //Data  
            postData,
            //on success function  
            function(response){
                $(sel).removeClass('disabled');
                $('#intelliwidget_spinner').hide();
                if ('fail' == response) {
                    $('.iw-copy-container').addClass('failure');
                } else {
                    $('#side-sortables').append(response);
                    // show check mark
                    $('.iw-copy-container').addClass('success');
                }
                return false;  
            }
        ).fail(function(){
            // release button
            $(sel).removeClass('disabled');
            // hide spinner
            $('#intelliwidget_spinner').hide();
            // show red X
            $('.iw-copy-container').addClass('failure');
            return false;  
        });  
  
        return false;  
    },

    /**
     * Ajax Delete IntelliWidget Meta Box Section
     */
    iw_delete_meta_box = function (e){ 
        // don't act like a link
        e.stopPropagation();
        // ignore click if we are in process
        if ($(this).hasClass('disabled')) return false;
        // disable the button until ajax returns
        $(this).addClass('disabled');
        // clear previous success/fail icons
        $('.iw-copy-container,.iw-save-container,.iw-cdf-container').removeClass('success failure');
        // get id of button
        var thisID = $(this).attr('id'),
            // munge selector
            sel      = '#' + thisID,
            // get href from link
            href     = $(this).attr('href'),
            // build post data array from query string
            postData = iw_url_to_array(href),
            // get box id 
            pre      = postData['iwdelete'];
        // show spinner
        $('#intelliwidget_' + pre + '_spinner').show();
        // add wp ajax action to array
        postData['action'] = 'iw_delete';
        // send to wp
        $.post(  
        // get ajax url from localized object
            IWAjax.ajaxurl,  
            //Data  
            postData,
            //on success function  
            function(response){
                $(sel).removeClass('disabled');
                $('#intelliwidget_' + pre + '_spinner').hide();
                if ('success' == response ) {
                    $('#intelliwidget_section_meta_box_' + pre).slideUp('fast', function(){
                        $('#intelliwidget_section_meta_box_' + pre).remove();
                    });
                }
                return false;  
            }
        ).fail(function(){
            // release button
            $(sel).removeClass('disabled');
            // hide spinner
            $('#intelliwidget_' + pre + '_spinner').hide();
            return false;  
        });  
  
        return false;  
    },
    /**
     * nice little url -> name:value pairs codex
     */
    iw_url_to_array = function(url) {
        var pair, i, request = {},
            pairs = url.substring(url.indexOf('?') + 1).split('&');
        for (i = 0; i < pairs.length; i++) {
            pair = pairs[i].split('=');
            request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
        }
        return request;
    },
    // set visible timestamp and timestamp hidden inputs to form inputs 
    // only validates form if validate param is true
    // this allows values to be reset/cleared
    iwUpdateTimestampText = function(field, validate) {

        // retrieve values from form
        var attemptedDate, 
            div         = '#' + field + '_div', 
            clearForm   = (!validate && !$('#'+field).val()),  
            aa          = $('#'+field+'_aa').val(),
            mm          = ('00'+$('#'+field+'_mm').val()).slice(-2), 
            jj          = ('00'+$('#'+field+'_jj').val()).slice(-2), 
            hh          = ('00'+$('#'+field+'_hh').val()).slice(-2), 
            mn          = ('00'+$('#'+field+'_mn').val()).slice(-2),
            og          = $('#'+field+'_og').val();
        if (! $(div).length) return true;
        // construct date object
        attemptedDate = new Date( aa, mm - 1, jj, hh, mn );
        // validate inputs by comparing to date object
        if ( attemptedDate.getFullYear() != aa || 
            (1 + attemptedDate.getMonth()) != mm || 
            attemptedDate.getDate() != jj ||
            attemptedDate.getMinutes() != mn ) {
            // date object returned invalid
            // if validating, display error and return invalid
                if (true == validate && !og) {
                    $(div).addClass('form-invalid');
                    $('.iw-cdfsave').attr('disabled', 'disabled');
                    return false;
                }
                // otherwise clear form (value is/was null)  
                clearForm = true;
        }
        // date validated or ignored, reset invalid class
        $(div).removeClass('form-invalid');
        $('.iw-cdfsave').removeAttr('disabled');
        if (clearForm) {
            // replace date fields with empty string
            if (! og) $('#'+field+'_timestamp').html('');
            $('#'+field).val('');
        } else {
            // format displayed date string from form values
            if ('intelliwidget_expire_date' == field) {
                $('#intelliwidget_ongoing').val($('#'+field+'_og').is(':checked') ? 1 : 0);
                if ($('#'+field+'_og').is(':checked')) {
                    $('#'+field+'_timestamp').html($('#intelliwidget_ongoing_label').text());
                    $('#'+field).val('');
                    return true;
                }
            }
            $('#'+field+'_timestamp').html(
                '<b>' +
                $('option[value="' + $('#'+field+'_mm').val() + '"]', '#'+field+'_mm').text() + ' ' +
                jj + ', ' +
                aa + ' @ ' +
                hh + ':' +
                mn + '</b> '
            );
            // format date field from form values
            $('#'+field).val(
                aa + '-' +
                $('#'+field+'_mm').val() + '-' +
                jj + ' ' +
                hh + ':' +
                mn                    
            );
        }
        return true;
    };
    // add collapsibles to widgets admin
    $('body').on('click', '.iw-collapsible', function() {
        id = $(this).attr('id');
        sel = '#' + id + '-inside';
        $(sel).stop().slideToggle();
    });
    // bind click events to edit page meta box buttons
    $('body').on('click', '.iw-save', iw_save_postdata);    
    $('body').on('click', '.iw-cdfsave', iw_save_cdfdata);    
    $('body').on('click', '.iw-copy', iw_copy_page);    
    $('body').on('click', '.iw-add', iw_add_meta_box);    
    $('body').on('click', '.iw-delete', iw_delete_meta_box);
    // update visibility of form inputs
    $('body').on('change', '.iw-control', iw_save_postdata);    
    $('body').on('change', '.iw-widget-control', function(e){
        wpWidgets.save( $(this).parents('div.widget').first(), 0, 0, 0 );
    });    
    // bind toggle events to new content - using native wp postboxes class
    $('body').on('click', '.iw_new_box h3, .iw_new_box .handlediv, .iw_new_box .postbox h3, .iw_new_box .postbox .handlediv', function() {
        var p = $(this).parent('.postbox'), id = p.attr('id');
        p.toggleClass('closed');
        if ( id ) {
            if ( !p.hasClass('closed') && $.isFunction(postboxes.pbshow) )
                postboxes.pbshow(id);
            else if ( p.hasClass('closed') && $.isFunction(postboxes.pbhide) )
                postboxes.pbhide(id);
        }
    });
    // prevent link action on h3 
    $('body').on('click', '.iw_new_box h3 a, .iw_new_box .postbox h3 a', function(e) {
        e.stopPropagation();
    });
    /**
     * manipulate IntelliWidget timestamp inputs
     * Adapted from wp-admin/js/post.js in Wordpress Core
     */
     
    // format visible timestamp values
    iwUpdateTimestampText('intelliwidget_event_date', false);
    iwUpdateTimestampText('intelliwidget_expire_date', false);
    
    // bind edit links to reveal timestamp input form
    $('body').on('click', 'a.intelliwidget-edit-timestamp', function() {
        var field = $(this).attr('id').split('-', 1);
        if ($('#'+field+'_div').is(":hidden")) {
            $('#'+field+'_div').slideDown('fast');
            $('#'+field+'_mm').focus();
            $(this).hide();
        }
        return false;
    });
    // bind click to clear timestamp (resets form to current date/time and clears date fields)
    $('body').on('click', '.intelliwidget-clear-timestamp', function() {
        var field = $(this).attr('id').split('-', 1);
        $('#'+field+'_div').slideUp('fast');
        $('#'+field+'_mm').val($('#'+field+'_cur_mm').val());
        $('#'+field+'_jj').val($('#'+field+'_cur_jj').val());
        $('#'+field+'_aa').val($('#'+field+'_cur_aa').val());
        $('#'+field+'_hh').val($('#'+field+'_cur_hh').val());
        $('#'+field+'_mn').val($('#'+field+'_cur_mn').val());
        $('#'+field+'_og').prop('checked', false);
        $('#'+field+'_timestamp').html('');
        $('#'+field).val('');
        $('a#'+field+'-edit').show();
        iwUpdateTimestampText(field, false);
        return false;
    });
    // bind cancel button to reset values (or empty string if orig field is empty) 
    $('body').on('click', '.intelliwidget-cancel-timestamp', function() {
        var field = $(this).attr('id').split('-', 1);
        $('#'+field+'_div').slideUp('fast');
        $('#'+field+'_mm').val($('#'+field+'_hidden_mm').val());
        $('#'+field+'_jj').val($('#'+field+'_hidden_jj').val());
        $('#'+field+'_aa').val($('#'+field+'_hidden_aa').val());
        $('#'+field+'_hh').val($('#'+field+'_hidden_hh').val());
        $('#'+field+'_mn').val($('#'+field+'_hidden_mn').val());
        $('#'+field+'_og').prop('checked', $('#'+field+'_hidden_og').val() ? true : false);
        $('a#'+field+'-edit').show();
        iwUpdateTimestampText(field, false);
        return false;
    });

    // bind 'Ok' button to update timestamp to inputs
    $('body').on('click', '.intelliwidget-save-timestamp', function () { 
        var field = $(this).attr('id').split('-', 1);
        if ( iwUpdateTimestampText(field, true) ) {
            $('#'+field+'_div').slideUp('fast');
            $('a#'+field+'-edit').show();
        }
        return false;
    });
});
