<?php

class customizerHelpersAction extends waViewAction
{
    public function execute()
    {
		$this->setLayout(new customizerDefaultLayout());
        $this->getResponse()->setTitle(_w('Customizer helpers page'));
    }
}
