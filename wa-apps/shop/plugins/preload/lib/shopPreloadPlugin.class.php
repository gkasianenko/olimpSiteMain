<?php

class shopPreloadPlugin extends shopPlugin
{

    public function frontendHead()
    {
        $urls = preg_split('/\r\n|\r|\n/', $this->getSettings("urls"));
        foreach ($urls as $url) {
            self::preload($url);
        }
    }

    public static function preload($url)
    {
        if ($data = self::getData($url)) {
            $link = [];
            $link[] = "<$url>";
            $link[] = 'rel=preload';
            $link[] = 'as=' . $data['as'];
            if (!empty($data['crossorigin'])) {
                $link[] = 'crossorigin';
            }
            if (!empty($data['type'])) {
                $link[] = 'type="' . $data['type'] . '"';
            }
            wa()->getResponse()->addHeader('Link', implode('; ', $link), false);
        }
    }

    private static function getData($url)
    {
        $path = parse_url($url, PHP_URL_PATH);
        if ($path == '/css') {
            $extension = 'css';
        } else {
            $extension = strtolower(pathinfo($path, PATHINFO_EXTENSION));
        }
        switch ($extension) {
            case 'css':
                return [
                    'as' => 'style',
                ];
            case 'js':
                return [
                    'as' => 'script',
                ];
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            return [
                'as' => 'image',
            ];
            case 'woff2':
            case 'woff':
            case 'ttf':
                return [
                    'as' => 'font',
                    'type' => 'font/' . $extension,
                    'crossorigin' => 'anonymous'
                ];
            case 'svg':
                return [
                'as' => 'font',
                'type' => 'image/svg+xml',
                'crossorigin' => 'anonymous'
            ];
            case 'eot':
                return [
                    'as' => 'font',
                    'type' => 'application/vnd.ms-fontobject',
                    'crossorigin' => 'anonymous'
                ];
        }
        return null;
    }
}
