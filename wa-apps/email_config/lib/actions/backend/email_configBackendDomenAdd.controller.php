<?php

class email_configBackendDomenAddController extends waJsonController
{

	public function execute()
	{
		if(waRequest::issetPost('domen')){
			$domen = waRequest::post('domen', '','string_trim');
			$login = waRequest::post('login', '','string_trim');

			$ev = new waEmailValidator();

			if ( $domen == 'other') {
				if (!$login) {
			        $this->errors[_w('meseg')][] = _W('Invalid email format');
			        return;
		        }
				$key = $login;
				if(preg_match('/[@]/',$key)) {
					if (!$ev->isValid($key)) {
			            $this->errors[_w('meseg')][] = _W('Invalid email format');
			            return;
		        	}
				} else {
					if (!preg_match("/^([а-яА-ЯёЁa-zA-Z0-9^\.]+\.[а-яА-ЯёЁa-zA-Z]{2,4})$/u", $key)) {
					    $this->errors[_w('meseg')][] = _W('Invalid email format');
			            return;
					}
				}
			} else {
				if($login){
				$key = $login."@".$domen;

		        if (!$ev->isValid($key)) {
		            $this->errors[_w('meseg')][] = _W('Invalid email format');
		            return;
		        }
				} else {
					$key = $domen;
				}
			}
			
			
			
			$config_path = waSystem::getInstance()->getConfigPath().'/mail.php';
			$config = file_exists($config_path) ? include($config_path) : array();
	        if (!is_array($config)) {
	            $config = array();
	        }
	        if (array_key_exists($key, $config)) {
	        	$this->errors[_w('meseg')][] = _W('This rule already exists.');
	        }
	        $getApp = wa()->getApp();
	        $this->response['url'] = wa()->getAppUrl($getApp)."#/mail/".$key."/";  
		}
	}
}
