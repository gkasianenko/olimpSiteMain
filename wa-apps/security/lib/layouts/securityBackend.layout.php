<?php
/**
 * Created by Echo-company
 * Email: info@echo-company.ru
 * Site: http://www.echo-company.ru
 */
class securityBackendLayout extends waLayout
{
    public function execute()
    {
        $this->getResponse()->addCss('css/styles.css','security');
    }
}