<?php

class logsDialogTrackedFileUpdateStatusController extends waJsonController
{
    public function execute()
    {
        try {
            $path = waRequest::post('path', '', waRequest::TYPE_STRING_TRIM);

            if (!strlen($path)) {
                throw new logsInvalidDataException();
            }

            if (!logsItemFile::check($path)) {
                throw new logsInvalidDataException();
            }

            $status = waRequest::post('status', null, waRequest::TYPE_INT);

            if (is_null($status)) {
                throw new logsInvalidDataException();
            }

            $full_path = logsHelper::getFullPath($path);

            if (!is_readable($full_path)) {
                throw new Exception(_w('This file is not available any more. Reload this page.'));
            }

            $file_update_datetime = @filemtime($full_path);

            if (!$file_update_datetime) {
                throw new Exception(_w('This file cannot be tracked because its modification time cannot be read. Check the file’s permissions on the server.'));
            }

            $tracked_model = new logsTrackedModel();

            $data = array(
                'path' => $path,
                'contact_id' => $this->getUserId(),
                'update_datetime' => date('Y-m-d H:i:s', $file_update_datetime),
            );

            if ($status) {
                $tracked_model->insert($data, 1);
            } else {
                $tracked_model->deleteByField([
                    'path' => $path,
                    'contact_id' => wa()->getUser()->getId(),
                ]);
            }
        } catch (Exception $e) {
            $this->errors[] = $e->getMessage();
        }
    }
}
