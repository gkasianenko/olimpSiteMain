<?php

/**
 * Class photosViewHelper
 */
class photosViewHelper extends waAppViewHelper
{
    /**
     *
     * Get data array from photos collection
     * @param string $hash selector hash
     * @param int|string|null $size numerical size or size name
     * @param int $offset optional parameter
     * @param int $limit optional parameter
     *
     * If $limit is omitted but $offset is not than $offset is interpreted as 'limit' and method returns first 'limit' items
     * If $limit and $offset are omitted that method returns first 500 items
     *
     * @return array
     * @throws waException
     */
    public function photos($hash = '', $size = null, $offset = null, $limit = null)
    {
        $size = !is_null($size) ? $size : photosPhoto::getThumbPhotoSize();
        $sizes = array();
        foreach (explode(',', $size) as $s) {
            $sizes[] = 'thumb_'.trim($s);
        }
        $sizes = implode(',', $sizes);
        $collection = new photosCollection($hash);
        if (!$limit && $offset) {
            $limit = $offset;
            $offset = 0;
        }
        if (!$offset && !$limit) {
            $offset = 0;
            $limit = 500;
        }
        $photos = $collection->getPhotos("*,frontend_link,tags,".$sizes, $offset, $limit, true);
        $photos = photosCollection::extendPhotos($photos);

        /**
         * Output photos in the smarty template. After the collection is initialized.
         *
         * @param array $photos
         *
         * @event view_photos
         */
        $is_from_template = waConfig::get('is_template');
        waConfig::set('is_template', null);
        wa('photos')->event('view_photos', $photos);
        waConfig::set('is_template', $is_from_template);

        return $photos;
    }

    /**
     *
     * Get photo data by id
     * @param int $id
     * @param int|string $size numerical size or size name
     * @return array
     */
    public function photo($id, $size = null)
    {
        $id = max(1, intval($id));
        $photos = $this->photos("id/{$id}", $size);
        return array_shift($photos);
    }

    /**
     * @param $name
     * @return array|mixed|null
     * @throws waException
     */
    public function option($name)
    {
        return wa('photos')->getConfig()->getOption($name);
    }

    /**
     *
     * Get photos albums tree
     * @param bool $return_html
     * @param bool $custom_params get with custom params or not
     * @return array|string
     * @throws waException
     */
    public function albums($return_html = true, $custom_params = true)
    {
        $album_model = new photosAlbumModel();
        $albums = $album_model->getAlbums(true);
        foreach ($albums as &$a) {
            $a['name'] = htmlspecialchars($a['name']);
        }
        unset($a);

        if ($custom_params) {
            $album_params_model = new photosAlbumParamsModel();
            $params = $album_params_model->get(array_keys($albums));
            foreach ($albums as $a_id => &$a) {
                foreach (ifset($params[$a_id], array()) as $k => $v) {
                    if (!isset($a[$k])) {
                        $a[$k] = $v;
                    }
                }
            }
            unset($a);
        }

        if ($return_html) {
            $tree = new photosViewTree($albums);
            return $tree->display('frontend');
        } else {
            foreach ($albums as $album_id => $album) {
                $albums[$album_id]['url'] = photosFrontendAlbum::getLink($album);
                if ($album['parent_id'] && isset($albums[$album['parent_id']])) {
                    $albums[$album['parent_id']]['childs'][] = &$albums[$album_id];
                }
            }

            /**
             * Output albums in the smarty template.
             *
             * @param array $albums
             *
             * @event view_albums
             */
            $is_from_template = waConfig::get('is_template');
            waConfig::set('is_template', null);
            wa('photos')->event('view_albums', $albums);
            waConfig::set('is_template', $is_from_template);

            foreach ($albums as $album_id => $album) {
                if ($album['parent_id']) {
                    unset($albums[$album_id]);
                }
            }
            return $albums;
        }
    }

    /**
     *
     * Get photos tags list
     * @return array
     */
    public function tags()
    {
        $photo_tag_model = new photosTagModel();
        $cloud = $photo_tag_model->getCloud();
        foreach ($cloud as &$tag) {
            $tag['name'] = photosPhoto::escape($tag['name']);
        }
        unset($tag);

        /**
         * Output tags in the smarty template.
         *
         * @param array $cloud
         *
         * @event view_tags
         */
        $is_from_template = waConfig::get('is_template');
        waConfig::set('is_template', null);
        wa('photos')->event('view_tags', $cloud);
        waConfig::set('is_template', $is_from_template);

        return $cloud;
    }

    /**
     * Get image with special predefined attributes needed for RIA UI in frontend
     *
     * @param array $photo
     * @param string $size
     * @param array $attributes user-attribure, e.g. class or style
     * @return string
     */
    public function getImgHtml($photo, $size, $attributes = array(), $style = true)
    {
        $attributes['data-size'] = $size;
        $attributes['data-photo-id'] = $photo['id'];
        $attributes['class'] = !empty($attributes['class']) ? $attributes['class'] : '';
        $attributes['class'] .= ' photo_img';    // !Important: obligatory class. Need in frontend JS
        return photosPhoto::getEmbedImgHtml($photo, $size, $attributes, $style, false, $this->cdn);
    }

    /**
     * @param $rating
     * @param int $size
     * @param false $show_when_zero
     * @return string
     */
    public function ratingHtml($rating, $size = 10, $show_when_zero = false)
    {
        return photosPhoto::getRatingHtml($rating, $size, $show_when_zero);
    }

    /**
     * @param int $parent_album_id
     * @return array
     * @throws waException
     */
    public function childAlbums($parent_album_id=0)
    {
        $album_model = new photosAlbumModel();
        $child_albums = $album_model->getChildren($parent_album_id);

        foreach ($child_albums as $i => &$ca) {
            if (!$ca['status']) {
                unset($child_albums[$i]);
                continue;
            }
            $ca['full_url'] = photosFrontendAlbum::getLink($ca);
        }
        unset($ca);

        $album_model->keyPhotos($child_albums);

        foreach ($child_albums as &$ca) {
            $ca = photosFrontendAlbum::escapeFields($ca);
        }
        unset($ca);

        /**
         * Output childAlbums in the smarty template.
         *
         * @param array $child_albums
         *
         * @event view_child_albums
         */
        $is_from_template = waConfig::get('is_template');
        waConfig::set('is_template', null);
        wa('photos')->event('view_child_albums', $child_albums);
        waConfig::set('is_template', $is_from_template);

        return $child_albums;
    }

    /**
     * @return string
     */
    public function getCDN()
    {
        return $this->cdn;
    }
}

