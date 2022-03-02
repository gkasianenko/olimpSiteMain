<?php

class customizerStylesPlugin extends customizerPlugin
{
	/**
     * @var customizerStylesPluginHelper
     */
    private $helper;

	public function customizer ($params)
	{
        return $this->includePluginConfig('customizer.php');
	}

	public function frontendHead ()
	{
        $this->addCss('css/frontend/plugin.css');
		$this->addJs('js/frontend/plugin.min.js');
	}

	public function getHelper()
    {
        if (!$this->helper) {
            $this->helper = new customizerStylesPluginHelper($this->id, $this->app_id);
        }
        return $this->helper;
    }

    /**
     * Gets theme styles.
     *
     * @return array
     */
    public function getThemes()
    {
        if (!isset($this->themes)) {
            $this->themes = array();
            $path = wa()->getAppPath('plugins/' . $this->id . '/less', $this->app_id) . '/';
            $files = waFiles::listdir($path, true);
            foreach ($files as $file) {
                if (!preg_match('/theme\..*\.less$/', $file)) {
                    continue;
                }
                $file = $path . $file;
                $id = substr(basename($file, '.less'), 6);
                $this->themes[$id] = array_merge(
                    array(
                        'id'   => $id,
                        'file' => $file,
                        'name' => $this->namify($id),
                    ),
                    $this->getMeta($file)
                );
            }
        }
        return $this->themes;
    }

    protected function getMeta($file)
    {
        $meta = array();
        $style = false;
        $content = str_replace('\r', '\n', @file_get_contents($file) ?: '');
        /*
        $handle = fopen($file, 'r');
        $content = str_replace("\r", "\n", fread($handle, 8192));
        fclose($handle);
*/
        // parse first comment
        if (!preg_match('/^\s*\/\*(?:(?!\*\/).|\n)+\*\//', $content, $matches)) {
            return $meta;
        }

        // parse all metadata
        if (!preg_match_all('/^[ \t\/*#@]*(name|style|background|color|type|preview):(.*)$/mi', $matches[0], $matches)) {
            return $meta;
        }

        foreach ($matches[1] as $i => $key) {

            $key = strtolower(trim($key));
            $value = trim($matches[2][$i]);

            if (!in_array($key, array('name', 'style', 'preview'))) {
                $value = array_map('ucwords', array_map('trim', explode(',', $value)));
            }

            if (!$style && $key != 'style') {
                $meta[$key] = $value;
            } elseif ($key == 'style') {
                $style = $value;
                $meta['styles'][$style] = array(
                    'name' => $this->namify($style),
                );
            } else {
                $meta['styles'][$style][$key] = $value;
            }
        }

        return $meta;
    }

    protected function namify($id)
    {
        return ucwords(str_replace('-', ' ', $id));
    }
}
