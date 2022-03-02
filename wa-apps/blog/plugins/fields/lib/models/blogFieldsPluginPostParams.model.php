<?php
class blogFieldsPluginPostParamsModel extends waModel
{
    protected $table = 'blog_fields_plugin_post_params';

    public function getById($id)
    {
        $sql = "SELECT name, value FROM ".$this->table." WHERE post_id = i:id";
        return $this->query($sql, array('id' => $id))->fetchAll('name', true);
    }

    public function save($id, $params)
    {
        $old_params = $this->getById($id);

        if ($params || $old_params) {
            $add = array();
            $update = array();
            foreach ($params as $param => $value) {
                if (isset($old_params[$param])) {
                    if ($value != $old_params[$param]) {
                        $update[$param] = $value;
                    }
                    unset($old_params[$param]);
                } else {
                    $add[$param] = $value;
                }
            }
            $delete = $old_params;
            if ($delete) {
                $this->deleteByField(array('post_id' => $id, 'name' => array_keys($delete)));
            }
            if ($add) {
                foreach ($add as $name => $value) {
                    $this->insert(array('post_id' => $id, 'name' => $name, 'value' => $value));
                }
            }
            if ($update) {
                foreach ($update as $name => $value) {
                    $this->updateByField(array('post_id' => $id, 'name' => $name), array('value' => $value));
                }
            }
        }
    }
}
