jQuery(document).ready(function($) {
    
    $('.opt-enable').on('click', 'span', function(event) {
        return toggleCfgCommand(this, event)
    });
    $('.opt-enable').keydown(function(event) {
        if ( event.which == 13 ) {
            return toggleCfgCommand($(this).children('span'), event)
        }
    });

    $('.bootstrapSlider').slider();
    $('.bootstrapSlider').on('slideStop', $(this).parents('td'), slideValChange);

    $('input.sliderValue').keyup($(this), valSlideChange);

    $('.dropdown-cvar > ul > li > a').on('click', changeDropDownVal);
    $('.dropdown-color-cvar > ul > li > a').on('click', changeDropDownColor);

    $('.color-slider').on('slide slideStop', changeCustomXhair);
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
    var textin = '';
    if (p.hasClass('text')) {
        return toggleText(p);
    } else if (p.hasClass('toggle')) {
        return toggleToggle(p);
    } else if (p.hasClass('slider')) {
        return toggleSlider(p);
    }
    return false;
}


function toggleText(obj) {
    textin = obj.find('td > :text');
    if (textin.is(':disabled')) {
        textin.prop({disabled: false});
    } else {
        textin.prop({disabled: true});
    }
    return false;
}

function toggleToggle(obj) {
    textin = obj.find('td > label > div > :checkbox');
    if (textin.is(':disabled')) {
        textin.bootstrapToggle('enable');
    } else {
        textin.bootstrapToggle('disable');
    }
    return false;
}

function toggleSlider(obj) {
    textin = obj.find('td > input');
    if (textin.is(':disabled')) {
        textin.prop({disabled: false});
    } else {
        textin.prop({disabled: true});
    }
    return false;
}

function slideValChange(event) {
    var p = $(this).parents('td');
    p.find('.sliderValue').val(event.value);
}

function valSlideChange(event) {
    var p = $(this).parents('td');
    p.find('input.bootstrapSlider').slider('setValue',Number($(this).val()));
}

function changeDropDownVal(event) {
    event.stopPropagation();
    event.preventDefault();
    var p = $(this).parents('div.dropdown-cvar');
    p.find('button').html($(this).text() + ' <span class="caret"></span>');
    p.find('button').val($(this).attr('href'));
    return false;
}

function changeDropDownColor(event) {
    event.stopPropagation();
    event.preventDefault();
    var p = $(this).parents('div.dropdown-color-cvar');
    p.find('button').css('background-color', $(this).closest('li').css('background-color'));
    return false;
}

function getXhairCustomColor() {
    var r = $('#slider_r').closest('td').find('input').val();
    var g = $('#slider_g').closest('td').find('input').val();
    var b = $('#slider_b').closest('td').find('input').val();
    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function changeCustomXhair(event) {
    var cust = $('#cl_crosshaircolor > td > .dropdown-color-cvar > ul > li').last();
    var color = getXhairCustomColor();
    cust.css('background-color', color);
    var selected = $('#cl_crosshaircolor > td > .dropdown-color-cvar > button');
    if (selected.val() == 5) {
        selected.css('background-color', color);
    }
}