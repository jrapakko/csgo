$(document).ready(function() {
    $.get('/csgo/autoexec/autoexec_template.html', function(data) {
        // console.log(data);
        console.log($.parseJSON(data));
        console.log(printAutoExec($.parseJSON(data)));
    });

    // data:text/plain;charset=utf-8,printAutoExec()
});

$('.save-opts').on('click', processSave);

function printAutoExec(obj) {
    console.log(obj);
    str = '';
    str += '//--------------------------------------------------------------------------------------------//\n';
    str += '//                                 AUTOEXEC GENERATED AT:                                       \n';
    str += '//                        http://jrapakko.github.io/csgo/autoexec                               \n';
    str += '//--------------------------------------------------------------------------------------------//\n';
    str += '\n';
    for ( section in obj ) {
        str += printSection(obj[section]);
    }
    str += '\nhost_writeconfig\n';
    str += 'echo "Autoexec Complete"';
    return str;
}

function printSection(obj) {
    str = '\n';
    str += '//--------------------------------------------------------------------------------------------//\n';
    str += '                              ' + obj.name + '                                \n';
    str += '//--------------------------------------------------------------------------------------------//\n';
    str += '\n';
    console.log(obj);
    for ( opt in obj.opts ) {
        if (obj.opts[opt].enable == true && obj.opts[opt].value != '') {
            str += obj.opts[opt].opt + ' = ' + obj.opts[opt].value + ';\n'
        }
    }
    return str;
}

function processSave(event) {

    // Processes enabled options and writes them into JSON object, then calls print and sets the download text of
    // the <button class="dl-file"> to be the pretty printed text

    var jsonObj = ";"
    $.get('/csgo/autoexec/autoexec_template.html', function(data) {
        jsonObj = $.parseJSON(data);
        console.log(jsonObj);
        // console.log($.parseJSON(data));
        // console.log(printAutoExec($.parseJSON(data)));
        var vars = $('#rate, #netgraph, #video, #audio, #mouse, #game, #viewmodel, #hud, #xhair, table#keybinds, #misc');
        console.log(vars);
        vars.each(function() { parseValues(jsonObj, this) });

        var downloadText = printAutoExec(jsonObj);

        $('.dl-file').prop("href", "data:text/plain;charset=utf-8," + encodeURIComponent(downloadText));

        if ($('.dl-file').hasClass('disabled')) {
            $('.dl-file').toggleClass('disabled');
        }
    });
}

function parseValues(jsonObj, section) {
    var name = $(section).attr('id');
    var cvars = $('tr.slider', section);
}