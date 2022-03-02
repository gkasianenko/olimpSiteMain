<?php

return array(
    'name' 				=> 'SEO Meta Robots',
    'img'  				=> 'img/metarobots.png',
	'description'		=> 'Помогает в SEO продвижении: закрывает от индексации ненужные страницы',
	'version'			=> '2.1.1',
	'vendor'			=> 1200329,
	'custom_settings' 	=> false,
	'handlers' => array(
		'backend_menu' => 'backendMenu',
		'frontend_footer' => 'frontendFooter',
		'frontend_category'		=> 'frontendCategory',
		'frontend_product'		=> 'frontendProduct',
		'frontend_head'		    => 'frontendHead',
	),
);