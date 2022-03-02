<?php

class customizerConfig extends waAppConfig
{
	/* temporarily disable
	 * need to be notified of the number of drafts generated?
    public function onCount()
    {
		$count = array();
		$apps = wa()->getApps();
        foreach ($apps as $app => $info) {
			$themes = wa()->getThemes($app);
			foreach ($themes as $theme) {
				if (strpos($theme->id, 'draft-', 0) !== false) {
					$count[$theme->id] = true;
					unset($theme);
				}
			}
        }
		$count = count($count);
        $url = $this->getBackendUrl(true) . $this->application . '/?module=settings';

        return array(
			'count' => ($count == 0 ? null : $count),
			'url'   => $url
		);
    }
	*/

	public function getRouting($route = array())
    {
        $routes = parent::getRouting($route);

        /**
         * Extend routing via plugin routes
         * @event routing
         * @param array $routes
         * @return array routes collected for every plugin
         */
        $result = wa()->event(array('customizer', 'routing'), $routes);
        $all_plugins_routes = array();
        foreach ($result as $plugin_id => $routing_rules) {
            if ($routing_rules) {
                $plugin = str_replace('-plugin', '', $plugin_id);
                foreach ($routing_rules as $url => &$route) {
                    if (!is_array($route)) {
						//list($route_ar['module'], $route_ar['action']) = explode('/', $route);
						//$route = $route_ar;
						$route_ar = explode('/', $route);
						$route = array(
							'module' => $route_ar[0],
							'action' => !empty($route_ar[1]) ? $route_ar[1] : null, // fix: if routing of a type 'frontendAction'
						);
                    }
                    $route['plugin'] = $plugin;
                    $all_plugins_routes[$url] = $route;
                }
                unset($route);
            }
        }
        $routes = array_merge($all_plugins_routes, $routes);

        return $routes;
    }
}
