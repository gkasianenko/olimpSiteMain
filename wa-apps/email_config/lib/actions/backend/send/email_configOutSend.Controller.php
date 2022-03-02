<?php
/**
 * send letters
 */
class email_configOutSendController extends waJsonController
{
	public function execute()
	{
		$setName = waRequest::post('setName', "", 'string');
		$setEmail = waRequest::post('setEmail', "", 'string');
		if ( $setEmail == 'other'){
			$goEmail = waRequest::post('setEmailOther', '', 'string');
		} else {
			$goEmail = $setEmail;
		}
		$to = waRequest::post('to', "", 'string');
		$subject = waRequest::post('subject', "", 'string');
		$email_body = waRequest::post('email_body', "", 'string');

		$goEmail = trim($goEmail);

		// Validate email
        $ev = new waEmailValidator();

        if (!$goEmail) {
        	if ( $setEmail == 'other'){
				$this->errors[_w('Fill in all required fields')][] ='setEmailOther' ;
			} else {
				$this->errors[_w('Fill in all required fields')][] ='setEmail' ;
			}
        } else {
            if (!$ev->isValid($goEmail)) {
            	if ( $setEmail == 'other'){
					$this->errors[_w('Email is not valid')][] = 'setEmailOther' ;
				} else {
					$this->errors[_w('Email is not valid')][] = 'setEmail' ;
				}
            }
        }

        if (!$to) {
				$this->errors[_w('Fill in all required fields')][] ='to' ;
        } else {
            if (!$ev->isValid($to)) {
				$this->errors[_w('Email is not valid')][] = 'to' ;
            }
        }
        //errors == true
        if ($this->errors) return;

        $path = $this->getConfig()->getPath('config', 'mail');
        $mail_config = file_exists($path) ? include($path) : array();

        //check send
        list($mail, $domen) = explode("@", $goEmail);
        if (array_key_exists ($goEmail, $mail_config)) {
        	$key = $goEmail;
        	$key_param = $mail_config[$goEmail];
        } elseif (array_key_exists ($domen, $mail_config)) {
        	$key = $domen;
        	$key_param = $mail_config[$domen];
        } elseif (count($mail_config) >0 ){
        	$errors = sprintf(_w('For Email %s, no rules setting! Create a new rule!'), $goEmail);
        	$this->errors[$errors][] = '';
        }
        if (isset($key)) {
        	$check = new email_configCheckSend($key_param,$key);
        	$errors = $check->send();
        	if(!empty($errors)){
				$errors = _w('In attempt of connection to the server SMTP occurred a mistake') .": ".$errors;
				$this->errors[$errors][] = '';
				return;
			}
        }

		//send
		$message = new waMailMessage($subject, $email_body);
	    $message->setFrom($goEmail, $setName);
	    $message->setTo($to);
	    $s = $message->send();
	    $this->response['send'] = $s;
	}
}
