<?php

class customizerFrontendSaveController extends waJsonController
{
    public function execute()
    {
		$id = waRequest::request('newid');
		if (!preg_match('/^[a-z0-9_\-]+$/i', $id)) {
			$this->errors[] = sprintf(_w("Invalid theme id %s"), $id);
		} else {
			wao(new customizerDraft(waRequest::request('id')))->save($id, waRequest::request('name'));
		}
    }
}
