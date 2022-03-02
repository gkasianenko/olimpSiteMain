<?php

class authWidget extends waWidget
{
    public function defaultAction()
    {
        $this->display(array(
            'message' => $this->getData(),
            'info' => $this->getInfo(),
            'twodays' => strtotime('-2 days'),
        ));
    }
    
    public function getData()
    {
        $model = new waLogModel();
        $data = $model->where("action = 'login_failed'")->order('datetime DESC')->limit(100)->fetchAll();
        foreach ($data as &$log) {
            $log['params'] = json_decode($log['params'], true);
        }
        return $data;
    }
}