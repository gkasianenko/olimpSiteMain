<?php
/**
 * Download the interface for sending a test letter
 */
class email_configBackendSendAction extends waViewAction
{
	public function execute()
	{
        $path = $this->getConfig()->getPath('config', 'mail');
        $mail = file_exists($path) ? include($path) : array();

		$contact_name = $this->getUser()->getName();

        if (array_key_exists('default', $mail)){
			unset($mail['default']);
        }

        $email_config = array();
        foreach ($mail as $key => $value) {
        	if (!stristr($key, "@")) {
        		$email_config[] = "info@".$key;
        		$email_config[] = "shop@".$key;
        	} else {
        		$email_config[] = $key;
        	}
        }
        $email_config = array_unique($email_config);

        $this->view->assign(array(
            "contact_name" => $contact_name,
            "email_config" => $email_config,
            'lang' => substr(wa()->getLocale(), 0, 2)
        ));
	}
}
