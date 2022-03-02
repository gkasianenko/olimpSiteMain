<?php

/**
 * Class rlogsBackendActions
 */
class rlogsBackendActions extends waViewActions
{
    /**
     *
     */
    public function preExecute(): void
    {
        if (!waRequest::isXMLHttpRequest()) {
            $this->setLayout(new rlogsDefaultLayout());
        }
    }

    /**
     * @throws waException
     */
    public function defaultAction(): void
    {
        $message = '';
        $this->view->assign([
            'message' => $message,
            'maxCountLogs' => wa('rlogs')->getConfig()->getOption(rlogsConfig::CONF_MAX_COUNT),
        ]);
    }
}
