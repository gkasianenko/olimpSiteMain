<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */

class securityBackendScanlistAction extends waViewAction
{
    public function execute()
    {

        $this->setLayout(new securityBackendLayout());

        $current = securityScansModel::find();
        $this->view->assign('current', $current);

        $scans_model = new securityScansModel();
        $scans = $scans_model->where('status<0')->order('id desc')->query();
        $this->view->assign('scans', $scans);
    }
}