<?php

class email_configSettingsSaveController extends waJsonController
{
    public function execute()
    {
        if ( !waRequest::issetPost('settings') ) return;
        
        $app_settings = new waAppSettingsModel();
        $post = waRequest::post('settings');
        
        foreach($post as $key => $val)
        {
            $app_settings->set('email_config', $key, $val);
        }    
    }
}