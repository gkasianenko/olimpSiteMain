<?php

/**
 * Class rlogsConfig
 */
class rlogsConfig extends waAppConfig
{
    public const CONF_MAX_COUNT = 'max_count';

    /**
     * @param string $configFile
     * @return string
     * @throws waException
     */
    private function getConfigFilePath($configFile = 'config.php')
    {
        return $this->getConfig()->getConfigPath($configFile);
    }

    /**
     * @return waAppConfig
     * @throws waException
     */
    private function getConfig()
    {
        return waSystem::getInstance('rlogs')->getConfig();
    }

    /**
     * @param $settings
     * @throws waException
     */
    public function save($settings)
    {
        waUtils::varExportToFile($settings, $this->getConfigFilePath());
    }

    /**
     * @throws waException
     */
    public function check()
    {
        $config = $this->getConfig()->getOption();
        $updated = false;

        if (!array_key_exists(self::CONF_MAX_COUNT, $config) || null === $config[self::CONF_MAX_COUNT]) {
            $config[self::CONF_MAX_COUNT] = 5;
            $this->options[self::CONF_MAX_COUNT] = $config[self::CONF_MAX_COUNT];
            $updated = true;
        }

        if ($updated) {
            $this->save($config);
            $cfg = $this->getConfig();
            $this->getConfig()->clearCache();
        }
    }
}