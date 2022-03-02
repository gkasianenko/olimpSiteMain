<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */
class securityResultModel extends waModel
{
    protected $table = 'security_result';

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

    public static function push($id_scan, $filename, $result, $error, $filesize=0, $message='',$signature_id=0){
        $data = array('id_scan'=>$id_scan, 'filename'=>$filename, 'result'=>intval($result),'error'=>intval($error),
            'filesize'=>$filesize,'signature_id'=>intval($signature_id));

        $model = new self();
        $data['filename'] = base64_encode($data['filename']);

        if ($find = $model->where($model->getWhereByField($data))->fetch()){
            return $find;
        }else{
            $parent_model = new securityScansModel();

            if ($result==securityHelper::RESULT_DANGER){
                $parent_model->query('update security_scans set count_mailware=count_mailware+1 where id ='.(int)$id_scan);
            }
            $data['message'] = $message;
            $id_inserted     = $model->insert($data);
            return $model->getById($id_inserted);
        }
    }


    public static function founds($id_scan){
        $model = new self();
        return $model->where('id_scan = '.intval($id_scan))->order('id desc');
    }
}