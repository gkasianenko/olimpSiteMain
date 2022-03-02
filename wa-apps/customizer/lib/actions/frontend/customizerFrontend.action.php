<?php

class customizerFrontendAction extends waViewAction
{
    public function execute()
    {
		$this->view->assign('wa_app_version', wa()->getVersion());

		$storage = wa()->getStorage();
		$preview = $storage->get('customizer/route/preview');

		$app_id = waRequest::param('app_id');

		// app_id not valid
		if (!$app_id || !wa()->appExists($app_id)) {
			$description = '<span>' . _w('App ID not defined or App not found') . '</span><br />';
			$description .= '<a href="' . ($preview ? $preview : wa()->getRootUrl()) . '">' . _w('Back to site') . '</a>';

			$this->frontendError(404, _w('Not found'), $description);
			return;
		}

		// app not themes
		if (!wa()->getConfig()->getAppConfig($app_id)->getInfo('themes')) {
			$description = '<span>' . _w('App does not use design themes') . '</span><br />';
			$description .= '<a href="' . ($preview ? $preview : wa()->getRootUrl()) . '">' . _w('Back to site') . '</a>';

			$this->frontendError(404, _w('Not found'), $description);
			return;
		}

		$theme_id = waRequest::param('theme_id');

		// theme_id not valid
		if (!$theme_id || !waTheme::exists($theme_id, $app_id, true)) {
			$description = '<span>' . _w('Theme ID not defined or Theme not found') . '</span><br />';
			$description .= '<a href="' . ($preview ? $preview : wa()->getRootUrl()) . '">' . _w('Back to site') . '</a>';
			$this->frontendError(404, _w('Not found'), $description);
			return;
		}

		$is_auth = $this->getConfig()->getOption('is_admin') ? wa()->getUser()->isAdmin() : (wa()->getUser() ? true : false);

		// user not auth
		if (!$is_auth) {
			$description = '<span>' . _w('User not logged or not an administrator') . '</span><br />';
			$description .= '<a href="' . $this->view->getHelper()->loginUrl() . '">' . _w('Log in') . '</a>';

			$this->frontendError(403, _w('Forbidden'), $description);
			return;
		}

        // create draft id
		$uuid = waString::uuid();
		$draft_id = $this->getConfig()->getOption('draft_prefix') . $uuid;

        // create draft
		$draft = new customizerDraft($draft_id);
		$draft->create($theme_id);

		// set draft as preview
		$key = wa()->getRouting()->getDomain() . '/theme';
		$storage->set($key, $draft_id);

        // get or clear route a preview
		if (!$preview) {
			$preview = $this->getRoutePreview($app_id);
		} else {
			$storage->del('customizer/route/preview');
		}

        // locale
        $locale = wa()->getLocale();

        // config
		$config = array(
			'_csrf'    => htmlspecialchars(waRequest::cookie('_csrf', '')),
			'uuid'     => $uuid,
            'app'      => $app_id,
            'theme'    => array(
                'id'   => $theme_id,
                'name' => wao(new waTheme($theme_id, $app_id))->getName(),
            ),
            'draft'    => array(
                'id' => $draft_id,
            ),
			'route'    => array(
                'preview' => $preview,
                'backend' => wa()->getConfig()->getBackendUrl(true),
				'ajax'    => wa()->getAppUrl(null, true),
			),
			'actions'  => array(
				'publish' => $this->getConfig()->getOption('draft_publish'),
				'save'    => $this->getConfig()->getOption('draft_save'),
			),
            'locale'   => $locale,
            'messages' => customizerHelper::getLocaleMessages($this->getApp(), $locale),
		);

        $this->view->assign('config', $config);

        /**
         * @event customizer
         * @param array $config
         * @return array[string]array $return[%plugin_id%] array output
         */
        $customizer = array();
        $event_result = wa()->event('customizer', $config);

        foreach ($event_result as $plugin_id => $plugin_result) {
			if ($plugin_result) {
                $customizer = array_replace_recursive($customizer, $plugin_result);
			}
		}

        $this->view->assign('customizer', $customizer);

		/**
         * @event frontend_head
         * @return array[string]string $return[%plugin_id%] html output
         */
        $this->view->assign('frontend_head', wa()->event('frontend_head'));

		/**
         * @event frontend_footer
         * @return array[string]string $return[%plugin_id%] html output
         */
        $this->view->assign('frontend_footer', wa()->event('frontend_footer'));
    }

    private function getRoutePreview ($app)
    {
        $domain = wa()->getRouting()->getDomain();
        $routes = wa()->getRouting()->getRoutes($domain);
        $route = false;

        foreach (array_reverse($routes) as $r) {
            if ($app === $r['app'] && empty($r['private'])) {
                $route = $r;
                break;
            }
        }

        return '/' . ($route ? waRouting::getUrlByRoute($route) : wa()->getRootUrl());
    }

	private function frontendError ($code = 404, $message = '', $description = '')
	{
		$this->getResponse()->setStatus($code);
		$this->getResponse()->setTitle($code.'. '.$message);

		$this->view->assign('error_code', $code);
		$this->view->assign('error_message', $message);
		$this->view->assign('error_description', $description);

		$this->setTemplate('FrontendError');
	}
}
