<?php

return array(
	'name'        => /*_wp*/('Settings'),
	'description' => /*_wp*/('Manage theme settings'),
	'img'         => 'img/plugin16.png',
	'version'     => '1.1.1',
	'vendor'      => '873332',
	'frontend'    => true,
	'handlers'    => array(
		'customizer'    => 'customizer',
		'frontend_head' => 'frontendHead',
	),
);
