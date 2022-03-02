<?php

$locale = !empty($params['locale']) ? $params['locale'] : wa()->getLocale();

return array(
    'sections' => array(
        'settings' => array(
            'title'     => _wp('Settings'),
            'autoApply' => $this->getSettings('autoApply'),
            'messages'  => customizerHelper::getLocaleMessages(array($this->app_id, $this->id), $locale),
        ),
    ),
);
