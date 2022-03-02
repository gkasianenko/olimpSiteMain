<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */

class securityFileList
{
    public $full_scan = false;

    public $found = array();

    public $ajax_files_found = 0;
    public $files_found=0;
    public $count_known = 0;

    public $max_exec_time = 2;

    protected $max_filesize_for_md5 = 0;

    protected $known_md5 = array();

    public $id_scan = 0;

    public $tempdir = '';
    public $base_path = '';
    public $dirlist_filename = '';
    public $filelist_filename = '';
    public $knows_files = '';

    public function __construct($scan)
    {
        $this->id_scan = $scan['id'];
        $this->files_found = 0;
        $this->ajax_files_found = $scan['count_files'];
        $this->count_known = $scan['count_known'];

        $this->max_filesize_for_md5 = 1024*1024;

        $settings = new waAppSettingsModel();
        $this->max_exec_time = (int)$settings->get('security','max_duration',2);

        $this->tempdir = wa()->getDataPath('scan_'.$this->id_scan);

        $this->dirlist_filename = $this->tempdir . '/dirlist.txt';
        $this->filelist_filename = $this->tempdir . '/filelist.txt';

        $this->knows_files = $this->tempdir . '/known_files.md5';

        $this->base_path = waRequest::server('DOCUMENT_ROOT');
    }


    private function fileExecutor($filePath)
    {

        if (is_readable($filePath)) {

            $filesize = filesize($filePath);

            $need_insert = true;
            $md5 = '-';

            //Частичное сканирование
            if (!$this->full_scan) {
                //Вычисляем md5 и сразниваем с известными файлами
                if ($filesize <= $this->max_filesize_for_md5) {
                    $md5 = hash_file('md5', $filePath);

                    if (isset($this->known_md5[$md5])){
                        $list = $this->known_md5[$md5];
                        foreach ($list as $known_file){
                            if ($known_file==$filePath){
                                $need_insert = false;
                                $this->count_known++;
                                break;
                            }
                        }
                    }
                }
            }

            if ($need_insert) {
                $queue_entry = $filePath . ' ' . $md5 . PHP_EOL;
                file_put_contents($this->filelist_filename, $queue_entry, FILE_APPEND);
                $this->ajax_files_found++;
            }

        }else{

            $found = securityResultModel::push(
                $this->id_scan, $filePath,
                securityHelper::RESULT_WARNING,
                securityHelper::ERROR_NO_READ);

            $this->found[$found['id']] = $found;
        }

    }


    public function performScanning()
    {
        $startTime = time();

        if (file_exists($this->dirlist_filename)) {
            $dirs = file_get_contents($this->dirlist_filename);
        }else{
            $dirs = $this->base_path;
        }
        $dirList = explode("\n", $dirs);

        //известные файлы
        if ($this->full_scan==false){

            //Если нет известных файлов, то полное сканирование
            if ((!is_file($this->knows_files)) || (filesize($this->knows_files)==0)){
                $this->full_scan = true;
            }else{


                $knows_files_handle = @fopen($this->knows_files,'r');

                if ($knows_files_handle===false) {
                    throw new Exception('Невозможно открыть файл с известными файлами '.$this->knows_files);
                }

                $this->known_md5 = array();

                while (!feof($knows_files_handle)) {
                    $line = trim(fgets($knows_files_handle));

                    //Пропускаем пустые строки
                    if (empty($line)) {
                        continue;
                    }

                    $md5 = substr($line,0,32);
                    $filename = substr($line,34);

                    if (empty($md5)||empty($filename)) continue;

                    $filename = $this->base_path.'/'.$filename;
                    if (isset($this->known_md5[$md5])){
                        $this->known_md5[$md5][]=$filename;
                    }else{
                        $this->known_md5[$md5] = array($filename);
                    }

                }

                fclose($knows_files_handle);
            }
        }

        while (true) {
            $dirList = array_merge($this->folderWalker(array_shift($dirList)), $dirList);

            //Выход по времени или если закончились папки
            if ((time() - $startTime >= $this->max_exec_time) || (count($dirList) < 1)) break;
        }


        $response['meta'] = array('status' => 'inProcess', 'count_files'=>$this->ajax_files_found, 'count_known'=>$this->count_known);

        //Имеющиеся предупреждения
        if (!empty($this->found)){
            $this->found = array_reverse($this->found);
            $view = wa()->getView();
            $view->assign('founds', $this->found);
            $response['found'] = $view->fetch(wa()->getAppPath('templates/actions/backend/BackendFound.html'));
        }

        //Завершили
        if (empty($this->files_found)){
            $response['meta']['status'] = 'finished';
        }

        file_put_contents($this->dirlist_filename, implode("\n", $dirList));

        return $response;
    }



    private function folderWalker($path)
    {

        $dirList = array();

        if (!empty($path)) {
            if ($currentDir = @opendir($path)) {

                while ($file = readdir($currentDir)) {

                    if ($file === '.' || $file === '..' || is_link($path)) continue;

                    $file = $path . '/' . $file;

                    if ($file == $this->tempdir) continue;

                    if (is_dir($file)) {
                        $dirList[] = $file;
                    }else{
                        $this->fileExecutor($file);
                    }

                    $this->files_found++;

                }

                closedir($currentDir);

            } else {

                //Не можем прочитать каталог
                $found = securityResultModel::push(
                    $this->id_scan, $path,
                    securityHelper::RESULT_WARNING,
                    securityHelper::ERROR_NO_DIR_LIST);

                $this->found[$found['id']] = $found;
            }


        }
        return $dirList;
    }


    public function getInterval()
    {
        return $this->max_exec_time;
    }

    public function setInterval($val)
    {
        $this->max_exec_time = $val;
    }
}