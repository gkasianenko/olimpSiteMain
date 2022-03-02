<?php
/**
 * сливающее окно при добавлении нового email
 */
class email_configBackendMailAddAction extends waViewAction
{
	public function execute()
	{
		$getRouting = wa()->getRouting()->getDomains();
		foreach ($getRouting as $key) {
			if(stristr($key, '/')) {
				$array = explode("/", $key);
				$key = array_shift($array);
			}
			$routing[$key] =  email_configCheckMail::quantity($key);
		}
		
		$this->view->assign("getRouting", $routing );
	}
}
