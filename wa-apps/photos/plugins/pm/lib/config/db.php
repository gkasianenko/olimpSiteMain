<?php
return array(
    'photos_pm_meta' => array(
        'type' => array('varchar', 32, 'null' => 0),
        'id' => array('int', 11, 'unsigned' => 1, 'null' => 0),
        'title' => array('text'),
        'keywords' => array('text'),
        'description' => array('text'),
        ':keys' => array(
            'PRIMARY' => array('type', 'id'),
        ),
    ),
);
