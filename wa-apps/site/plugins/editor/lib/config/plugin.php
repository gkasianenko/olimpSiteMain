<?php

return array(
    'name' => /*_w*/('Editor'),
    'vendor' => '997050',
    'version' => '1.0.1',
    'img' => 'img/icon.png',
    'custom_settings' => true,
    'frontend' => true,
    'handlers' => array(
    '*' => array(
        array(
            'event_app_id' => 'shop',
            'event' => 'frontend_head',
            'class' => 'siteEditorPlugin',
            'method' => 'frontendPage',
       ),
       array(
            'event_app_id' => 'site',
            'event' => 'frontend_page',
            'class' => 'siteEditorPlugin',
            'method' => 'frontendPage',
       ),
       array(
            'event_app_id' => 'blog',
            'event' => 'frontend_action_page',
            'class' => 'siteEditorPlugin',
            'method' => 'frontendPage',
       ),
       array(
            'event_app_id' => 'blog',
            'event' => 'frontend_post',
            'class' => 'siteEditorPlugin',
            'method' => 'frontendPage',
       ),
    ),
),

);