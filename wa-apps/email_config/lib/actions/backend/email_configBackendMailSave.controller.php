<?php

class email_configBackendMailSaveController extends waJsonController
{
	public function execute()
	{
		$path = $this->getConfig()->getPath('config', 'mail');
		$mail_congig = file_exists($path) ? include($path) : array();

		$param = array('type' => 'smtp');

		$mail 				= waRequest::post('mail', '' , waRequest::TYPE_STRING );
		$mail = urldecode($mail);
		$param['login']		= waRequest::post('login', '' , waRequest::TYPE_STRING );
		$param['password'] 	= waRequest::post('password', '', waRequest::TYPE_STRING );
		$param['host'] 		= waRequest::post('host', '', waRequest::TYPE_STRING );
		$param['port'] 		= waRequest::post('port', '', waRequest::TYPE_INT );
		$post_encryption = (int) waRequest::post('encryption');
		switch ($post_encryption) {
			case 0:
				$encryption = 'ssl';
				break;
			case 1:
				$encryption = 'tls';
				break;
			default:
				$encryption = '';
				break;
		}
		$param['encryption']= $encryption;

		if(!$mail){
			waLog::log("don't save mail: $mail", 'email_config/email_config.log');
			return;
		}

		if($mail != 'default'){
			$ev = new waEmailValidator();
			if(preg_match('/[@]/',$mail)) {
				if (!$ev->isValid($mail)) {
					waLog::log("don't save mail: $mail", 'email_config/email_config.log');
			        return;
		        }
			} else {
				if (!preg_match("/^([а-яА-ЯёЁa-zA-Z0-9^\.]+\.[а-яА-ЯёЁa-zA-Z]{2,4})$/u", $mail)) {
					waLog::log("don't save mail: $mail", 'email_config/email_config.log');
			        return;
				}
			}
		}


		if (isset($mail_congig[$mail]['password']) ) {
			if (!waRequest::issetPost('a2')){
				$param['password'] = $mail_congig[$mail]['password'];
			}
		} elseif (!waRequest::issetPost('a2')){
			$param['password'] = '';
		}

		//logAction
		if ( empty($mail_congig[$mail])) {
			$this->logAction('new_mail', $mail);
		} else {
			$this->logAction('save_mail', $mail);
		}
		$mail_congig[$mail] = $param;

		waUtils::varExportToFile($mail_congig, $path);

		if ( waRequest::issetPost('check')){
			$check = new email_configCheckSend($param,$mail);
	        $errors = $check->send();
	        if(!empty($errors)){
				$this->response['check'] = _w('In attempt of connection to the server SMTP occurred a mistake') .": ".$errors;
			} else{
				$this->response['check'] = _w('Connection to the SMTP-server established successfully');
			}
		}

	}
}
