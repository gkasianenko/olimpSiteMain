<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */

class securityBackendScanAction extends waViewAction
{
    public function execute()
    {

        $this->setLayout(new securityBackendLayout());

        $id = waRequest::get('id', 0, waRequest::TYPE_INT);

        if (empty($id)){
            $this->redirect(wa()->getAppUrl());
        }

        $scan = securityScansModel::factory($id, true);

        if (!empty($scan)){

            $model = new securityResultModel();
            $count_warning = $model->where('id_scan = '.intval($id))->where('result='.securityHelper::RESULT_WARNING)->query()->count();
            $this->view->assign('count_warnings', $count_warning);


            $dangers = $model->where('id_scan = '.intval($id))->where('result='.securityHelper::RESULT_DANGER)->query();
            $this->view->assign('dangers', $dangers);

            $warnings = $model->where('id_scan = '.intval($id))->where('result='.securityHelper::RESULT_WARNING)->where('error!='.securityHelper::ERROR_TO_BIG)->query();
            $this->view->assign('warnings', $warnings);

            $warnings_big = $model->where('id_scan = '.intval($id))->where('result='.securityHelper::RESULT_WARNING)->where('error='.securityHelper::ERROR_TO_BIG)->fetchAll();

            foreach ($warnings_big as $key=>$value){
                $value['human_size'] = waFiles::formatSize($value['filesize']);
                $warnings_big[$key]=$value;
            }
            $this->view->assign('warnings_big', $warnings_big);
        }

        $this->view->assign('scan', $scan);
    }
}