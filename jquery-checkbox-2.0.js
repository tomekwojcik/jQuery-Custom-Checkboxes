/**
 * jQuery custom checkboxes
 * 
 * Copyright (c) 2010-2012 Tomasz Wójcik (bthlabs.pl)
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @version 2.0
 * @category visual
 * @package jquery
 * @subpakage ui.checkbox
 * @author Tomasz Wójcik <labs@tomekwojcik.pl>
 * @contributor Nicolas Turlais
 */
(function() {
    jQuery.fn.checkbox = function(options) {
        options = options || {};
        
        var defaults = {
            'className': 'jquery-checkbox',
            'checkedClass': 'jquery-checkbox-on'
        };
        
        var settings = jQuery.extend(defaults, options);
                    
        return this.each(function() {
            var self = jQuery(this);
            
            var replacement = jQuery(
                '<div class="' + settings.className + '-wrapper">' +
                    '<a class="' + settings.className + '" href="#" name="' + self.attr('id') + '"></a>' + 
                '</div>'
            );
            var element = jQuery('a', replacement);
            
            if (self.prop('checked')) {
                element.addClass(settings.checkedClass);
            }
            
            element.on('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                
                var input = jQuery('input#' + jQuery(this).attr('name'), replacement.parent());
                if (input.prop('checked')) {
                    input.removeAttr('checked');
                } else {
                    input.prop('checked', true);
                }
                input.trigger('change');
                
                return false;
            });
            
            self.on('change', function(event) {
                var input = jQuery(this);
                if (input.prop('checked')) {
                    jQuery('a[name=' + input.attr('id') + ']', replacement.parent()).addClass(settings.checkedClass);
                } else {
                    jQuery('a[name=' + input.attr('id') + ']', replacement.parent()).removeClass(settings.checkedClass);
                }
                
                return true;
            });
            
            self.css({ 'position': 'absolute', 'top': '-200px', 'left': '-200px'}).before(replacement);
            replacement.parent().css('overflow', 'hidden');
        });
    }
})();