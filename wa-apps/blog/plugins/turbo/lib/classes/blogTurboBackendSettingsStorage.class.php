<?php

class blogTurboBackendSettingsStorage extends blogTurboSettingsStorage
{
	public function getGeneralStorefrontSettings()
	{
		return $this->getStorefrontSettings(self::GENERAL_STOREFRONT);
	}

	public function getDefaultSettings()
	{
		return $this->buildSettingsByParams(
			$this->getDefaultPluginSettingsAssoc(),
			$this->getDefaultStorefrontSettingsAssoc()
		);
	}
}
