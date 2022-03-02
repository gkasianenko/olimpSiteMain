<?php
return array (
  'name' => 'Social meta',
  'description' => '',
  'img' => 'img/fields.png',
  'version' => '1.0.1',
  'vendor' => '972539',
  'handlers' => 
  array (
      'backend_post_edit' => 'backendPostEdit',
      'post_save' => 'postSave',
      'post_publish' => 'postSave',
      'frontend_post' => 'frontendPost',
  ),
);
