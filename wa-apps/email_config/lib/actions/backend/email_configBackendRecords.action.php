<?php

class email_configBackendRecordsAction extends waViewAction
{
	/**
	 * все записи
	 * @return [type] [description]
	 */
	public function execute()
	{
		$path = $this->getConfig()->getPath('config', 'mail');
		$param = file_exists($path) ? include($path) : array();

	    $domains = waRequest::get('domains', false, 'string');

	    if ($domains) {
	    	$title = sprintf(_w('Rules for all boxes @%s'), $domains);
	    	if ($param AND is_array($param)){
	    		foreach ($param as $key => $value) {
	    		if (stristr($key, '@')) {
				    list($user, $dom) = explode("@", $key);
				} else {
					$dom = $key;
				}

				if ( $dom != $domains ) continue;

			    $config[$key] = $param[$key];
	    		}
	    	}

	    } else {
	    	$config = $param;
	    	$title  = _wp('All records');
	    }
	    if (!isset($config)) {
	    	$config = false;
	    } elseif ( sizeof($config) == 0 OR !is_array($config)) {
	    	$config = false;
	    }
	    $this->view->assign('status_mail', unserialize(wa()->getSetting('status',  array(), 'email_config')) );
	    $this->view->assign('title', $title );
		$this->view->assign('config', $config);
	}
}
