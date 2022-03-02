<?php

class customizerSettingsAction extends waViewAction
{
    public function execute()
    {
		$settings = $this->getConfig()->getOption(null);
        if (waRequest::post('save')) {
            $this->save($settings);
			$this->view->assign('saved', 1);
        }
		
		$this->setLayout(new customizerDefaultLayout());
        $this->getResponse()->setTitle(_w('Customizer settings page'));
		
		$this->view->assign('settings', $settings);
		
		$count = array();
		$apps = wa()->getApps();
        foreach ($apps as $app => $info) {
			$themes = wa()->getThemes($app);
			foreach ($themes as $theme) {
				if (strpos($theme->id, $settings['draft_prefix'], 0) !== false) {
					$count[$theme->id] = true;
					unset($theme);
				}
			}
        }
		$count = count($count);
		
		$this->view->assign('unused_drafts_count', $count);
    }

	private function save(&$settings)
    {
		$settings['is_admin'] = waRequest::post('is_admin') ? 1 : 0;
		$settings['draft_prefix'] = waRequest::post('draft_prefix', 'draft-');
		$settings['draft_publish'] = waRequest::post('draft_publish') ? 1 : 0;
		$settings['draft_save'] = waRequest::post('draft_save') ? 1 : 0;
		$settings['open_top'] = waRequest::post('open_top', 50);
		$config_file = $this->getConfig()->getConfigPath('config.php');
		waUtils::varExportToFile($settings, $config_file);
	}
}
