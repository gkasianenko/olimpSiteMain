<?php

class siteCustomerHelper
{
    public static function getPartnerGrids($photos)
    {
        $partnerItems = [];

        foreach ($photos as $p) {
            $partnerItems[] = [
                'id' => $p['id'],
                'image_url' => $p['thumb_0x300']['url'],
                'name' => $p['name'],
                'frontend_link' => $p['frontend_link'],
            ];
        }

        $chunkSize = ['col1' => 2, 'col2' => 3, 'col3' => 3, 'col4' => 3];
        $chunks = [];

        foreach ($chunkSize as $chunkIndex => $chunkSizeItem) {
            $list = array_rand($partnerItems, $chunkSizeItem);

            foreach ($list as $item) {
                $chunks[$chunkIndex][] = $partnerItems[$item];
            }

            foreach ($list as $item) {
                unset($partnerItems[$item]);
            }
        }

        return $chunks;
    }

    public static function getBreadcrumbs($page)
    {
        $page_model = new sitePageModel();
        $breadcrumbs = array();
        $root_url = wa()->getAppUrl(null, true);
        $root_page_id = $page['id'];
        while ($page['parent_id']) {
            $page = $page_model->getById($page['parent_id']);
            $breadcrumbs[] = array(
                'url' => $root_url.$page['full_url'],
                'name' => $page['name'] ? $page['name'] : $page['title'],
                'parent_id' =>  $page['parent_id'] ? $page['parent_id'] : null,
                'page_id' =>  $page['id'],
            );
            $root_page_id = $page['id'];
        }
        //$this->view->assign('root_page_id', $root_page_id);
        return array_reverse($breadcrumbs);
    }

    public static function multiPages(array $pages){
        $h = new siteViewHelper(wa('site'));
        $items = [];
        foreach ($pages as $page_id) {
            $page = $h->page($page_id);
            if (!empty($page)) {
                $items[$page['id']] = $page;
            }
        }

        usort($items, function($a,$b) {
            if ($a['sort'] == $b['sort']) {
                return 0;
            }
            return ($a['sort'] < $b['sort']) ? -1 : 1;
        });

        return $items;
    }
}
