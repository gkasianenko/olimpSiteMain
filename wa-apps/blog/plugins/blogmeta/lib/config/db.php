<?php
return array(
    'blog_blogmeta' => array(
        'id_type' => array('varchar', 255, 'null' => 0),
        'blog_id' => array('int', 11, 'null' => 0),
        'type' => array('varchar', 255, 'null' => 0),
        'meta_replace' => array('int', 1, 'null' => 0, 'default' => '0'),
        'title' => array('varchar', 255, 'null' => 1),
        'description' => array('varchar', 255, 'null' => 1),
        'keywords' => array('varchar', 255, 'null' => 1),
        'pagination' => array('int', 1, 'null' => 0, 'default' => '0'),
        'title_pagin' => array('varchar', 255, 'null' => 1),
        'description_pagin' => array('varchar', 255, 'null' => 1),
        'keywords_pagin' => array('varchar', 255, 'null' => 1),
        ':keys' => array(
            'PRIMARY' => 'id_type',
        ),
    )
);
