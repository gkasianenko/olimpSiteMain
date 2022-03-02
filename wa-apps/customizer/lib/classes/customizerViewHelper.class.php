<?php

class customizerViewHelper extends waAppViewHelper
{
	public function customizer ()
	{
		$draft_prefix = wa($this->app_id)->getConfig()->getOption('draft_prefix');
		return strpos(waRequest::getTheme(), $draft_prefix, 0) === false ? $this->toCustomize() : $this->getCustomize();
	}

	private function toCustomize ()
    {
		$html = '';
		$is_auth = wa($this->app_id)->getConfig()->getOption('is_admin') ? wa()->getUser()->isAdmin() : (wa()->getUser() ? true : false);

		if ($is_auth) {
			$config = array(
				'app'   => wa()->getApp(),
				'draft' => array(
					'id' => waRequest::getTheme(),
				),
				'route' => array(
					'url' => wa()->getRouteUrl($this->app_id . '/frontend') . waRequest::getTheme() . '/' . wa()->getApp() . '/',
				),
			);
			$html .= '<script>var $config = ' . waUtils::jsonEncode($config) . ';</script>';

			$view = wa()->getView();
			wa()->getStorage()->set('customizer/route/preview', $view->getHelper()->currentUrl(true));
			$view->assign('url', wa()->getRouteUrl($this->app_id . '/frontend') . waRequest::getTheme() . '/' . wa()->getApp() . '/');
			$view->assign('top', wa($this->app_id)->getConfig()->getOption('open_top'));

			$html .= $view->fetch(wa()->getAppPath('templates/', $this->app_id) . 'ToCustomize.html');
		}

		return $html;
	}

	private function getCustomize ()
	{
		$theme = new waTheme(waRequest::getTheme(), wa()->getApp());
		$config = array(
			'app'   => wa()->getApp(),
			'draft' => array(
				'id' => waRequest::getTheme(),
			),
			'route' => array(
				'url'     => wa()->getRouteUrl($this->app_id . '/frontend') . ($theme->source_theme_id ? $theme->source_theme_id : $theme->id) . '/' . wa()->getApp() . '/',
				'preview' => wa()->getView()->getHelper()->currentUrl(true),
			),
		);

		$html = '<style>.theme-preview { display: none !important; } .customize-unpreviewable { cursor: not-allowed !important; }</style>';
		$html .= '<script>';
		$html .= 'var $config = ' . waUtils::jsonEncode($config) . ';';
		$html .= '$("a").addClass("customize-unpreviewable").each(function() { location.protocol === this.protocol && location.hostname === this.hostname && $(this).removeClass("customize-unpreviewable"); });';
		$html .= '$("body").on("click", "a.customize-unpreviewable", function(e) { e.preventDefault(); })';
		$html .= '</script>';

		return $html;
	}
}
