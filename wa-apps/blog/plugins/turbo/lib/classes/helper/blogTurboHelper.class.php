<?php

class blogTurboHelper
{
	private static $info = null;
	private static $current_route = false;

	public static function getCurrentStorefront()
	{
		$route = self::getCurrentRoute();

		if (is_array($route) && array_key_exists('app', $route) && $route['app'] === 'blog')
		{
			$domain = wa()->getRouting()->getDomain();

			return $domain . '/' . $route['url'];
		}

		return null;
	}

	public static function getAssetVersion()
	{
		if (self::$info === null)
		{
			self::$info = wa('blog')->getConfig()->getPluginInfo('turbo');
		}

		return waSystemConfig::isDebug() ? time() : (array_key_exists('version', self::$info) ? '1' : self::$info['version']);
	}

	/**
	 * @return array|null
	 */
	protected static function getCurrentRoute()
	{
		if (self::$current_route === false)
		{
			self::$current_route = wa()->getRouting()->getRoute();
		}

		return self::$current_route;
	}
}
