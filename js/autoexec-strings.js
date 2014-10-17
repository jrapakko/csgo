$(document).ready(function() {
    $.get('/csgo/autoexec/autoexec_template.html', function(data) {
        // console.log(data);
        console.log($.parse(data));
    });
});