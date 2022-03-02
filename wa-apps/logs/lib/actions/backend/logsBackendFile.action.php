<?php

class logsBackendFileAction extends logsBackendItemAction
{
    public function __construct()
    {
        $this->action = 'file';
        $this->id = 'path';
        parent::__construct();
    }

    public function execute()
    {
        parent::execute();
        $this->markTrackedFileAsNotUpdated();
    }

    private function markTrackedFileAsNotUpdated()
    {
        $tracked_model = new logsTrackedModel();

        $tracked_model->updateByField([
            'path' => $this->value,
            'contact_id' => $this->getUserId(),
        ], [
            'updated' => 0,
        ]);

        logsHelper::updateUpdatedFilesBadgeValue();
    }

    protected function check()
    {
        return logsItemFile::check($this->value);
    }

    protected function getItem($params)
    {
        $item = new logsItemFile($this->value);
        return $item->get($params);
    }
}
