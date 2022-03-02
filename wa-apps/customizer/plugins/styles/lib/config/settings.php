<?php

return array (
    'autoApply'    => array(
        'value'        => true,
        'title'        => /*_wp*/('Auto apply'),
        'description'  => _wp('Apply changes to draft immediately'), // bug: no auto translate description
        'control_type' => waHtmlControl::CHECKBOX,
    ),
    'css'          => array(
        'value'        => 'theme.css',
        'title'        => /*_wp*/('CSS'),
        'description'  => _wp('Theme Style File'), // bug: no auto translate description
        'control_type' => waHtmlControl::INPUT,
    ),
    'min'          => array(
        'value'        => 'theme.min.css',
        'title'        => /*_wp*/('MIN'),
        'description'  => _wp('Compressed Theme Style File'), // bug: no auto translate description
        'control_type' => waHtmlControl::INPUT,
    ),
    'replaceIcons' => array(
        'value'        => false,
        'title'        => /*_wp*/('Replace Icons'),
        'description'  => _wp('Replace Icons when changing Style'), // bug: no auto translate description
        'control_type' => waHtmlControl::CHECKBOX,
    ),
    'icons'        => array(
        'value'        => 'theme.icons.js',
        'title'        => /*_wp*/('Icons'),
        'description'  => _wp('Theme Icons File'), // bug: no auto translate description
        'control_type' => waHtmlControl::INPUT,
    ),
    'iconsMin'     => array(
        'value'        => 'theme.icons.min.js',
        'title'        => /*_wp*/('Icons MIN'),
        'description'  => _wp('Compressed Theme Icons File'), // bug: no auto translate description
        'control_type' => waHtmlControl::INPUT,
    ),
    'config'       => array(
        'value'        => 'customizer.plugin.styles.variables.html',
        'title'        => /*_wp*/('Сonfiguration file'),
        'description'  => _wp('Contains Less variables'), // bug: no auto translate description
        'control_type' => waHtmlControl::HIDDEN,
    ),
    'compatible'   => array(
        'value'        => true,
        'title'        => /*_wp*/('Compatible only'),
        'description'  => _wp('Compatible themes only'), // bug: no auto translate description
        'control_type' => waHtmlControl::CHECKBOX,
    ),
);
