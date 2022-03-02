<?php

class customizerSettingsPluginFrontendSetController extends waJsonController
{
    public function execute()
    {
        $id = waRequest::post('id');
		$data = waRequest::post('settings', array());

		foreach ($data as $app => $settings) {
			if (wa()->appExists($app)) {
				try {
					$theme = new waTheme($id, $app);
					//$theme->__set('Settings', $settings);
					$theme->offsetSet('Settings', $settings);
					$theme->save();
				} catch (waException $e) {
					$this->errors[] = $e->getMessage();
				}
			}
		}
    }
}
