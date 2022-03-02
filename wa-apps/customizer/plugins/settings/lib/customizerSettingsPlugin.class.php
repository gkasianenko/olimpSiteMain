<?php

class customizerSettingsPlugin extends customizerPlugin
{
	public function customizer ($params)
	{
        return $this->includePluginConfig('customizer.php');
	}

	public function frontendHead ()
	{
		$this->addCss('css/frontend/plugin.css');
		$this->addJs('js/frontend/plugin.min.js');
	}
}
