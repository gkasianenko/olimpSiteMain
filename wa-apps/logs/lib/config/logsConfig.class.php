<?php

class logsConfig extends waAppConfig
{
    public function explainLogs($logs)
    {
        foreach ($logs as $id => $log) {
            if (in_array($log['action'], ['file_delete', 'file_publish', 'file_unpublish'])
            && strlen(ifset($log['params']))) {
                $logs[$id]['params_html'] = 'wa-log/' . $log['params'];
            }
        }

        return $logs;
    }

    public function onCount()
    {
        if (wa()->whichUI() == '2.0') {
            $this->markUpdatedTrackedFiles();
            $updated_files_count = (new logsTrackedModel())->getUpdatedFilesCount();

            if ($updated_files_count) {
                return [
                    'count' => $updated_files_count,
                    'url' => logsHelper::getLogsBackendUrl() . '?action=files&mode=updatetime',
                ];
            }
        }

        if ($this->notifyOnLargeLogs()) {
            return [
                'count' => _wd('logs', '1 GB+'),
                'url' => logsHelper::getLogsBackendUrl() . '?action=files&mode=size',
            ];
        }
    }

    private function markUpdatedTrackedFiles()
    {
        $tracked_model = new logsTrackedModel();

        $not_updated_files = $tracked_model->getByField([
            'updated' => 0,
            'contact_id' => wa()->getUser()->getId(),
        ], true);

        if (!$not_updated_files) {
            return;
        }

        $updated_files_timestamps = $this->getUpdatedFilesTimestamps($not_updated_files);

        if (!$updated_files_timestamps) {
            return;
        }

        $updated_file_paths = array_keys($updated_files_timestamps);

        $tracked_model->deleteByField([
            'path' => $updated_file_paths,
            'contact_id' => wa()->getUser()->getId(),
        ]);

        $updated_tracked_file_entries = array_reduce(
            $updated_file_paths,
            function($result, $path) use ($updated_files_timestamps) {
                $result[] = [
                    'path' => $path,
                    'contact_id' => wa()->getUser()->getId(),
                    'update_datetime' => date('Y-m-d H:i:s', $updated_files_timestamps[$path]),
                    'updated' => '1',
                ];
                return $result;
            }, []
        );

        $tracked_model->multipleInsert($updated_tracked_file_entries);
    }

    private function getUpdatedFilesTimestamps($files)
    {
        $updated_files = array_reduce($files, function($result, $file) {
            $full_file_path = logsHelper::getFullPath($file['path']);

            if (!file_exists($full_file_path)) {
                return $result;
            }

            $file_update_timestamp = @filemtime($full_file_path);

            if (!$file_update_timestamp) {
                return $result;
            }

            if ($file_update_timestamp > strtotime($file['update_datetime'])) {
                $result[$file['path']] = $file_update_timestamp;
            }

            return $result;
        }, []);

        return $updated_files;
    }

    private function notifyOnLargeLogs()
    {
        $php_logging = new logsPhpLogging();

        $in_cloud = logsHelper::inCloud();
        $is_debug = waSystemConfig::isDebug();
        $php_logging_admin = $php_logging->adminConfigEnabled();
        $unlimited_logging_allowed = !$in_cloud || $php_logging_admin;

        $time_config_data = $php_logging->getConfigData(true);
        $php_logging_enabled = $php_logging->getSetting();
        $php_errors = $php_logging->getSetting('errors');

        //update PHP logging config on debug mode setting toggle
        if ($unlimited_logging_allowed && $php_logging_enabled && ($is_debug && $time_config_data || !$is_debug && !$time_config_data)) {
            $php_logging->setSetting(true, $php_errors);
        } elseif ($php_logging->isExpired()) {
            $php_logging->setSetting(false);
        }

        //notify user on large logs size
        $csm = new waContactSettingsModel();
        $large_logs_notify = $csm->getOne(wa()->getUser()->getId(), 'logs', 'large_logs_notify');
        $large_logs_notify = strlen($large_logs_notify) ? (bool) (int) $large_logs_notify : true;    //enabled by default

        if ($large_logs_notify) {
            $total_size = logsHelper::getTotalLogsSize();
            return logsHelper::isLargeSize($total_size);
        }

        return false;
    }
}

