<?php

class email_configCheckMail
{
    /**
     * Количество и-мейлов для домена
     * @param  $domains = домен
     * @return int [description]
     */
    public static function quantity($domains = null)
    {
        $path = wa()->getConfig()->getPath('config', 'mail');
        $config = file_exists($path) ? include($path) : array();

        if (!is_array($config) AND empty($config)) {
            return 0;
        }
        if ($domains) {
            $count = 0;
            foreach ($config as $key => $value) {
                if (stristr($key, '@')) {
                    list($user, $dom) = explode("@", $key);
                } else {

                    if ( $key == $domains ) $count++;
                    continue;
                }
                if ( $dom != $domains ) continue;
                $count++;
            }
            return $count;
        }
        return count($config);
    }
}
