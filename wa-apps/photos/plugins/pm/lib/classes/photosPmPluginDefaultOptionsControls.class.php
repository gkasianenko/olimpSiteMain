<?php

class photosPmPluginDefaultOptionsControls
{
    protected $type;
    protected $id;

    public function __construct($params)
    {
        $this->type = $params['type'];
        $this->id = $params['id'];
    }

    public function get($item, $field)
    {
        $options = $this->{$this->type.ucfirst($item)}();
        if ($options) {
            return waHtmlControl::getControl(waHtmlControl::GROUPBOX, $item, array(
                'namespace' => "default_values[{$field}]",
                'title_wrapper' => '%s',
                'options' => $options,
                'value' => array(),
                'class' => 'pm-default-param-value',
                'options_wrapper' => array(
                    'control_wrapper' => '%2$s %1$s',
                ),
            ));
        }
    }

    protected function photoAlbums()
    {
        return photosPmPluginModels::model()->query(
            'SELECT
                a.id, a.name
            FROM photos_album a
            JOIN photos_album_photos ap
                ON ap.album_id = a.id
            WHERE ap.photo_id = ?
            ORDER BY a.name',
            $this->id
        )->fetchAll('id', true);
    }

    protected function photoTags()
    {
        return photosPmPluginModels::model()->query(
            'SELECT
                t.id, t.name
            FROM photos_tag t
            JOIN photos_photo_tags pt
                ON pt.tag_id = t.id
            WHERE pt.photo_id = ?
            ORDER BY t.name',
            $this->id
        )->fetchAll('id', true);
    }
}
