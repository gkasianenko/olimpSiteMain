<?php

class rlogsSettingsActions extends waViewActions
{

    protected $shadowed = true;

    /**
     * @throws waException
     * @throws waRightsException
     */
    public function preExecute()
    {
        if (!$this->getUser()->isAdmin('rlogs')) {
            throw new waRightsException(_ws('Access denied'));
        }

        $this->getConfig()->check();
        $settings = $this->getConfig()->getOption(null);
        $this->view->assign('settings', $settings);

    }

    public function defaultAction()
    {
        $cronTemplate = PHP_BINDIR . '/php %s/cli.php rlogs %s';

        $this->view->assign([
            'cliCommandRotate' => sprintf($cronTemplate, wa()->getConfig()->getRootPath(), 'rotate'),
            'cliCommandCron' => sprintf($cronTemplate, wa()->getConfig()->getRootPath(), 'cron'),
        ]);
    }

}
