<?php
/**
 * Checking the e-mail settings and changing the status
 */
class email_configStatus
{
	public static function changes($mail, $status = false){
        $settings = new waAppSettingsModel();
        $param = unserialize($settings->get('email_config', 'status'));

        $param[$mail] = array(
                'time'      => date("Y-m-d H:i:s"),
                'status'    => $status,
            );

        $settings->set('email_config', 'status', serialize($param));
	}
	public static function getStatusCountNotTrue(){
        $param = unserialize(wa()->getSetting('status',  array(), 'email_config'));
        if(!is_array($param) OR empty($param)) return;

        $val = 0;
        foreach ($param as $key => $value) {
            if ($value['status'] != true) $val++;
        }
        if($val > 0){
            return $val;
        }
        return null;
	}
    /**
     * To remove all unnecessary
     * @return null
     */
    public static function remove()
    {
        $settings = new waAppSettingsModel();
        $status = unserialize($settings->get('email_config', 'status'));
		$status_config = is_array($status) ? $status : array();

        $path = wa()->getConfig()->getPath('config', 'mail');
        if (file_exists($path)) {
            if (!is_writable($path)) {
                return false;
            }
            $mail = include($path);
            if(!is_array($mail)){// if mail dot arrey
                $mail = array();
                waUtils::varExportToFile($mail, $path);
            }
        } else {
            $mail = array();
        }

        if (is_array($status_config) AND !empty($status_config)){
            foreach ($status_config as $key => $value) {
                if ( !array_key_exists($key, $mail) ) unset($status_config[$key]);
            }
        }
        $settings->set('email_config', 'status', serialize($status_config));
    }
}
