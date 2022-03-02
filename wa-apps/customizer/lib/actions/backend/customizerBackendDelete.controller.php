<?php
/**
 * Delete unused drafts.
 */
class customizerBackendDeleteController extends waJsonController
{
    public function execute()
    {
		$draft_prefix = $this->getConfig()->getOption('draft_prefix');
        $apps = wa()->getApps();
        foreach ($apps as $app => $info) {
			$themes = wa()->getThemes($app);
			foreach ($themes as $theme) {
				if (strpos($theme->id, $draft_prefix, 0) !== false) {
					$theme->delete();
					unset($theme);
				}
			}
        }
		
		// close session
        wa()->getStorage()->close();
    }
}
