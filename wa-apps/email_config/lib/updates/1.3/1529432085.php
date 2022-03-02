<?php

    $path = wa('email_config')->getAppPath().'/lib/';
    $files = array(
        'settings/email_configSettingsDelete.controller.php',
        'settings/email_configSettingsSave.Controller.php',
        'actions/backend/eemail_configBackendMailSend.Controller.php',
        'actions/backend/email_configBackendSendEmail.action.php'
    );

    foreach ($files as $f) {
        $file = $path . $f;
        if (file_exists($file)) {
            waFiles::delete($file, true);
        }
    }
