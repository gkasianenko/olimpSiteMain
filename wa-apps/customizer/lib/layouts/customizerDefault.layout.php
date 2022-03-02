<?php

class customizerDefaultLayout extends waLayout
{
    public function execute()
    {
		$this->executeAction('sidebar', new customizerBackendSidebarAction());
    }
}

//EOF