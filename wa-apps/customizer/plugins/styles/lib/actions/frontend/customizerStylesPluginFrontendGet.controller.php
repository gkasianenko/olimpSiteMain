<?php

class customizerStylesPluginFrontendGetController extends waJsonController
{
    protected $id      = 'styles';
    protected $app_id  = 'customizer';
    protected $imports = array(
        //'@app/*.svg',
        'vendor/assets/themes/*/src/images/backgrounds/*.svg',
    );

    public function execute()
    {
        $resolve = function($file, $replace = []) use (&$imports, &$resolve) {
            if (!file_exists($file)) {
                return;
            }
            $imports[$this->pathToUrl($file)] = $contents = @file_get_contents($file) ?: '';
            if (preg_match_all('/^@import.*"(.*)";/m', $contents, $matches)) {
                foreach ($matches[1] as $path) {
                    $resolve(dirname($file) . '/' . str_replace(array_keys($replace), array_values($replace), $path), $replace);
                }
            }
        };

        // $compatible = false;
        $compatible = true;

        $vars    = array();
        $styles  = array();
        $imports = array();

        $plugin  = wa()->getPlugin($this->id);

        try {
            $_id    = waRequest::post('id');
            $app_id = 'site';
            $theme  = new waTheme($_id, $app_id);
            $file   = $plugin->getSettings('config');
            $path   = $theme->path . DIRECTORY_SEPARATOR . $file;
            if (file_exists($path)) {
                // $compatible = true;
                $vars = include($path);
            }
        } catch (waException $e) {}

        if (waRequest::post('style')) {
            $vars['@internal-theme'] = waRequest::post('style');
        } else if (empty($vars['@internal-theme']) || empty($plugin->getThemes()[$vars['@internal-theme']])) {
            $compatible = false;
            $vars['@internal-theme'] = 'core';
        }

        if (waRequest::post('substyle')) {
            $vars['@internal-style'] = waRequest::post('substyle');
        }

        $id = $vars['@internal-theme'];

        // add styles
        foreach ($plugin->getThemes() as $theme) {
            $file = $theme['file'];
            $styles[$theme['id']] = [
                // 'filename'  => $file,
                'filename'  => $this->pathToUrl($file),
                'contents'  => file_get_contents($file),
                'icons'     => file_get_contents(wa()->getAppPath('plugins/' . $this->id . '/vendor/assets/themes/' . $theme['id'] . '/src/images/icons', $this->app_id) . '/theme.icons.js'),
                'iconsMin'  => file_get_contents(wa()->getAppPath('plugins/' . $this->id . '/vendor/assets/themes/' . $theme['id'] . '/src/images/icons', $this->app_id) . '/theme.icons.min.js'),
            ];

            // add theme imports
            if ($theme['id'] == preg_replace('/(.+?)(?:\:.+)?$/', '$1', $id)) {
                $resolve($file, ['@{internal-theme}' => $theme['id']]);
                if (isset($theme['styles'])) {
                    foreach (array_keys($theme['styles']) as $style) {
                        $resolve($file, ['@{internal-theme}' => $theme['id'], '@{internal-style}' => $style]);
                    }
                }
            }
        }

        // add imports
        foreach ($this->imports as $path) {
            foreach ($plugin->getHelper()->findAllFiles($path) as $file) {
                $resolve($file);
            }
        }

		$this->response = array(
            'compatible' => $compatible,
            'vars'       => $vars,
            'styles'     => $styles,
			'imports'    => $imports,
		);
    }

    public function pathToUrl($path)
    {
        return $this->normalizePath(substr($path, strlen(wa()->getConfig()->getRootPath())));
    }

    /**
     * Normalizes a file path.
     *
     * @param  string $path
     * @return string
     */
    private function normalizePath($path)
    {
        $parts = array();

        foreach (explode('/', strtr($path, '\\', '/')) as $part) {
            if ($part == '.') {
                continue;
            } else if ($part == '..') {
                array_pop($parts);
            } else {
                $parts[] = $part;
            }
        }

        return join('/', $parts);
    }
}
