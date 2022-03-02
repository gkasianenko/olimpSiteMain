<?php

class siteReviewscalcPluginHelper
{
    /**
     * @param string $form_selector
     * @param string $success_selector
     * @param string $error_selector
     * @throws waException
     */
    public static function handler($form_selector = '', $captcha_selector = '', $success_selector = '', $error_selector = '') {
        if (empty($form_selector)) {
            return '';
        }
        else {
            $plugin = wa('site')->getPlugin('reviewscalc');
            $view = wa('site')->getView();

            $view->assign('form_selector', $form_selector);
            $view->assign('captcha_selector', $captcha_selector);
            $view->assign('success_selector', $success_selector);
            $view->assign('error_selector', $error_selector);

            $siteUrl = wa('site')->getRouteUrl('site/frontend');
            $siteUrl = rtrim($siteUrl, '/my/') . '/';
            $view->assign('site_url', $siteUrl);

            $mItems = new siteReviewscalcPluginItemModel();
            $settingsArray = $plugin->getSettings();

            $settings = [];
            $items = $mItems->where('is_enabled=1')->fetchAll();

            foreach (['price1', 'price2', 'criteria_sign', 'criteria_value'] as $prop) {
                $settings[$prop] = $settingsArray[$prop];
            }

            $view->assign('settings',$settings);
            $view->assign('items',$items);

            return $view->fetch($plugin->getPluginPath() . '/templates/helpers/handler.html');
        }
    }
}