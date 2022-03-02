<?php

class customizerStylesPluginHelper
{
    protected $id;
    protected $app_id;

    /**
     * @var array
     */
    protected $cache = array();

    /**
     * @constructor
     */
    public function __construct($id, $app_id)
    {
        $this->id = $id;
        $this->app_id = $app_id;
    }

    public function findAllFiles($name)
    {
        if (isset($this->cache[$name])) {
            return $this->cache[$name];
        }

        list($namespace, $file) = $this->parseNamespace($name);

        $suffix = $namespace == 'app' ? array() : array('plugins', $this->id);
        $parts = explode('/', ltrim($file, '\/'));
        foreach ($parts as $part) {
            if (preg_match('/\*|{.+}/', $part)) {
                break;
            }
            $suffix[] = $part;
        }
        $suffix = implode('/', $suffix);
        $path = wa()->getAppPath($suffix, $this->app_id) . '/';
        $paths = array();
        $replace = array(
            '.' => '\.',
            '*' => '.*',
        );
        $pattern = '~' . str_replace(array_keys($replace), array_values($replace), $file) . '~';

        foreach (waFiles::listdir($path, true) as $file) {
            $file = $path . $file;
            if (preg_match($pattern, $file)) {
                $paths[] = $file;
            }
        }

        return $this->cache[$name] = $paths;
    }

    /**
     * Parses the namespace.
     *
     * @param  string $name
     * @return array
     * @throws waException
     */
    public function parseNamespace($name, $default = 'plugin')
    {
        if ($name && $name[0] == '@') {

            $parts = explode('/', substr($name, 1), 2);

            if (count($parts) != 2) {
                throw new waException("Invalid name \"{$name}\" (expecting \"@namespace/path\")");
            }

            return $parts;
        }

        return array($default, $name);
    }
}
