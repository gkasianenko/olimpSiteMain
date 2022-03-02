<?php

class shopGfontsPluginFont extends shopGfontsPluginResource
{
    protected function getFilename()
    {
        return str_replace('https://fonts.gstatic.com/s/', '', $this->url);
    }
}