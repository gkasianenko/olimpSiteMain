<?php

class customizerFrontendResetController extends waJsonController
{
    public function execute()
    {
        wa()->getStorage()->close(); // close session
		wao(new customizerDraft(waRequest::request('id')))->reset();
    }
}
