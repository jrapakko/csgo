jQuery(document).ready(function($) {
    
    $('.opt-enable').on('click keydown', 'span', function(event) {
        event.stopPropagation();
        event.preventDefault();
        $(this).toggleClass('enabled disabled glyphicon-ok glyphicon-remove glyphicon-green glyphicon-red');
        $(this).parents('tr').find('td > code').toggleClass('text-muted');
    });
});
