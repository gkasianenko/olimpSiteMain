<?php

class email_configCheckCli extends waCliController
{

    public function execute()
    {
        $settings = new waAppSettingsModel();

        $path = $this->getConfig()->getPath('config', 'mail');
        $config = file_exists($path) ? include($path) : array();

		if (!is_array($config) OR empty($config)) return;

        foreach ($config as $mail => $value) {
        		$check = new email_configCheckSend($value,$mail);
                $error = $check->send();
                if( !empty($error)){
                    waLog::dump($error, 'email_config/checkCli.log');
                }
        }
        $settings->set('email_config', 'lastCheckCli', time());

        if ( $settings->get('email_config','notifications_sms') != 'On' ) return;

        $status = unserialize($settings->get('email_config', 'status'));
        foreach ($status as $mail => $value) {
            if ( empty($value['status']) ){
                self::sendSms($mail, 'established');
            } else {
                self::sendSms($mail, 'possible');
            }
        }
    }
    protected static function sendSms($mail,$status)
    {
        $settings = new waAppSettingsModel();
        $s_mail = 'status_'.$mail;

        if( $settings->get('email_config',$s_mail) ==  $status){
            return;
        }
        $settings->set('email_config',$s_mail,$status);

        $to =  $settings->get('email_config','phone_to');
        $body = $settings->get('email_config',$status);

        $view = wa()->getView();
        $view->assign('mail', $mail);
        $text = $view->fetch('string:'.$body);

        $sms = new waSMS();
        if ($sms->send($to, $text, ($settings->get('email_config','phone_sender')) ? $settings->get('email_config','phone_sender') : null ) ){

        }
    }
}
