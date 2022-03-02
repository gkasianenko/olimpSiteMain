<?php

class photosPmPluginBackendDialogAction extends waViewAction
{
    const CONTROL_RADIOGROUP = 'PhotosPmPluginRadiogroupControl';

    public function execute()
    {
        $type = waRequest::get('type');
        $id = waRequest::get('id', null, waRequest::TYPE_STRING_TRIM);

        $plugin = photosPmPluginHelper::plugin();
        $controls_class = new photosPmPluginDefaultOptionsControls(compact('type', 'id'));
        waHtmlControl::registerControl(self::CONTROL_RADIOGROUP, array('photosPmPluginHtmlControl', 'getRadiogroupControl'));

        //item dummy
        $item = array(
            'type' => _wp($type),
            'name' => null,
        );

        //add item name to dummy
        if ($type == 'photo') {
            $photo_data = photosPmPluginModels::photosPhoto()->
                select('name, ext')->
                where('id = i:0', $id)->
                fetchAssoc();

            if (is_array($photo_data)) {
                $item['name'] = implode('.', $photo_data);
            }
        } elseif ($type == 'album') {
            $album_name = photosPmPluginModels::photosAlbum()->
                select('name')->
                where('id = i:0', $id)->
                fetchField();

            if (!empty($album_name)) {
                $item['name'] = $album_name;
            }
        } elseif ($type == 'tag') {
            $tag_name = $id;
            $id = photosPmPluginModels::photosTag()->
                select('id')->
                where('name = s:0', $tag_name)->
                fetchField();

            if (!empty($id)) {
                $item['name'] = $tag_name;
            }
        }

        //if item exists
        if (strlen($item['name'])) {
            $controls = array();

            $control_params = array(
                'namespace'           => 'meta',
                'title_wrapper'       => '%s',
                'description_wrapper' => '<br><span class="hint">%s</span>',
            );

            $controls_config = array(
                'title' => array(
                    'control_type' => waHtmlControl::TEXTAREA,
                    'params' => array(
                        'title' => 'TITLE',
                    ),
                ),
                'keywords' => array(
                    'control_type' => waHtmlControl::TEXTAREA,
                    'params' => array(
                        'title' => 'META keywords',
                    ),
                ),
                'description' => array(
                    'control_type' => waHtmlControl::TEXTAREA,
                    'params' => array(
                        'title' => 'META description',
                    ),
                ),
                'type' => array(
                    'control_type' => waHtmlControl::HIDDEN,
                    'params' => array(
                        'value' => $type,
                        'control_wrapper' => '%s%s%s',
                        'description_wrapper' => '%s',
                    ),
                ),
                'id' => array(
                    'control_type' => waHtmlControl::HIDDEN,
                    'params' => array(
                        'value' => $id,
                        'control_wrapper' => '%s%s%s',
                        'description_wrapper' => '%s',
                    ),
                ),
            );

            $default_value_params = array(
                'photo' => array(
                    _wp('in this photo’s albums only') => 'albums',
                    _wp('with this photo’s tags only') => 'tags',
                ),
            );

            $meta = photosPmPluginModels::meta()->getById(array($type, $id));
            if (!is_array($meta)) {
                $meta = array();
            }

            //add "apply to all" controls
            $meta_from_default_settings = array();
            foreach ($controls_config as $field => $control) {
                if (!in_array($field, array('id', 'type'))) {
                    if (isset($meta[$field])) {
                        $control['params']['value'] = $meta[$field];
                    } else {
                        $default_value = $plugin->getSettings("default_{$type}_{$field}");
                        if (!strlen($default_value)) {
                            $default_value = photosPmPluginHelper::getDefaultValueByParams($type, $id, $field);
                        }
                        $control['params']['value'] = $default_value;
                        $meta_from_default_settings[$field] = $default_value;
                    }

                    $params_controls = array();

                    switch ($type) {
                        case 'photo':
                            $default_values_common_title = _wp('apply this value to all photos');
                            break;
                        case 'album':
                            $default_values_common_title = _wp('apply this value to all albums');
                            break;
                        case 'tag':
                            $default_values_common_title = _wp('apply this value to all tags');
                            break;
                    }

                    //add applicable default value options
                    if (isset($default_value_params[$type])) {
                        foreach ($default_value_params[$type] as $param_title => $param) {
                            $param_control = $controls_class->get($param, $field);
                            if ($param_control) {
                                $params_controls[] = array(
                                    'title' => $param_title,
                                    'value' => $param,
                                    'description' => '<div class="pm-default-param-options-container" style="margin-left: 3em; display: none;">'
                                        .$param_control.'</div>',
                                );
                            }
                        }

                        if ($params_controls) {
                            $default_value_controls = waHtmlControl::getControl(self::CONTROL_RADIOGROUP, 'show_default_param_options', array(
                                'options' => $params_controls,
                                'class' => 'pm-default-param-options-show',
                                'control_wrapper' => '<div style="padding-left: 2em; display: none;" class="pm-default-params">'
                                    .'<div class="pm-default-param-container">%s%s%s</div></div>',
                                'description_wrapper' => '<br>%s',
                                'control_separator' => '</div><div class="pm-default-param-container">',
                            ));
                        }
                    }

                    $control['params']['description'] = waHtmlControl::getControl(waHtmlControl::CHECKBOX, $field, array(
                        'namespace' => 'default_values',
                        'title' => $default_values_common_title,
                        'control_wrapper' => '%2$s %1$s %3$s'.ifempty($default_value_controls),
                        'title_wrapper' => '%s',
                        'class' => 'pm-default-value'
                    ));

                    if (!isset($control['params']['control_wrapper'])) {
                        $control['params']['control_wrapper'] = '<div class="field"><div class="name">%s</div><div class="value">%s%s</div></div>';
                    }
                }

                $controls[] = waHtmlControl::getControl($control['control_type'], $field, array_merge($control['params'], $control_params));
            }

            //cache default values to meta table
            if (!$meta) {
                photosPmPluginModels::meta()->insert($meta_from_default_settings + compact('id', 'type'), 1);
            }

            $this->view->assign('controls', implode('', $controls));
        }

        $this->view->assign('item', $item);
    }
}
