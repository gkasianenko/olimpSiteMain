<?php

require_once dirname(__DIR__) . '/classes/siteReviewscalcFrontendLayout.php';

class siteReviewscalcPluginSettingsAction extends waViewAction
{
    /**
     * @throws waException
     */
    public function execute()
    {
        $plugin = wa('site')->getPlugin('reviewscalc');
        $settings = $plugin->getSettings();
        $this->view->assign('settings', $settings);

        $mItem = new siteReviewscalcPluginItemModel();
        $items = $mItem->getAll();

        $this->view->assign('updated', 0);
        $this->view->assign('items', $items);
    }
}