<?php


class blogTurboPluginSettingsSaveController extends waJsonController
{
	public function execute()
	{
		$this->response['success'] = false;

		$json_state = waRequest::post('state');
		$state = json_decode($json_state, true);

		if (!is_array($state))
		{
			return;
		}

		$settings_controller = new blogTurboSettingsController();

		$settings_controller->saveSettings($state);

		$this->response['success'] = true;
		$this->response['settings_state'] = $settings_controller->getSettingsState();
	}
}
