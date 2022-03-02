<?php

class email_configBackendMailAction extends waViewAction
{
	public function execute()
	{
		$path = $this->getConfig()->getPath('config', 'mail');
		$config = file_exists($path) ? include($path) : array();

		$mail = waRequest::get('email', false, 'string' );
		$mail = urldecode($mail);
		if ( $mail == 'default'){
			$email_title = _wp('The default setting for all email addresses');
		} elseif ( !strripos($mail, "@") ) {
			$email_title = sprintf(_w('The default setting of all email addresses @%s'), $mail);
		} else {
			$email_title = _w("Mail setup")." ".$mail;
		}

		$this->view->assign('config', array_key_exists($mail, $config) ? self::test_mail($config[$mail]) : self::test_mail() );
		$this->view->assign('mail', $mail);
		$this->view->assign('email_title', $email_title);
	}

	private function test_mail($array = array())
	{
		if ( !array_key_exists( 'type', $array) ) $array['type'] = '';
		if ( !array_key_exists( 'host', $array) ) $array['host'] = '';
		if ( !array_key_exists( 'port', $array) ) $array['port'] = '';
		if ( !array_key_exists( 'login', $array) ) $array['login'] = '';
		if ( !array_key_exists( 'password', $array) ) $array['password'] = '';
		if ( !array_key_exists( 'encryption', $array) ) $array['encryption'] = 'ssl';
		return $array;
	}
}
