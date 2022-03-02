<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */

class securityBackendAction extends waViewAction
{
    public function execute()
    {
        $max_execution_time = ini_get('max_execution_time');

        $settings = new waAppSettingsModel();

        $max_duration = $settings->get('security','max_duration', 3);

        $error_config = array();
        if (($max_duration > $max_execution_time/2)&&($max_execution_time!=0)){
            $error_config[] = "Настройка времени выполнения скрипта должно быть меньше в два раза чем органичение сервера";
        }

        if (!empty($error_config)){
            $this->view->assign('error_config', $error_config);
        }
        $this->view->assign('max_execution_time', $max_execution_time);


        $model = new securityScansModel();
        $find = $model->where('status >= 0')->fetch();

        if (!empty($find)){
            $founds = securityResultModel::founds($find['id']);
            $this->view->assign('founds', $founds->query());
        }

        $last = $model->order('id desc')->fetch();
        $this->view->assign('last', $last);
        $this->view->assign('find', $find);
    }
}