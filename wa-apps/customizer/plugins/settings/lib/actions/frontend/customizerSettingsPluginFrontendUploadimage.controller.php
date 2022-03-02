<?php

class customizerSettingsPluginFrontendUploadimageController extends waJsonController
{
    public function execute ()
    {
		$name = waRequest::post('name');
		$file = waRequest::file('file');
		$path = waRequest::post('path');

		if ($file->uploaded()) {
            $path = $path . DIRECTORY_SEPARATOR . $name;
            if (!$file->moveTo($path)) {
                $this->errors[] = sprintf(_w('Failed to upload file %s.'), $file->name);
            } else {
                $this->response['path'] = $path;
                $this->response['value'] = $name . '?v=' . time();
            }
        } else {
            if ($file->name) {
                $this->errors[] = sprintf(_w('Failed to upload file %s.'), $file->name) . ' (' . $file->error . ')';
            } else {
                $this->errors[] = _wp('Failed to upload file.');
            }
        }
    }
}
