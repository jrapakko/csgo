$('.save-opts').on('click', processSave);

function printAutoExec(obj) {
    // console.log(obj);
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
    // console.log(obj);
    for ( opt in obj.opts ) {
        if (obj.opts[opt].enable == true && obj.opts[opt].value != '') {
            str += obj.opts[opt].opt + ' ' + obj.opts[opt].value + ';\n'
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
        // console.log(jsonObj);
        // console.log($.parseJSON(data));
        // console.log(printAutoExec($.parseJSON(data)));
        var vars = $('table#rate, table#netgraph, table#video, table#audio, table#mouse, table#game, table#viewmodel, table#hud, table#xhair, table#keybinds, table#misc');
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

    // slider parsing
    var sliderVars = $('tr.slider', section);
    sliderVars.each(function() { parseSlider(jsonObj, this, name); });

    // color slider parsing
    var colorSliderVars = $('tr.color-slider', section);
    colorSliderVars.each(function() { parseColorSlider(jsonObj, this, name); });

    // dropdown & color dropdown parsing
    var dropdownVars = $('tr.dropdown, tr.color-dropdown', section);
    dropdownVars.each(function() { parseDropdown(jsonObj, this, name); });

    // toggle parsing
    var toggleVars = $('tr.toggle', section);
    toggleVars.each(function() { parseToggle(jsonObj, this, name); });

    // text parsing
    var textVars = $('tr.text', section);
    textVars.each(function() { parseText(jsonObj, this, name); });

}

function parseSlider(jsonObj, slider, name) {

    var cvar = $(slider).attr('id');
    // check to see if user has disabled the option

    var enable = !$(slider).find('a.opt-enable > span').hasClass('disabled');

    // get the value
    var value = $(slider).find('td > input.sliderValue').val();

    setCvar(jsonObj, cvar, name, enable, value);
}

function parseColorSlider(jsonObj, slider, name) {

    var cvar = $(slider).attr('id');
    // check to see if user has disabled the option

    var enable = !$(slider).find('a.opt-enable > span').hasClass('disabled');

    // get the value
    var value = $(slider).find('td > .color-slider').val();

    setCvar(jsonObj, cvar, name, enable, value);
}

function parseDropdown(jsonObj, dropdown, name) {
    var cvar = $(dropdown).attr('id');

    var enable = !$(dropdown).find('a.opt-enable > span').hasClass('disabled');

    var value = $(dropdown).find('td > .dropdown-cvar > button').val();

    setCvar(jsonObj, cvar, name, enable, value);

}

function parseToggle(jsonObj, toggle, name) {
    var cvar = $(toggle).attr('id');
    var enable = !$(toggle).find('a.opt-enable > span').hasClass('disabled');
    var isOff = $(toggle).find('td > .checkbox-inline > div.toggle').hasClass('off');
    var value = isOff ? 0 : 1;
    setCvar(jsonObj, cvar, name, enable, value);
}

function parseText(jsonObj, textObj, name) {
    var cvar = $(textObj).attr('id');
    var enable = !$(textObj).find('a.opt-enable > span').hasClass('disabled');
    var value = $(textObj).find('td > input:text').val();
    if (value != "") {
        value = '"' + value + '"';
    }
    setCvar(jsonObj, cvar, name, enable, value);
}

function setCvar(jsonObj, cvar, name, enable, value) {
    // if not user disabled and value is not a placeholder, enable and set the value
    if (enable && value != "") {
        jsonObj[name].opts[cvar].enable = true;
        jsonObj[name].opts[cvar].value = value;
    } else {    // make sure it gets disabled if user disabled it after inputting a value
        jsonObj[name].opts[cvar].enable = false;
    }
}