<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */
class securityBackendActions extends waJsonActions
{

    public function startAction(){
        try{
            
            $find = securityScansModel::find();
            if ($find===false){
                $scan_id = securityScansModel::create();
                $scan_path = wa()->getDataPath("scan_$scan_id");
                waFiles::create($scan_path, true);

                $full_scan = waRequest::get('full_scan', 0, waRequest::TYPE_INT);

                $model = new securityScansModel();
                $model->updateById($scan_id, array('status'=>1, 'full_scan'=>$full_scan));

                if (empty($full_scan)) {
                    //Создаем файл известных файлов
                    securityHelper::CreateKnownFiles($scan_id);
                }
                
            }else{
                $scan_id = $find['id'];
            }

            $this->response = $scan_id;

        }catch(Exception $e){
            $this->errors = $e->getMessage();
        }
    }

    public function getlistAction(){
        try{

            $find = securityScansModel::find();
            if ($find===false){
                throw new Exception(_w('Текущее сканирование не найдено'));
            };

            $fileScanner = new securityFileList($find);

            $this->response = $fileScanner->performScanning();

            $model = new securityScansModel();
            $model->updateById($find['id'], array(
                'count_known'=>$fileScanner->count_known,
                'count_files'=>$fileScanner->ajax_files_found
            ));

        }catch(Exception $e){
            $this->errors = $e->getMessage();
        }
    }

    public function processAction(){
        try {

            $find = securityScansModel::find();
            if ($find===false){
                throw new Exception(_w('Текущее сканирование не найдено'));
            }

            $this->detector = new securityMalwareDetector($find);

//            $this->detector->convert_database();
//            die();

            $result = $this->detector->malwareScanRound();

            json_encode($result);
            if (json_last_error()==JSON_ERROR_UTF8) {
                if (!empty($result['last_file'])) {
                    $result['last_file'] = utf8_encode($result['last_file']);
                }
            }

            $this->response=$result;

        }catch(Exception $e){
            $this->errors = $e->getMessage();
        }
    }

    public function cancelAction(){
        $find = securityScansModel::find();
        if ($find!==false){
            $data = array('status'=>securityHelper::SCAN_CANCEL, 'end'=>date('Y-m-d H:i:s'),'result'=>-1);

            $model = new securityScansModel();
            $model->updateById($find['id'], $data);

            $scan_path = wa()->getDataPath("scan_".$find['id']);
            waFiles::delete($scan_path, true);
        }
    }

    public function completeAction(){
        try {

            $find = securityScansModel::find();
            if ($find===false){
                throw new Exception(_w('Текущее сканирование не найдено'));
            }

            $data = array('status'=>securityHelper::SCAN_COMPLETE, 'end'=>date('Y-m-d H:i:s'),'result'=>-1);

            $model = new securityScansModel();
            $model->updateById($find['id'], $data);

            $scan_path = wa()->getDataPath("scan_".$find['id']);
            waFiles::delete($scan_path, true);

            $this->response = wa()->getAppUrl().'?action=scan&id='.$find['id'];

        }catch(Exception $e){
            $this->errors = $e->getMessage();
        }
    }

}