<?php

return array(
    'enabled' => array(
        'title' => 'Плагин включен',
        'control_type' => waHtmlControl::CHECKBOX,
        'value' => 1,
    ),

    'urls' => array(
        'title' => 'Адреса для предзагрузки на всех страницах',
        'description' => 'По одному на каждой строке',
        'control_type' => waHtmlControl::TEXTAREA,
    ),
);