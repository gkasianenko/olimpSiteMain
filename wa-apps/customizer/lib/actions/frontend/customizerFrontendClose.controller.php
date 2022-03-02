<?php

class customizerFrontendCloseController extends waJsonController
{
	/**
	 * Delete draft
	 */
    public function execute()
    {
        wa()->getStorage()->close();
		wao(new customizerDraft(waRequest::request('id')))->delete();
    }
}
