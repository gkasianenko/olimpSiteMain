<?php


class rlogsSettingsSaveController extends waJsonController
{
    /**
     * @throws waException
     */
    public function execute()
    {
        $maxCount = waRequest::post('max_count', 0, waRequest::TYPE_INT);

        $allSets = wa('rlogs')->getConfig()->getOption(null);
        $allSets['max_count'] = $maxCount;

        $this->getConfig()->save($allSets);

//        $appSettingsModel = new waAppSettingsModel();
//        $appSettingsModel->set('rlogs', 'max_count', 5);
    }
}