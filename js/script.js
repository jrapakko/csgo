jQuery(document).ready(function($) {
    
    $('.opt-enable').on('click keydown', 'span', function(event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).toggleClass('glyphicon-ok glyphicon-remove glyphicon-green glyphicon-red');
        $(this).parent('.opt-enable').toggleClass('enabled disabled');
    });
});
