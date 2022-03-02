<?php

abstract class shopGfontsPluginResource
{
    protected $url;
    protected $data;

    public function __construct($url)
    {
        if (substr($url, 0, 2) === '//') {
            $url = "https:" . $url;
        }
        $this->url = $url;
    }

    public function download()
    {
        try {
            $net = new waNet();
            $net->userAgent("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.0.2 Safari/605.1.15");
            $this->data = $net->query($this->url);
            return $this;
        } catch (waException $e) {
            return false;
        }
    }

    protected function getFilepath()
    {
        return wa()->getDataPath("plugins/gfonts/" . $this->getFilename(), true, 'shop');
    }

    public function getFileurl()
    {
        return wa()->getDataUrl("plugins/gfonts/" . $this->getFilename(), true, 'shop');
    }

    public function getData()
    {
        return $this->data;
    }

    public function save($data = null)
    {
        if (!$data) {
            $data = $this->data;
        }
        waFiles::write($this->getFilepath(), $data);
        return $this;
    }

    public function resourceExists()
    {
        return file_exists($this->getFilepath());
    }
}