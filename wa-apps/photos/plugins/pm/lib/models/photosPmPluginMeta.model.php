<?php

class photosPmPluginMetaModel extends waModel
{
    protected $table = 'photos_pm_meta';
    protected $id = array('type', 'id');

    public function deleteMissingTags()
    {
        $this->exec('
            DELETE FROM '.$this->table.'
            WHERE type = "tag"
                AND id NOT IN(
                    SELECT id
                    FROM photos_tag
                )
        ');
    }
}
