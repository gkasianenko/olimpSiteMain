<?php

return array(
	'name'        => /*_wp*/('Styles'),
	'description' => /*_wp*/('Manage theme styles'),
	'img'         => 'img/plugin16.png',
	'version'     => '1.4.2',
	'vendor'      => '873332',
	'frontend'    => true,
	'handlers'    => array(
		'customizer'    => 'customizer',
		'frontend_head' => 'frontendHead',
	),
);
