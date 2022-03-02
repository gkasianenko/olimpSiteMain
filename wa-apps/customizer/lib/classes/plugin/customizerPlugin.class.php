<?php

class customizerPlugin extends waPlugin
{
    /**
     * Replace parent method @see waPlugin->addCss()
     */
    protected function addCss ($url, $is_plugin = true)
    {
        if (false === strpos($url, '?')) {
            $url .= '?v=' . $this->getVersion();
            if (waSystemConfig::isDebug()) {
                $url .= '.' . time();
            }
        }
        waSystem::getInstance()->getResponse()->addCss($this->getUrl($url, $is_plugin), $this->app_id);
    }

    /**
     * Replace parent method @see waPlugin->addJs()
     */
    protected function addJs ($url, $is_plugin = true)
    {
        if (false === strpos($url, '?')) {
            $url .= '?v=' . $this->getVersion();
            if (waSystemConfig::isDebug()) {
                $url .= '.' . time();
            }
        }
        waSystem::getInstance()->getResponse()->addJs($this->getUrl($url, $is_plugin), $this->app_id);
    }

    /**
     * Include Plugin config
     *
     * @param  string $filename
     * @return array
     */
    protected function includePluginConfig ($filename)
    {
        $file = $this->path . '/lib/config/' . $filename;
        if (file_exists($file)) {
            return include($file);
        } else {
            return array();
        }
    }
}
