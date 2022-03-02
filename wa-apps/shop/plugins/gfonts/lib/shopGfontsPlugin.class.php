<?php

class shopGfontsPlugin extends shopPlugin
{
    public function frontendHook()
    {
        if (/* $this->getSettings('enabled') && */ !stripos(wa()->getConfig()->getCurrentUrl(), 'amp/') && !strpos(waRequest::getUserAgent(), 'Trident') && wa()->getEnv() === 'frontend' && !isset(wa()->getView()->smarty->registered_filters['output']['shopGfontsPlugin_process'])) {
            wa()->getView()->smarty->registerFilter('output', [$this, 'process']);
        }
    }

    public function process($source, Smarty_Internal_Template $template)
    {
        $re = '@(?<url>(https:)?//fonts\.googleapis\.com/css(2)?.*?)(?<end>[\'" ])@';
        $source = preg_replace_callback($re, function ($m) {
            if ($url = $this->getNewUrl($m['url'])) {
                return $url . $m['end'];
            }
            return $m[0];
        }, $source);
        return $source;
    }

    public function getNewUrl($url)
    {
        $css = new shopGfontsPluginCSS($url);
        if (!$css->resourceExists()) {
            $css->download();
            $re = '/url\((?<url>.*?)\)/m';
            $data = preg_replace_callback($re, function ($m) {
                $font = new shopGfontsPluginFont($m['url']);
                if (!$font->resourceExists()) {
                    $font->download()->save();
                }
                return "url(" . $font->getFileurl() . ")";
            }, $css->getData());
            $css->save($data);
        }
        return $css->getFileurl();
    }
}
