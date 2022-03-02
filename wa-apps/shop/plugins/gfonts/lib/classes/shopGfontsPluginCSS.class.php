<?php

class shopGfontsPluginCSS extends shopGfontsPluginResource
{
    protected function getFilename()
    {
        $filename = str_replace('https://fonts.googleapis.com/', '', $this->url);
        return preg_replace('/[^a-z0-9]+/', '-', strtolower($filename)) . '.css';
    }
}