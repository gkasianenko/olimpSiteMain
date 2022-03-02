<?php
/**
 *
 */
class customizerBackendAction extends waViewAction
{
    public function execute()
    {
        $this->setLayout(new customizerDefaultLayout());
    }

}
