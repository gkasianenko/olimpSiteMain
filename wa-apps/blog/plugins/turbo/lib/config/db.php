<?php
return array(
    'blog_turbo_posts' => array(
        'post_id' => array('int', 11, 'null' => 0),
        'is_turbo' => array('tinyint', 1),
        ':keys' => array(
            'PRIMARY' => 'post_id',
        ),
    ),
);
