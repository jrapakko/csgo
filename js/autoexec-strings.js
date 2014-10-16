$(document).ready(function() {
    $.get('/autoexec/autoexec_template.html', function(data) {
        // console.log(data);
        console.log(JSON.parse(data));
    });
});