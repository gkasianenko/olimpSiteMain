<?php

class photosPmPluginBackendDialogSaveController extends waController
{
    public function execute()
    {
        $meta = waRequest::post('meta', array(), waRequest::TYPE_ARRAY_TRIM);
        $default_values = waRequest::post('default_values', array(), waRequest::TYPE_ARRAY_TRIM);

        $plugin = wa('photos')->getPlugin('pm');
        $type = $meta['type'];

        //1. Update meta tags
        if (photosPmPluginHelper::itemExists($type, $meta['id'])) {
            photosPmPluginModels::meta()->insert($meta, 1);
        } else {
            photosPmPluginModels::meta()->deleteByField(array(
                'type' => $meta['type'],
                'id' => $meta['id'],
            ));
        }

        //2. Save default settings
        if (!$default_values) {
            return;
        }

        $param_default_values = false;
        foreach ($default_values as $field => &$default) {
            if (is_array($default)) {
                $param_default_values = true;
                $default = array(
                    'value' => $meta[$field],
                    'param' => key($default),
                    'options' => array_values(reset($default)),
                );
            } else {
                $default = $meta[$field];
            }
        }
        unset($default);

        if ($param_default_values) {
            foreach ($default_values as $default_field => $default_field_entry) {
                $simple_default_values = array();
                if (is_array($default_field_entry)) {
                    //params default value

                    $update_value = array(
                        $default_field => $default_field_entry['value'],
                    );

                    $param = $default_field_entry['param'];
                    $options = $default_field_entry['options'];

                    switch ($type) {
                        case 'photo':
                            switch ($param) {
                                case 'albums':
                                    photosPmPluginModels::meta()->updateByField(array(
                                        'type' => $type,
                                        'id' => photosPmPluginModels::photosAlbumPhotos()
                                            ->select('photo_id')
                                            ->where('album_id IN (i:album_ids)', array(
                                                'album_ids' => $options,
                                            ))->fetchAll(null, true),
                                    ), $update_value);
                                    break;
                                case 'tags':
                                    photosPmPluginModels::meta()->updateByField(array(
                                        'type' => $type,
                                        'id' => photosPmPluginModels::photosPhotoTags()
                                            ->select('photo_id')
                                            ->where('tag_id IN (i:tag_ids)', array(
                                                'tag_ids' => $options,
                                            ))->fetchAll(null, true),
                                    ), $update_value);
                                    break;
                            }
                            break;
                    }
                } else {
                    $simple_default_values[$default_field] = $meta[$default_field];
                }
            }

            if ($simple_default_values) {
                photosPmPluginModels::meta()->updateByField(array(
                    'type' => $type,
                ), $simple_default_values);
            }
        } else {
            photosPmPluginModels::meta()->updateByField(array(
                'type' => $type,
            ), $default_values);
        }

        //save default values to plugin settings
        foreach ($default_values as $field => $default) {
            $type_field_settings = photosPmPluginHelper::getTypeFieldSettings($type, $field);

            if (is_array($default)) {
                if ($type_field_settings) {
                    foreach ($type_field_settings as $key => $setting) {
                        $counter = max(1, $setting['counter']);
                    }
                    unset($key, $setting);
                }
                $new_counter = ifempty($counter, 0) + 1;

                $setting_key = "default_{$type}_{$field}_{$new_counter}";
                $setting = $default;
            } else {
                $setting_key = "default_{$type}_{$field}";
                $setting = $meta[$field];
            }

            if ($setting) {
                if (is_array($setting)) {
                    //delete simple default value, if no params are being saved
                    photosPmPluginModels::appSettings()->del('photos.pm', "default_{$type}_{$field}");

                    //update existing settings's value with the same param
                    if (!empty($type_field_settings)) {
                        foreach ($type_field_settings as $type_field_setting_key => $type_field_setting) {
                            if ($type_field_setting['setting']['param'] != $setting['param']) {
                                continue;
                            }

                            $type_field_setting['setting']['options'] = array_values($type_field_setting['setting']['options']);
                            sort($type_field_setting['setting']['options']);

                            $setting['options'] = array_values($setting['options']);
                            sort($setting['options']);

                            if ($type_field_setting['setting']['options'] != $setting['options']) {
                                continue;
                            }

                            $setting_key = $type_field_setting_key;
                            $setting['param'] = $type_field_setting['setting']['param'];
                            $setting['options'] = $type_field_setting['setting']['options'];
                            break;
                        }
                    }

                    $setting = json_encode($setting);
                } else {
                    //delete default values with params, if no params are being saved
                    if (!empty($type_field_settings)) {
                        foreach (array_keys($type_field_settings) as $key) {
                            photosPmPluginModels::appSettings()->del('photos.pm', $key);
                        }
                    }
                }
                photosPmPluginModels::appSettings()->set('photos.pm', $setting_key, $setting);
            } else {
                //delete empty simple default settings
                if (!is_array($setting) && !strlen($setting)) {
                    photosPmPluginModels::appSettings()->del('photos.pm', $setting_key);
                }
            }
        }
    }
}
