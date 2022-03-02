<?php


class blogTurboPluginSettingsAction extends waViewAction
{
	public function execute()
	{
		$settings_controller = new blogTurboSettingsController();

		$this->view->assign('state', $settings_controller->getSettingsState());
	}
}
