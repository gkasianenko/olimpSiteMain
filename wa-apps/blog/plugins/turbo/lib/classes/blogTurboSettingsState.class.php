<?php

class blogTurboSettingsState
{
	private $state = array();

	public function __construct($state_json)
	{
		$state = json_decode($state_json, true);

		if (is_array($state))
		{
			$this->state = $state;
		}
	}

	/**
	 * @return array
	 */
	public function getPluginSettings()
	{
		return array_key_exists('plugin_settings', $this->state) && is_array($this->state['plugin_settings'])
			? $this->state['plugin_settings']
			: array();
	}

	/**
	 * @param $storefront
	 * @return array
	 */
	public function getStorefrontSettings($storefront)
	{
		if (!array_key_exists('storefront_settings', $this->state) || !is_array($this->state['storefront_settings']))
		{
			return array();
		}

		return array_key_exists($storefront, $this->state['storefront_settings']) && is_array($this->state['storefront_settings'][$storefront])
			? $this->state['storefront_settings'][$storefront]
			: array();
	}

	public function assoc()
	{
		return array(
			'plugin_settings' => array_key_exists('plugin_settings', $this->state) && is_array($this->state['plugin_settings'])
				? $this->state['plugin_settings']
				: array(),

			'storefront_settings' => array_key_exists('storefront_settings', $this->state) && is_array($this->state['storefront_settings'])
				? $this->state['storefront_settings']
				: array(),
		);
	}
}
