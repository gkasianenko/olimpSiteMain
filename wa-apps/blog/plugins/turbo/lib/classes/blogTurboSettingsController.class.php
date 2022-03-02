<?php

class blogTurboSettingsController
{
	public function getSettingsState()
	{
		$storefronts = $this->getStorefronts();

		$app_settings_model = new waAppSettingsModel();
		$settings_state_json = $app_settings_model->get('blog.turbo', 'settings');

		$settings_state = new blogTurboSettingsState($settings_state_json);

		return array(
			'storefronts' => $storefronts,
			'storefronts_with_personal_settings' => $this->getStorefrontsWithPersonalSettings($settings_state, $storefronts),
			'settings' => $this->getSettings($settings_state, $storefronts),
		);
	}

	public function saveSettings(array $settings_form_state)
	{
		$app_settings_model = new waAppSettingsModel();

		//$settings_form_state['storefront_settings'] = $this->filterEmptyStorefrontSettings($settings_form_state['storefront_settings']);

		$app_settings_model->set('blog.turbo', 'settings', json_encode($settings_form_state));
	}

	private function getStorefronts()
	{
		$storefronts = array();

		foreach (wa()->getRouting()->getByApp('blog') as $domain => $routes)
		{
			if (!is_array($routes))
			{
				continue;
			}

			foreach ($routes as $route)
			{
				if (!is_array($route) || !array_key_exists('url', $route))
				{
					continue;
				}

				$storefronts[] = $domain . '/' . $route['url'];
			}
		}

		return $storefronts;
	}

	private function getStorefrontsWithPersonalSettings(blogTurboSettingsState $settings_state, array $storefronts)
	{
		$state_assoc = $settings_state->assoc();

		return array_key_exists('storefront_settings', $state_assoc) && is_array($state_assoc['storefront_settings'])
			? array_keys($state_assoc['storefront_settings'])
			: array();
	}

	private function getSettings(blogTurboSettingsState $settings_state, array $storefronts)
	{
		$settings_storage = new blogTurboBackendSettingsStorage();
		$general_settings = $settings_storage->getGeneralStorefrontSettings();

		$plugin_settings_assoc = array(
			'is_enabled' => $general_settings->isEnabled(),
		);

		return array(
			'plugin_settings' => $plugin_settings_assoc,
			'storefront_settings' => $this->getAllStorefrontSettings($settings_state, $general_settings, $storefronts),
		);
	}

	private function getAllStorefrontSettings(blogTurboSettingsState $settings_state, blogTurboSettings $general_settings, $storefronts)
	{
		$all_storefronts_settings = array(
			array(
				'storefront' => blogTurboSettingsStorage::GENERAL_STOREFRONT,
				'title' => $general_settings->getTitle(),
				'description' => $general_settings->getDescription(),
				'language' => $general_settings->getLanguage(),
				'number_of_posts' => $general_settings->getNumberOfPosts(),
				'is_enabled_pages' => $general_settings->isEnabledPages(),
				'posts_per_page' => $general_settings->getPostsPerPage(),
			)
		);
		foreach ($storefronts as $storefront)
		{
			$storefront_settings_assoc = $settings_state->getStorefrontSettings($storefront);

			if (count($storefront_settings_assoc) === 0)
			{
				continue;
			}

			$result_settings = array(
				'storefront' => $storefront,

				'title' => $this->getTitle($storefront_settings_assoc, $general_settings),
				'description' => $this->getDescription($storefront_settings_assoc, $general_settings),
				'language' => $this->getLanguage($storefront_settings_assoc, $general_settings),
				'number_of_posts' => $this->getNumberOfPosts($storefront_settings_assoc, $general_settings),
				'is_enabled_pages' => $this->isEnabledPages($storefront_settings_assoc, $general_settings),
				'posts_per_page' => $this->getPostsPerPage($storefront_settings_assoc, $general_settings),
			);

			$all_storefronts_settings[] = $result_settings;
		}

		return $all_storefronts_settings;
	}

	private function filterEmptyStorefrontSettings($storefront_settings_params)
	{
		$settings_storage = new blogTurboBackendSettingsStorage();

		$default_settings = $settings_storage->getDefaultSettings();

		$storefront_settings_filtered = array();

		foreach ($storefront_settings_params as $storefront => $settings_params)
		{
			if (!$this->isStorefrontSettingsDefault($settings_params, $default_settings))
			{
				$storefront_settings_filtered[$storefront] = $settings_params;
			}
		}

		return $storefront_settings_filtered;
	}

	private function isStorefrontSettingsDefault($settings_params, blogTurboSettings $default_settings)
	{
		return trim($settings_params['title']) === $default_settings->getTitle()
		&& trim($settings_params['description']) === $default_settings->getDescription()
		&& $settings_params['language'] === $default_settings->getLanguage()
		&& intval($settings_params['number_of_posts']) === intval($default_settings->getNumberOfPosts())
		&& $settings_params['is_enabled_pages'] === $default_settings->isEnabledPages()
		&& intval($settings_params['posts_per_page']) === intval($default_settings->getPostsPerPage());
	}


	private function getTitle($storefront_settings_params, blogTurboSettings $general_settings)
	{
		return array_key_exists('title', $storefront_settings_params)
			? $storefront_settings_params['title']
			: $general_settings->getTitle();
	}
	private function getDescription($storefront_settings_params, blogTurboSettings $general_settings)
	{
		return array_key_exists('description', $storefront_settings_params)
			? $storefront_settings_params['description']
			: $general_settings->getDescription();
	}
	private function getLanguage($storefront_settings_params, blogTurboSettings $general_settings)
	{
		return array_key_exists('language', $storefront_settings_params)
			? $storefront_settings_params['language']
			: $general_settings->getLanguage();
	}
	private function getNumberOfPosts($storefront_settings_params, blogTurboSettings $general_settings)
	{
		return array_key_exists('number_of_posts', $storefront_settings_params)
			? $storefront_settings_params['number_of_posts']
			: $general_settings->getNumberOfPosts();
	}
	private function isEnabledPages($storefront_settings_params, blogTurboSettings $general_settings)
	{
		return array_key_exists('is_enabled_pages', $storefront_settings_params)
			? $storefront_settings_params['is_enabled_pages']
			: $general_settings->isEnabledPages();
	}

	private function getPostsPerPage($storefront_settings_params, blogTurboSettings $general_settings)
	{
		return array_key_exists('posts_per_page', $storefront_settings_params)
			? $storefront_settings_params['posts_per_page']
			: $general_settings->getPostsPerPage();
	}
}
