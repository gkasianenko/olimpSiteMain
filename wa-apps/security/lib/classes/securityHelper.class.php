<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */

class securityHelper
{

    const SCAN_CANCEL = -1;
    const SCAN_COMPLETE = -2;

    const RESULT_WARNING = 1;
    const RESULT_DANGER = 2;

    const ERROR_NO_READ = 1;
    const ERROR_NO_DIR_LIST = 2;
    const ERROR_TO_BIG = 3;

    const ERROR_FOUND       = 4;
    const ERROR_FOUND_SHELl = 5;
    const ERROR_FOUND_VIRUS = 6;
    const ERROR_FOUND_CODE  = 7;


    public static function getError($found){
        switch($found['error'])
        {

            case self::ERROR_NO_READ:
            case self::ERROR_NO_DIR_LIST:
                return _w('Ошибка чтения');

            case self::ERROR_TO_BIG:
                return _w('Слишком большой файл');

            case self::ERROR_FOUND:
            case self::ERROR_FOUND_SHELl:
                return _w('Обнаружена уязвимость');
            case self::ERROR_FOUND_VIRUS:
                return _w('Обнаружен вирус');
            case self::ERROR_FOUND_CODE:
                return _w('Подозрительный код');
            default:
                return _w('Неизвестная ошибка');

        }
    }

    public static function getErrorDetailed($found){
        switch($found['error'])
        {

            case self::ERROR_NO_READ:
                return _w('Система не может прочитать файл');

            case self::ERROR_NO_DIR_LIST:
                return _w('Система не может открыть каталог для получения списка файлов');

            case self::ERROR_TO_BIG:
                return _w('Размер файла слишком большой для сканирования:').' '.waFiles::formatSize(intval($found['filesize']));

            case self::ERROR_FOUND:
            case self::ERROR_FOUND_SHELl:
            case self::ERROR_FOUND_VIRUS:
            case self::ERROR_FOUND_CODE:
                return str_replace('@_MARKER_@','<span class="b-security__marker">|</span>',$found['message']);

            default:
                return _w('Неизвестная ошибка');

        }
    }

    public static function loadDatabase(){

        $filename = wa()->getAppPath("/lib/data/signatures/malware_db.dat");

        if (!is_file($filename) || !is_readable($filename) || ($data = file_get_contents($filename))===false || empty($data)){
            throw new Exception('Пустая база сигнатур вирусов!');
        }

        $lines = explode("\n", $data);
        $result = array();
        foreach ($lines as $line){
            $line = explode(';', $line);

            if (count($line)!=6) continue;
            $line[5]= base64_decode($line[5]);

            $result[$line[0]] = $line;
        }

        if (empty($result)){
            throw new Exception('Пустая база сигнатур вирусов!');
        }

        return $result;
    }

    /**
     * @param $start - Mysql datatime
     * @param $end   - Mysql datatime
     */
    public static function DateDiff($start, $end){

        $diff = strtotime($end) - strtotime($start);

        $result_diff = array();

        $hours = floor($diff / 3600);
        if (!empty($hours)){
            $result_diff[] = $hours." "._w("час").".";
        }

        $min = floor(($diff % 3600) / 60);
        if (!empty($min)){
            $result_diff[] = $min." "._w("мин").".";
        }

        $sec = $diff % 60;
        if (!empty($sec)){
            $result_diff[] = $sec." "._w("сек").".";
        }

        if (empty($result_diff)){
            return  "-";
        }else{
            return implode(" ", $result_diff);
        }

    }

    public static function CreateKnownFiles($scan_id){
        $scan_path = wa()->getDataPath("scan_$scan_id");

        $known_file = $scan_path.'/known_files.md5';
        file_put_contents($known_file,'');

        $apps = wa()->getApps(true);

        if (!empty($apps)){
            foreach ($apps as $key=>$app){


                $filename = $key.'_'.$app['version'].'_files.md5';
                $filepath = wa()->getAppPath('lib/data/known_files/').$filename;

                if (is_file($filepath)){
                    $part = file_get_contents($filepath);
                    if ($part!==false) {
                        file_put_contents($known_file,$part,FILE_APPEND);
                    }
                }
            }
        }
    }
}