jQuery(document).ready(function($) {
    
    $('.opt-enable').on('click', 'span', function(event) {
        return toggleCfgCommand(this, event)
    });
    $('.opt-enable').keydown(function(event) {
        if ( event.which == 13 ) {
            return toggleCfgCommand($(this).children('span'), event)
        }
    });
});

function toggleCfgCommand(obj, event) {
    event.stopPropagation();
    event.preventDefault();
    $(obj).toggleClass('enabled disabled glyphicon-ok glyphicon-remove glyphicon-green glyphicon-red');
    var p = $(obj).parents('tr');
    p.toggleClass('danger');
    p.find('td > code').toggleClass('text-muted');
    p.find('td > pre').toggleClass('text-muted');
    p.find('td > pre > code').toggleClass('text-muted keep-color');
    return false;
}
