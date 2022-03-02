<?php

require_once dirname(__DIR__) . '/classes/siteReviewscalcFrontendLayout.php';

class siteReviewscalcPluginBackendSaveAction extends waViewAction
{
    public function execute()
    {
        $plugin = wa('site')->getPlugin('reviewscalc');

        $mItem = new siteReviewscalcPluginItemModel();

        if (waRequest::getMethod() === 'post' && $_COOKIE['_csrf'] === $_POST['_csrf']) {

            $pluginSettings = waRequest::post('site_reviewscalc');
            $plugin->saveSettings($pluginSettings);

            $pName = waRequest::post('name');
            $pPrice1 = waRequest::post('price1');
            $pPrice2 = waRequest::post('price2');
            $pSign = waRequest::post('criteria_sign');
            $pValue = waRequest::post('criteria_value');
            $pIsEnabled = waRequest::post('is_enabled');
            $pToDelete = waRequest::post('to_delete');


            $path = wa()->getDataPath("reviewscalc/", true, 'site');

            foreach ($pName as $id => $name) {
                $data = [
                    'name' => trim($pName[$id]),
                    'price1' => trim($pPrice1[$id]),
                    'price2' => trim($pPrice2[$id]),
                    'criteria_sign' => trim($pSign[$id]),
                    'criteria_value' => trim($pValue[$id]),
                    'is_enabled' => boolval(trim($pIsEnabled[$id])),
                ];


                if ($id === 'new') {
                    if (!empty($data['name'])) {
                        $mItem->insert($data);
                    }
                } else {
                    if ($pToDelete[$id] === '1') {
                        $mItem->deleteById($id);
                    } else {
                        $mItem->updateById($id, $data);

                        $file = waRequest::file("logo_{$id}");
                        if ($file->uploaded()) {
                            $image = $file->waImage();
                            $imageFilename = $id . '.' . $file->extension;
                            $imagePath = $path . $imageFilename;

                            if (!$image->save($imagePath)) {
                                throw new ErrorException('Error when upload file', 500);
                            } else {
                                $mItem->updateById($id, ['logo' => $imageFilename]);
                            }
                        }
                    }
                }
            }

            $this->view->assign('updated', 1);
            $items = $mItem->getAll();
            $this->view->assign('items', $items);
        }
    }
}