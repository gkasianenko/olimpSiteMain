<?php

class email_configSettingsDeleteController extends waJsonController
{
    public function execute()
    {
        $mail = urldecode( waRequest::post('mail') );
        if ($mail) {
            $config_path = waSystem::getInstance()->getConfigPath().'/mail.php';
            $config = include($config_path);
            unset($config[$mail]);
            waUtils::varExportToFile($config, $config_path);
            $this->response['ok'] = true;
            email_configStatus::remove();
            //delete_mail
            $this->logAction('delete_mail', $mail);
        }
    }
}
