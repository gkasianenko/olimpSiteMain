<?php

class blogTurboSettingsStorage
{
	const GENERAL_STOREFRONT = '*';

	protected static $settings_state = null;

	public function getStorefrontSettings($storefront)
	{
		$settings_state = $this->getSettingsState();

		$plugin_settings_params = $this->collectPluginSettingsParams($settings_state);
		$storefront_settings_params = $this->collectStorefrontSettingsParams($settings_state, $storefront);

		return $this->buildSettingsByParams($plugin_settings_params, $storefront_settings_params);
	}


	protected function collectPluginSettingsParams(blogTurboSettingsState $settings_state)
	{
		$plugin_settings = $settings_state->getPluginSettings();

		$result_settings = array();
		foreach ($this->getDefaultPluginSettingsAssoc() as $name => $default_value)
		{
			$result_settings[$name] = array_key_exists($name, $plugin_settings)
				? $plugin_settings[$name]
				: $default_value;
		}

		return $result_settings;
	}

	protected function collectStorefrontSettingsParams(blogTurboSettingsState $settings_state, $storefront)
	{
		$storefront_settings = $settings_state->getStorefrontSettings($storefront);

		if ($storefront === self::GENERAL_STOREFRONT)
		{
			$general_settings = $storefront_settings;
		}
		else
		{
			$general_settings = $settings_state->getStorefrontSettings(self::GENERAL_STOREFRONT);
		}

		$result_settings = array();
		foreach ($this->getDefaultStorefrontSettingsAssoc() as $name => $default_value)
		{
			if (
				array_key_exists($name, $storefront_settings)
				&& (
					($name !== 'title' && $name !== 'description')
					|| (is_string($storefront_settings[$name]) && trim($storefront_settings[$name]) !== '')
				)
			)
			{
				$value = $storefront_settings[$name];
			}
			elseif (array_key_exists($name, $general_settings))
			{
				$value = $general_settings[$name];
			}
			else
			{
				$value = $default_value;
			}

			$result_settings[$name] = $value;
		}

		return $result_settings;
	}


	protected function buildSettingsByParams($plugin_settings_params, $storefront_settings_params)
	{
		$settings = new blogTurboSettings();

		$settings->setIsEnabled($plugin_settings_params['is_enabled']);

		$settings->setTitle($storefront_settings_params['title']);
		$settings->setDescription($storefront_settings_params['description']);
		$settings->setLanguage($storefront_settings_params['language']);
		$settings->setNumberOfPosts($storefront_settings_params['number_of_posts']);
		$settings->setIsEnabledPages($storefront_settings_params['is_enabled_pages']);
		$settings->setPostsPerPage($storefront_settings_params['posts_per_page']);

		return $settings;
	}

	protected function getDefaultPluginSettingsAssoc()
	{
		return array(
			'is_enabled' => false,
		);
	}

	protected function getDefaultStorefrontSettingsAssoc()
	{
		return array(
			'title' => '',
			'description' => '',
			'language' => 'ru',
			'number_of_posts' => 500,
			'is_enabled_pages' => false,
			'posts_per_page' => 50,
		);
	}

	/**
	 * @return blogTurboSettingsState
	 */
	protected function getSettingsState()
	{
		if (self::$settings_state === null)
		{
			$app_settings_model = new waAppSettingsModel();
			$settings_state_json = $app_settings_model->get('blog.turbo', 'settings');

			self::$settings_state = new blogTurboSettingsState($settings_state_json);
		}

		return self::$settings_state;
	}
}
