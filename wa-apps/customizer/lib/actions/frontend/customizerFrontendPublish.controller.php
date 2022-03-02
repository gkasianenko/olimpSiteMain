<?php

class customizerFrontendPublishController extends waJsonController
{
	/**
	 * Publish draft
	 */
    public function execute()
    {
		wao(new customizerDraft(waRequest::request('id')))->publish();
    }
}
