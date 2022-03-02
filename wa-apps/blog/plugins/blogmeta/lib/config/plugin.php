<?php
return array (
	'name' => 'META-теги для блога',
	'description' => 'SEO-оптимизация метатегов - title, description и keywords',
	'img' => 'img/blogmeta.png',
	'version' => '1.07',
	'vendor' => '973724',
	'custom_settings'   => false, //формирование пользовательского интерфейса настроек
	'frontend'          => false, //флаг, обозначающий, есть ли у приложения фронтенд
	'handlers' => array(
		'backend_blog_edit'     	=> 'backendBlogEdit',
		'frontend_post'				=> 'frontendPost',
		'frontend_action_default'	=> 'frontendActionDefault',
		'frontend_action_page'		=> 'frontendActionPage',
	),
);
