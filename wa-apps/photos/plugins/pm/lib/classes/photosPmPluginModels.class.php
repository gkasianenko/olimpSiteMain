<?php

class photosPmPluginModels
{
    public static function model()
    {
        static $model;
        if (!$model) {
            $model = new waModel();
        }
        return $model;
    }

    public static function meta()
    {
        static $model;
        if (!$model) {
            $model = new photosPmPluginMetaModel();
        }
        return $model;
    }

    public static function photosPhoto()
    {
        static $model;
        if (!$model) {
            $model = new photosPhotoModel();
        }
        return $model;
    }

    public static function photosAlbum()
    {
        static $model;
        if (!$model) {
            $model = new photosAlbumModel();
        }
        return $model;
    }

    public static function photosAlbumPhotos()
    {
        static $model;
        if (!$model) {
            $model = new photosAlbumPhotosModel();
        }
        return $model;
    }

    public static function photosTag()
    {
        static $model;
        if (!$model) {
            $model = new photosTagModel();
        }
        return $model;
    }

    public static function photosPhotoTags()
    {
        static $model;
        if (!$model) {
            $model = new photosPhotoTagsModel();
        }
        return $model;
    }

    public static function appSettings()
    {
        static $model;
        if (!$model) {
            $model = new waAppSettingsModel();
        }
        return $model;
    }
}
