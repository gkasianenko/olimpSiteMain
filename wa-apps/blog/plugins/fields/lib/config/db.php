<?php
return array(
    'blog_fields_plugin_post_params' => array(
        'post_id' => array('int', 10, 'unsigned' => 1, 'null' => 0),
        'name' => array('varchar', 255, 'null' => 0),
        'value' => array('text'),
        ':keys' => array(
            'post_param' => array('post_id', 'name', 'unique' => 1),
        ),
    ),
);
