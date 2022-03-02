<?php

return array(
	'name' => 'Турбо-страницы',
	'description' => '',
	'custom_settings' => true,
	'img' => 'img/icon16x16.png',
	'vendor' => '934303',
	'version' => '1.6.0',
	'handlers' => array(
		'routing' => 'routing',
		'backend_post_edit' => 'backendPostEditHandle',
		'post_save' => 'postSaveHandle',
	),
);
