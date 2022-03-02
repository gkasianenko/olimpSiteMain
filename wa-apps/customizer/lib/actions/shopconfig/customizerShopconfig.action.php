<?php

class customizerShopconfigAction extends waViewAction
{
    public function execute()
    {
        if (waRequest::post('save')) {
            $this->save();
			$this->view->assign('saved', 1);
        }

		$this->setLayout(new customizerDefaultLayout());
        $this->getResponse()->setTitle(_w('Shop app config manage page'));

        $app_config = wa()->getConfig()->getAppConfig('shop');
        $config_path = $app_config->getConfigPath('config.php');
        $frontend_ppp_mobile = $frontend_ppp_desktop = $backend_ppp = $app_config->getOption('products_per_page');

        if (file_exists($config_path)) {
            $pattern = '/products_per_page.*\?\s*(\d+)\s*:\s*(\d+)\s*:\s*(\d+)\s*,/im';
            $subject = @file_get_contents($config_path) ?: '';
            $matches = array();

            if (preg_match($pattern, $subject, $matches) && count($matches) > 3) {
                array_shift($matches);
                list($frontend_ppp_mobile, $frontend_ppp_desktop, $backend_ppp) = $matches;
            }
        }

        $this->view->assign('customizer_frontend_ppp_mobile', $frontend_ppp_mobile);
        $this->view->assign('customizer_frontend_ppp_desktop', $frontend_ppp_desktop);
        $this->view->assign('customizer_backend_ppp', $backend_ppp);
    }

	private function save()
    {
        $data = waRequest::post();

        $app_config = wa()->getConfig()->getAppConfig('shop');
        $config_path = $app_config->getConfigPath('config.php');

        if (file_exists($config_path)) {
            $config = include($config_path);
        } else {
            $config = array();
        }

        foreach ($data as $key => $value) {
            if ($app_config->getOption($key) !== null) {
                $config[$key] = $value;
            }
        }

        // a little magic...
        waUtils::varExportToFile($config, $config_path . '.tmp');

        $subject = @file_get_contents($config_path . '.tmp') ?: '';
        $default_value = $app_config->getOption('products_per_page');
        $format = 'wa()->getEnv() == "frontend" ? waRequest::isMobile() ? %d : %d : %d';
        $replacement = sprintf(
            $format,
            ifset($data['customizer_frontend_ppp_mobile'], $default_value),
            ifset($data['customizer_frontend_ppp_desktop'], $default_value),
            ifset($data['customizer_backend_ppp'], $default_value)
        );
        $pattern = '/[\'"]EXPRESSION:PRODUCTS_PER_PAGE[\'"]/';

        if ($config_content = preg_replace($pattern, $replacement, $subject)) {
            waFiles::write($config_path, $config_content);
        } else {
            unset($config['products_per_page']);
            waUtils::varExportToFile($config, $config_path);
        }

        waFiles::delete($config_path . '.tmp');
    }
}
