<?php

class rlogsPluginsActions extends waPluginsActions
{

    protected $shadowed = true;

    /**
     * @throws waException
     * @throws waRightsException
     */
    public function preExecute()
    {
        if (!$this->getUser()->isAdmin('rlogs')) {
            throw new waRightsException(_ws('Access denied'));
        }
    }

//    public function defaultAction()
//    {
////        $config = $this->getConfig();
////        $sidebar_width = $config->getSidebarWidth();
////
////        echo '<div class="content left' . $sidebar_width . 'px">';
//        parent::defaultAction();
////        echo '</div>';
//    }

//    public function defaultAction()
//    {
//        if (!$this->getUser()->isAdmin($this->getApp())) {
//            throw new waRightsException(_w('Access denied'));
//        }
//        $this->getResponse()->setTitle(_w('Plugin settings page'));
//        $this->setLayout(new glogsDefaultLayout());
//
//        parent::defaultAction();
//    }
}
