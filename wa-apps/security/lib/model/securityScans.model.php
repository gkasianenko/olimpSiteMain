<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */
class securityScansModel extends waModel
{
    protected $table = 'security_scans';

    public $m_id = null;

    public function getById($value)
    {
        $this->m_id = $value;
        $data = parent::getById($value);
        return $data;
    }

    public static function factory($id, $return_data = false){
        $model = new self();
        $data = $model->getById($id);

        return (!$data) ? false : ($return_data ? $data : $model);
    }

    public static function create($data=array('status'=>0)){
        $model = new self();
        return $model->insert($data);
    }

    public static function find(){
        $model = new self();
        $find  = $model->where('status >= 0')->fetch();
        return empty($find) ? false : $find;
    }
}