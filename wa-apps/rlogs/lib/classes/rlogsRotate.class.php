<?php

/**
 * Class rlogsRotate
 */
class rlogsRotate
{
    private $logDir = null;

    /**
     * rlogsRotate constructor.
     * @throws waException
     */
    public function __construct()
    {
        $this->logDir = wa()->getConfig()->getPath('log');
    }

    /**
     * @throws waException
     */
    public function run(): void
    {
        $files = $this->findFiles();
        foreach ($files as $file) {
            $this->rotateFile($file);
        }
    }

    /**
     * @return int
     * @throws waException
     */
    private function countRotate(): int
    {
        return wa('rlogs')->getConfig()->getOption(rlogsConfig::CONF_MAX_COUNT);
    }

    /**
     * @param string $file
     * @throws waException
     */
    private function rotateFile(string $file)
    {
        $params = [
            'file' => $file,
        ];
        $app = wa('rlogs');

        /*
         * Вызываем событие ротации, которое обрабатывается плагинами,
         * плаин возвращает:
         *  true - разрешенра ротация
         *  false - запрещена ротация
         */
        $res = $app->event('rotate_file', $params);

        $isRotate = true;

        if (is_array($res) && !empty($res)) {
            $isRotate = false;

            foreach ($res as $item) {
                if (is_bool($item) && $item) {
                    $isRotate = true;
                    break;
                }
            }
        }
        self::isCli() and print $file . ': ' . ($isRotate ? 'rotated' : 'skip') . PHP_EOL;
        if ($isRotate) {
            $this->rotateFileProcess($file);
        }
    }


    /**
     * @param string $file
     * @throws waException
     */
    private function rotateFileProcess(string $file): void
    {
        $basename = basename($file);
        $ext = waFiles::extension($basename);
        $name = substr($basename, 0, strlen($basename) - strlen($ext) - 1);
        $dirname = dirname($file);
        '.' === $dirname AND $dirname = '';

        $dir = $this->logDir . DIRECTORY_SEPARATOR . $dirname;
        $result = waFiles::listdir($dir, false);


        $found = [];
        foreach ($result as $item) {
            if (preg_match('~' . $name . '\.(?P<index>\d+)\.' . $ext . '$~', $item, $matches)) {
                $found[$matches['index']] = $dir . DIRECTORY_SEPARATOR . $item;
            }
        }

        if (count($found)) {
            krsort($found);
            $this->removeOldFiles($found);
        }

        if (count($found)) {
            $this->shiftFiles($found, [
                'dir' => $dir,
                'name' => $name,
                'ext' => $ext,
            ]);
        }

        $srcFile = $this->logDir . DIRECTORY_SEPARATOR . $file;
        $dstFile = $dir . DIRECTORY_SEPARATOR . $name . '.0.' . $ext;

//        echo ":: $srcFile\n\t=> $dstFile\n";
        $result = waFiles::move($srcFile, $dstFile);

    }

    /**
     * @param array $found
     * @throws waException
     */
    private function removeOldFiles(array &$found): void
    {
        foreach (array_keys($found) as $idx) {
            if ($idx >= $this->countRotate()) {
                waFiles::delete($found[$idx]);
                unset($found[$idx]);
            }
        }
    }

    /**
     * @param array $found
     * @param array $params
     */
    private function shiftFiles(array $found, array $params): void
    {
        foreach ($found as $idx => $item) {
            $srcFile = $item;
            $dstFile = $params['dir'] . DIRECTORY_SEPARATOR . $params['name'] . '.' . ($idx + 1) . '.' . $params['ext'];
            waFiles::move( $srcFile, $dstFile);
        }
    }


    /**
     * @return array
     */
    private function findFiles(): array
    {
        $recursive = true;

        $result = waFiles::listdir($this->logDir, $recursive);
        return array_filter($result, [__CLASS__, 'filterFiles']);
    }

    /**
     * @param string $path
     * @return bool
     */
    private static function filterFiles(string $path): bool
    {
        $basename = basename($path);
        if ($basename === '.htaccess') {
            return false;
        }

        if (preg_match('~^.+\.\d+\.[\w\d]+$~', $basename)) {
            return false;
        }

        return true;
    }

    /**
     * @return bool
     * @throws waException
     */
    private static function isCli(): bool
    {
        return wa()->getEnv() === 'cli';
    }
}