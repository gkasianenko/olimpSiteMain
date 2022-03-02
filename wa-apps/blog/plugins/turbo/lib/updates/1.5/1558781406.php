<?php

$app_settings_model = new waAppSettingsModel();
$settings_json = $app_settings_model->get('blog.turbo', 'settings');
$settings_state = json_decode($settings_json, true);

if (is_array($settings_state) && !array_key_exists('storefront_settings', $settings_state))
{
	$default_plugin_settings = array(
		'is_enabled' => false,
	);

	$plugin_settings = array();
	foreach ($default_plugin_settings as $name => $default_value)
	{
		$plugin_settings[$name] = array_key_exists($name, $settings_state)
			? $settings_state[$name]
			: $default_value;

		unset($settings_state[$name]);
	}




	$default_storefront_settings = array(
		'title' => '',
		'description' => '',
		'language' => 'ru',
		'number_of_posts' => '500',
		'is_enabled_pages' => false,
		'posts_per_page' => '50',
	);

	$general_storefront_settings = array();
	foreach ($default_storefront_settings as $name => $default_value)
	{
		$general_storefront_settings[$name] = array_key_exists($name, $settings_state)
			? $settings_state[$name]
			: $default_value;

		unset($settings_state[$name]);
	}


	$settings_state['plugin_settings'] = $plugin_settings;
	$settings_state['storefront_settings'] = array(
		'*' => $general_storefront_settings,
	);

	$app_settings_model->set('blog.turbo', 'settings', json_encode($settings_state));
}
