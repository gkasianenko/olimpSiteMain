<?php

//TODO: remove this class after 'options_wrapper' is added to RADIOGROUP controls in framework

class photosPmPluginHtmlControl
{
    public static $default_charset = 'utf-8';

    //"overridden"

    public static function getRadiogroupControl($name, $params = array())
    {
        $control = '';
        $id = 0;
        $value = htmlentities((string)$params['value'], ENT_QUOTES, self::$default_charset);
        $options = isset($params['options']) ? (is_array($params['options']) ? $params['options'] : array($params['options'])) : array();
        foreach ($options as $option) {
            ++$id;
            $option_value = $option['value'];
            if ($option_value == $value) {
                $params['checked'] = 'checked';
            } elseif (isset($params['checked'])) {
                unset($params['checked']);
            }
            self::makeId($params, $name, md5($option_value));
            $option_value = htmlentities((string)$option_value, ENT_QUOTES, self::$default_charset);
            $control_name = htmlentities($name, ENT_QUOTES, self::$default_charset);

            /**/
            $radio = "<input type=\"radio\" name=\"{$control_name}\" value=\"{$option_value}\"";
            $radio .= self::addCustomParams(array('id', 'class', 'style', 'checked', 'readonly', 'disabled',), $params);
            $radio .= ">\n";

            if (!empty($option['title'])) {
                $option_title = htmlentities(self::_wp($option['title'], $params), ENT_QUOTES, self::$default_charset);
                $label = "<label";
                $label .= self::addCustomParams(array('class', 'style',), $option);
                $label .= ">{$radio} {$option_title}</label>\n";
                $radio = $label;
            }

            $control .= $radio;
            /**/

            $control .= self::getControlDescription(array_merge($params, array('description' => null), $option));
            if ($id < count($options)) {
                $control .= $params['control_separator'];
            }
        }
        return $control;
    }

    //copy & paste

    private static function addCustomParams($list, $params = array())
    {
        $params_string = '';
        foreach ($list as $param => $target) {
            if (is_int($param)) {
                $param = $target;
            }
            if (isset($params[$param])) {
                $param_value = $params[$param];
                if (is_array($param_value)) {
                    if (array_filter($param_value, 'is_array')) {
                        $param_value = json_encode($param_value);
                    } else {
                        $param_value = implode(' ', $param_value);
                    }
                }
                if ($param_value !== false) {
                    if (in_array($param, array('title', 'description', 'placeholder'))) {
                        $param_value = self::_wp($param_value, $params);
                    } elseif (in_array($param, array('disabled', 'readonly'))) {
                        $param_value = $param;
                    }
                    $param_value = htmlentities((string)$param_value, ENT_QUOTES, self::$default_charset);
                    if (in_array($param, array('autofocus'))) {
                        $params_string .= " {$target}";
                    } else {
                        $params_string .= " {$target}=\"{$param_value}\"";
                    }
                }
            }
        }
        if (!empty($params['data'])) {
            $data = array();
            foreach ($params['data'] as $field => $value) {
                $data['data-'.$field] = trim(json_encode($value), '"');
            }
            $params_string .= self::addCustomParams(array_keys($data), $data);
        }
        return $params_string;
    }

    private static function getControlDescription($params)
    {
        $description = '';
        if (!empty($params['description_wrapper']) && !empty($params['description'])) {
            $description = sprintf($params['description_wrapper'], self::_wp($params['description'], $params));
        }
        return $description;
    }

    public static function makeId(&$params, $name = '', $id = null)
    {
        static $counter = 0;
        //settings_{$name}_{$id}
        $params['id'] = $id ? $id : ((isset($params['id']) && $params['id']) ? $params['id'] : strtolower(__CLASS__));
        if (isset($params['namespace'])) {
            $params['id'] .= '_'.implode('_', (array)$params['namespace']);
        }
        if ($name) {
            $params['id'] .= "_{$name}";
        } elseif ($name === false) {
            $params['id'] .= ++$counter.'_';
        }
        $params['id'] = preg_replace(array('/[_]{2,}/', '/[_]{1,}$/'), array('_', ''), str_replace(array('[', ']', '.'), '_', $params['id']));
    }

    private static function _wp($param, $params = array())
    {
        $translate = (!empty($params['translate']) && is_callable($params['translate'])) ? $params['translate'] : '_wp';
        if (is_array($param)) {
            if (!isset($params['translate']) || !empty($params['translate'])) {
                $param[key($param)] = call_user_func($translate, current($param));
            }
            $string = call_user_func_array('sprintf', $param);
        } elseif (!isset($params['translate']) || !empty($params['translate'])) {
            $string = call_user_func($translate, $param);
        } else {
            $string = $param;
        }
        return $string;
    }
}
