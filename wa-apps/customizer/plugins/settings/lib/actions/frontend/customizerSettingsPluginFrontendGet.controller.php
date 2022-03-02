<?php

class customizerSettingsPluginFrontendGetController extends waJsonController
{
    public function execute ()
    {
		$id = waRequest::post('id');
		$app = waRequest::post('app');

        $theme = new waTheme($id, $app);
		$theme_settings = $this->getThemeSettings($theme);

		$panels = array();
		$ungrouped_fields = array();
		$section_field_items = array();

		$divider = null;

		foreach ($theme_settings as $setting_var => $setting) {

			if (!empty($setting['tooltip']) && ($data = @json_decode($setting['tooltip'], true))) {
				unset($setting['tooltip']);
			} else {
				$data = array();
			}

			switch ($setting['control_type']) {

				case 'group_divider':

					// create panel
					$panels[$setting_var] = $this->getPanel($setting, $data);

                    $panel = false;
                    if (!empty($setting['group'])) {
                        $panel = $setting['group'];
                        $panel = preg_replace("/\/?{$setting_var}$/", '', $panel);
                        $panel = explode('/', $panel);
                        $panel = array_pop($panel);
                    }
					$field = $setting_var;

					if ($panel) {
						$panels[$panel]['fields'][$field] = $this->getField($setting, $data, array('panel' => $setting_var, 'default' => false));
					} else {
						$divider = $setting_var;
						$section_field_items[$field] = $this->getField($setting, $data);
					}

					break;

				case 'paragraph':

                    $panel = $divider;
                    if (!empty($setting['group'])) {
                        $panel = $setting['group'];
                        $panel = explode('/', $panel);
                        $panel = array_pop($panel);
                    }
					$field = $setting_var;

					if ($panel) {
						$panels[$panel]['fields'][$field] = $this->getField($setting, $data, array('default' => false));
					} else {
						$ungrouped_fields[$field] = $this->getField($setting, $data, array('default' => false));
					}

					break;

				case 'image':

                    $panel = $divider;
                    if (!empty($setting['group'])) {
                        $panel = $setting['group'];
                        $panel = explode('/', $panel);
                        $panel = array_pop($panel);
                    }
					$field = 'settings.' . (empty($setting['parent']) ? $theme->app : $theme->parent_theme->app) . '.' . $setting_var;

					$theme_path = empty($setting['parent']) ? $theme->path : $theme->parent_theme->path;
					$theme_url = empty($setting['parent']) ? $theme->url : $theme->parent_theme->url;

					if ($panel) {
						$panels[$panel]['fields'][$field] = $this->getField($setting, $data, array('THEME_PATH' => $theme_path, 'THEME_URL' => $theme_url));
					} else {
						$ungrouped_fields[$field] = $this->getField($setting, $data, array('THEME_PATH' => $theme_path, 'THEME_URL' => $theme_url));
					}

					break;

				case 'image_select':

                    $panel = $divider;
                    if (!empty($setting['group'])) {
                        $panel = $setting['group'];
                        $panel = explode('/', $panel);
                        $panel = array_pop($panel);
                    }
					$field = 'settings.' . (empty($setting['parent']) ? $theme->app : $theme->parent_theme->app) . '.' . $setting_var;

					$theme_url = empty($setting['parent']) ? $theme->url : $theme->parent_theme->url;

					if ($panel) {
						$panels[$panel]['fields'][$field] = $this->getField($setting, $data, array('THEME_URL' => $theme_url));
					} else {
						$ungrouped_fields[$field] = $this->getField($setting, $data, array('THEME_URL' => $theme_url));
					}

					break;

				default:

                    $panel = $divider;
                    if (!empty($setting['group'])) {
                        $panel = $setting['group'];
                        $panel = explode('/', $panel);
                        $panel = array_pop($panel);
                    }
					$field = 'settings.' . (empty($setting['parent']) ? $theme->app : $theme->parent_theme->app) . '.' . $setting_var;

					if ($panel) {
						$panels[$panel]['fields'][$field] = $this->getField($setting, $data);
					} else {
						$ungrouped_fields[$field] = $this->getField($setting, $data);
					}

					break;

			}

		}

		if ($ungrouped_fields) {
			$panels['ungrouped'] = array(
				'title'  => _wp('General settings'),
				'fields' => $ungrouped_fields,
			);
			$section_field_items['ungrouped'] = array(
				'label' => _wp('General settings'),
				'sort'  => -1,
			);
		}

        if ($section_field_items) {
            $panels['settings'] = array(
				'title' => _wp('Settings'),
				'fields' => array(
					'show_invisible_settings' => array(
						'type'    => 'invisible-settings',
						'default' => false,
					),
					'settings' => array(
						'type'  => 'menu',
						'items' => $section_field_items,
					),
				),
			);
        }

        $this->response['panels'] = $this->sort($panels);
    }

	public function getThemeSettings ($theme, $values_only = false)
	{
		$settings = $theme->getSettings($values_only);
		if ($theme->parent_theme) {
			$parent_settings = $theme->parent_theme->getSettings($values_only);
            if ($parent_settings) {
				if (!$values_only) {
					foreach ($parent_settings as &$s) {
						$s['parent'] = 1;
					}
					unset($s);
				}
				foreach ($settings as $k => $v) {
                    $parent_settings[$k] = $v;
                }
                $settings = $parent_settings;
            }
		}
		return $settings;
	}

	private function getPanel ($props, $data = array(), $extra = array())
	{
		$panel = array_merge(
			array(
				'title'  => $props['name'],
				'fields' => array(),
			),
			$extra,
			$data
		);

		return $panel;
	}

	private function getField ($props, $data = array(), $extra = array())
	{
		$field = array_merge(
			array(
				'type'    => str_replace('_', '-', $props['control_type']),
				'label'   => $props['name'],
				'default' => $props['value'],
			),
			array_intersect_key(
				$props,
				array(
					'filename'    => true,
					'options'     => true,
					'description' => true,
					'tooltip'     => true,
				)
			),
			$extra,
			$data
		);

		if (!empty($props['invisible'])) {
			$field['show'] = 'show_invisible_settings';
		}

		return array_filter($field, array($this, 'filterHelper'));
	}

	private function sort ($panels)
	{
		foreach ($panels as &$panel) {
			if ($panel['fields']) {
				$field_sort = 0;
				foreach ($panel['fields'] as &$field) {
					if (!empty($field['items'])) {
						$item_sort = 0;
						foreach ($field['items'] as &$item) {
							if(empty($item['sort'])) {
								$item['sort'] = $item_sort;
							}
							$item_sort++;
						}
						unset($item);
						uasort($field['items'], array($this, 'sortHelper'));
					}
					if(empty($field['sort'])) {
						$field['sort'] = $field_sort;
					}
					$field_sort++;
				}
				unset($field);
				uasort($panel['fields'], array($this, 'sortHelper'));
			}
		}
		unset($panel);
		return $panels;
	}

	public function sortHelper ($a, $b)
    {
		return $a['sort'] - $b['sort'];
    }

	public function filterHelper ($v)
    {
		return $v === '' || !empty($v);
    }
}
