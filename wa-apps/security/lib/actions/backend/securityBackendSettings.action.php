<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */

class securityBackendSettingsAction extends waViewAction
{
    public function execute()
    {

        $this->setLayout(new securityBackendLayout());


        $memory_limit = ini_get('memory_limit');
        $this->view->assign('memory_limit', $memory_limit);

        $max_execution_time = ini_get('max_execution_time');
        $this->view->assign('max_execution_time', $max_execution_time);

        $default_max_filesize = 3;
        $default_max_duration = 3;

        $settings = new waAppSettingsModel();

        $post = array();

        if (waRequest::issetPost('save')){
            $post = waRequest::post();
            $post['max_filesize'] = intval($post['max_filesize']);
            $post['max_duration'] = intval($post['max_duration']);

            if (empty($post['max_filesize'])){
                $post['max_filesize'] = $default_max_filesize;
            }
            if (empty($post['max_duration'])){
                $post['max_duration'] = $default_max_duration;
            }
            $settings->set('security','max_filesize',$post['max_filesize']);
            $settings->set('security','max_duration',$post['max_duration']);

        }else{
            $post['max_filesize'] = $settings->get('security','max_filesize', $default_max_filesize);
            $post['max_duration'] = $settings->get('security','max_duration', $default_max_duration);


        }

        $this->view->assign('post',$post);

    }
}