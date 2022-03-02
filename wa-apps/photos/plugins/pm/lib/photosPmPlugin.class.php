<?php

class photosPmPlugin extends photosPlugin
{
    /**
     * Event handlers
     */

    public function backendAssets()
    {
        if (wa()->whichUI() == '1.3') {
            $this->addJs('js-legacy/backend.js');
        } else {
            $this->addJs('js/backend.js');
        }
    }

    public function backendSidebar()
    {
        if (wa()->whichUI() == '1.3') {
            $template_path = '/templates/includes-legacy/backend_sidebar.html';
        } else {
            $template_path = '/templates/includes/backend_sidebar.html';
        }

        return [
            'menu' => wa()->getView()->fetch($this->path . $template_path),
        ];
    }

    public function frontendLayout($params)
    {
        $type = waRequest::param('action');

        if (!strlen($type)) {
            $type = waRequest::param('type');
        }

        switch ($type) {
            case 'photo':
                $meta = photosPmPluginModels::model()->query(
                    'SELECT
                         p.id, m.title, m.keywords, m.description,
                         m.id as saved_id
                    FROM photos_photo p
                    LEFT JOIN photos_pm_meta m
                        ON p.id = m.id
                            AND m.type = "photo"
                    WHERE p.url = s:0',
                    waRequest::param('url')
                )->fetchAssoc();
                break;
            case 'album':
                $meta = photosPmPluginModels::model()->query(
                    'SELECT
                        a.id, m.title, m.keywords, m.description,
                        m.id as saved_id
                    FROM photos_album a
                    LEFT JOIN photos_pm_meta m
                        ON a.id = m.id
                            AND m.type = "album"
                    WHERE a.full_url = s:0',
                    waRequest::param('url')
                )->fetchAssoc();
                break;
            case 'tag':
                $meta = photosPmPluginModels::model()->query(
                    'SELECT
                        t.id, m.title, m.keywords, m.description,
                        m.id as saved_id
                    FROM photos_tag t
                    LEFT JOIN photos_pm_meta m
                        ON t.id = m.id
                            AND m.type = "tag"
                    WHERE t.name = s:0',
                    waRequest::param('tag')
                )->fetchAssoc();
                break;
        }

        //other frontend pages: do nothing
        if (empty($meta)) {
            return;
        }

        $meta_from_default_settings = array();

        foreach (array('title', 'keywords', 'description') as $field) {
            $value = trim(ifset($meta[$field]));

            if (!strlen($value)) {
                $value = $this->getSettings("default_{$type}_{$field}");
                if (!strlen($value)) {
                    $value = photosPmPluginHelper::getDefaultValueByParams($type, $meta['id'], $field);
                }

                $meta_from_default_settings[$field] = $value;
            }

            if (!strlen($value)) {
                continue;
            }

            $value = trim(wa()->getView()->fetch("string:{$value}"));

            if (!strlen($value)) {
                continue;
            }

            wa()->getResponse()->setMeta($field, $value);
        }

        //cache default values to meta table
        if (!$meta['saved_id']) {   //saved_id = null
            $meta_from_default_settings['id'] = $meta['id'];
            $meta_from_default_settings['type'] = $type;
            photosPmPluginModels::meta()->insert($meta_from_default_settings, 1);
        }
    }

    public function photoDelete($id)
    {
        photosPmPluginModels::meta()->deleteByField(array(
            'type' => 'photo',
            'id'   => $id,
        ));

        photosPmPluginModels::meta()->deleteMissingTags();
        photosPmPluginHelper::updateParamDefaultSettings('tags');
    }

    public function albumDelete($id)
    {
        photosPmPluginModels::meta()->deleteByField(array(
            'type' => 'album',
            'id'   => $id,
        ));

        photosPmPluginHelper::updateParamDefaultSettings('albums', $id);
    }

    /**
     * Template helpers
     */

    public static function photo($field = null)
    {
        if (waRequest::param('action') != 'photo') {
            return;
        }

        static $photo;
        if (!$photo) {
            $photo = photosPmPluginModels::photosPhoto()->getByField('url', waRequest::param('url'));
        }
        return is_null($field) ? $photo : ifset($photo[$field]);
    }

    public static function album($field = null)
    {
        if (waRequest::param('action') != 'album') {
            return;
        }

        static $album;
        if (!$album) {
            $album = photosPmPluginModels::photosAlbum()->getByField('full_url', waRequest::param('url'));
        }
        return is_null($field) ? $album : ifset($album[$field]);
    }

    public static function photoTags($delimiter = ', ')
    {
        if (waRequest::param('action') != 'photo') {
            return;
        }

        static $result;
        if (!is_null($result)) {
            return $result;
        }

        $tags = photosPmPluginModels::model()->query(
            'SELECT t.name
            FROM photos_tag t
            JOIN photos_photo_tags pt
                ON pt.tag_id = t.id
            JOIN photos_photo p
                ON p.id = pt.photo_id
            WHERE p.url = s:0
            ORDER BY t.name',
            waRequest::param('url')
        )->fetchAll(null, true);

        $result = $tags ? implode($delimiter, $tags) : '';
        return $result;
    }
}
