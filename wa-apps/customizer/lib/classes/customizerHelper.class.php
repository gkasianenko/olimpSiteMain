<?php

class customizerHelper
{
	public static function getLocaleMessages($app_id, $locale = null)
    {
		if (!$locale) {
            $locale = wa()->getLocale();
        }
		
		$plugin_id = '';
		$key = self::getKey($app_id, $plugin_id);
		$path = $plugin_id ? 'plugins/' . $plugin_id . '/' : '';
        $path = wa()->getAppPath($path . 'locale/' . $locale, $app_id) . '/LC_MESSAGES/' . $key . '.po';
		
		$messages = array();
		if (file_exists($path)) {
			$gettext = new waGettext($path, true);
			$content = $gettext->read();
			if (!empty($content['messages'])) {
				$messages = $content['messages'];
			}
		}
		
		return array(
			$locale => $messages,
		);
    }
	
	private static function getKey(&$app_id, &$plugin_id)
    {
        if (is_array($app_id)) {
            $key = $app_id[0] . '_' . $app_id[1];
			$plugin_id = $app_id[1];
            $app_id = $app_id[0];
            return $key;
        } elseif (strpos($app_id, '_') !== false) {
            $key = $app_id;
			$plugin_id = substr($key, strpos($key, '_') + 1);
            $app_id = substr($key, 0, strpos($key, '_'));
            return $key;
        } else {
            return $app_id;
        }
    }
}
