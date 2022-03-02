<?php

class email_configConfig extends waAppConfig
{

    public function onCount()
    { 
        return email_configStatus::getStatusCountNotTrue();
    }
    public function explainLogs($logs)
    {
        $logs = parent::explainLogs($logs);
        
        foreach ($logs as $id => $log) {
            if ($log['params']) {
                $logs[$id]['params_html'] = $log['params'];
            }
        }
        
        return $logs;
    }
}