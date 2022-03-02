<?php
/**
 * load the whole application
 */
class email_configBackendAction extends waViewAction
{
	public function execute()
	{
		email_configStatus::remove();

		$getRouting = wa()->getRouting()->getDomains();
		foreach ($getRouting as $key) {
			if(stristr($key, '/')) {
				$array = explode("/", $key);
				$key = array_shift($array);
			}
			$routing[$key] =  email_configCheckMail::quantity($key);
		}
		$lastCheckCli = (int) wa()->getSetting('lastCheckCli');

		$this->view->assign('count', email_configCheckMail::quantity() );
		$this->view->assign('getRouting', $routing );
		$this->view->assign('last_cron',  $lastCheckCli );
		$this->view->assign('cron_ok', $lastCheckCli + 3600*36 > time() );
		$this->view->assign('cron_command',  'php '.wa()->getConfig()->getRootPath().'/cli.php email_config Check' );
	}
}
