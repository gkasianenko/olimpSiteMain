<?php

class photosPmPluginHelper
{
    /**
     * @return photosPmPlugin
     */
    public static function plugin()
    {
        static $plugin;
        if (!$plugin) {
            $plugin = wa('photos')->getPlugin('pm');
        }
        return $plugin;
    }


    public static function itemExists($type, $id)
    {
        static $result = array();
        $item_key = "{$type}.{$id}";

        if (isset($result[$item_key])) {
            return $result[$item_key];
        }

        static $models = array();
        if (!$models) {
            $models = array(
                'photo' => photosPmPluginModels::photosPhoto(),
                'album' => photosPmPluginModels::photosAlbum(),
                'tag' => photosPmPluginModels::photosTag(),
            );
        }

        $result[$item_key] = $models[$type]->countByField('id', $id) > 0;
        return $result[$item_key];
    }

    public static function getDefaultValueByParams($type, $id, $field)
    {
        $param_default_settings = array();
        $type_field_settings = self::getTypeFieldSettings($type, $field);
        if ($type_field_settings) {
            foreach ($type_field_settings as $setting_key => $setting) {
                $param_default_settings[$setting['counter']] = $setting['setting'];
            }
        }

        if ($param_default_settings) {
            krsort($param_default_settings);    //try to find latest setting by starting with largest available counter
            foreach ($param_default_settings as $setting) {
                $default_value_applies = self::defaultValueSettingApplies($type, $id, $setting);
                if ($default_value_applies) {
                    return $setting['value'];
                }
            }
        }
    }

    private static function defaultValueSettingApplies($type, $id, $setting)
    {
        switch ($type) {
            case 'photo':
                switch ($setting['param']) {
                    case 'albums':
                        $result = photosPmPluginModels::photosAlbumPhotos()->countByField(array(
                            'photo_id' => $id,
                            'album_id' => $setting['options'],
                        )) > 0;
                        break;
                    case 'tags':
                        $result = photosPmPluginModels::photosPhotoTags()->countByField(array(
                            'photo_id' => $id,
                            'tag_id' => $setting['options'],
                        )) > 0;
                        break;
                }
                break;
        }

        return ifempty($result, false);
    }

    public static function getTypeFieldSettings($type, $field)
    {
        static $result = array();
        $key = "{$type}_{$field}";

        if (isset($result[$key])) {
            return $result[$key];
        }

        $result[$key] = array();
        $settings = self::plugin()->getSettings();

        if (!$settings) {
            return $result[$key];
        }

        foreach ($settings as $setting_key => $setting_value) {
            if (!self::checkParamDefaultSetting($setting_key, true, $m)) {
                continue;
            }

            array_shift($m);
            list($setting_type, $setting_field, $setting_counter) = $m;

            $setting_type_field_key = "{$setting_type}_{$setting_field}";
            $result[$setting_type_field_key][$setting_key] = array(
                'setting' => $setting_value,
                'type' => $setting_type,
                'field' => $setting_field,
                'counter' => intval($setting_counter),
            );
        }

        return $result[$key];
    }

    public static function updateParamDefaultSettings($param, $id = null)
    {
        if ($id) {
            $param_default_settings = self::getParamDefaultSettings();

            if (!$param_default_settings) {
                return;
            }

            foreach ($param_default_settings as $key => $setting) {
                if ($setting['param'] != $param) {
                    continue;
                }

                $option_key = array_search($id, $setting['options']);

                if ($option_key === false) {
                    continue;
                }

                unset($setting['options'][$option_key]);

                if (count($setting['options'])) {
                    photosPmPluginModels::appSettings()->set('photos.pm', $key, json_encode($setting));
                } else {
                    photosPmPluginModels::appSettings()->del('photos.pm', $key);
                }
            }
        } else {
            $settings = self::plugin()->getSettings();
            if ($settings) {
                foreach ($settings as $key => $setting) {
                    if (!self::checkParamDefaultSetting($key)) {
                        continue;
                    }

                    if ($setting['param'] != $param) {
                        continue;
                    }

                    $options_changed = false;

                    switch ($param) {
                        case 'tags':
                            static $tags;
                            if (is_null($tags)) {
                                $tags = photosPmPluginModels::photosTag()->select('id')->fetchAll(null, true);
                                if (!is_array($tags)) {
                                    $tags = array();
                                }
                            }

                            $missing_tags_options = array_diff($setting['options'], $tags);

                            if (count($missing_tags_options)) {
                                foreach ($missing_tags_options as $missing_tag) {
                                    $option_key = array_search($missing_tag, $setting['options']);
                                    if ($option_key !== false) {
                                        unset($setting['options'][$option_key]);
                                        $options_changed = true;
                                    }
                                }
                            }
                            break;
                    }

                    if ($options_changed) {
                        if (count($setting['options'])) {
                            photosPmPluginModels::appSettings()->set('photos.pm', $key, json_encode($setting));
                        } else {
                            photosPmPluginModels::appSettings()->del('photos.pm', $key);
                        }
                    }
                }
            }
        }
    }

    private static function getParamDefaultSettings()
    {
        $result = array();
        $settings = self::plugin()->getSettings();
        foreach ($settings as $key => $setting) {
            if (self::checkParamDefaultSetting($key)) {
                $result[$key] = $setting;
            }
        }
        return $result;
    }

    private static function checkParamDefaultSetting($key, $return = false, &$m = null)
    {
        if ($return) {
            $regexp = '@^default_([^_]+)_([^_]+)_(\d+)$@';
            return preg_match($regexp, $key, $m);
        } else {
            $regexp = '@^default_[^_]+_[^_]+_\d+$@';
            return preg_match($regexp, $key);
        }
    }
}
