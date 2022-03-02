<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */
class securityBackendController extends waViewController
{
    public function execute()
    {
        $this->setLayout(new securityBackendLayout());
        $this->executeAction(new securityBackendAction());
    }
}