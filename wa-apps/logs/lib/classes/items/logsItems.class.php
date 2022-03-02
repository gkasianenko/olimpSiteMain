<?php

class logsItems
{
    const MODE_DIRECTORY = 'directory';
    const MODE_FILES_BY_SIZE = 'size';
    const MODE_FILES_BY_UPDATETIME = 'updatetime';
    const MODE_ACTIONS = 'actions';

    const TYPE_CONTAINERS = 'containers';
    const TYPE_ITEMS = 'items';

    const ENTRY_DIRECTORY = 'directory';
    const ENTRY_FILE = 'file';
    const ENTRY_ACTIONS = 'actions';
    const ENTRY_ACTION = 'action';

    private $mode;

    public function __construct($mode)
    {
        $this->mode = $mode;
    }

    public function get($params = array())
    {
        $entries = array(
            self::TYPE_CONTAINERS => array(),
            self::TYPE_ITEMS => array(),
        );

        $icons = [
            '1.3' => [
                'folder' => 'folder',
                'file' => 'script',
                'actions' => 'contact',
                'user' => 'user',
            ],
            '2.0' => [
                'folder' => 'folder',
                'file' => 'file',
                'actions' => 'user-friends',
                'user' => 'user',
            ],
        ];

        if ($this->mode != self::MODE_ACTIONS) {
            $dir_path = ifset($params['path'], '');
            $root_logs_dir = logsHelper::getLogsRootPath();

            if ($this->mode == self::MODE_DIRECTORY) {
                $dir = $dir_path ? logsHelper::getFullPath($dir_path) : $root_logs_dir;
                if (strlen($dir_path)) {
                    if (!logsItemFile::check($dir)) {
                        logsHelper::redirect();
                    }
                }
            } else {
                $dir = $root_logs_dir;
            }

            $items = logsHelper::listDir($dir, $this->mode != self::MODE_DIRECTORY);

            if ($this->mode == self::MODE_DIRECTORY) {
                sort($items);
            }

            $files_paths = array();

            foreach ($items as $item) {
                $full_path = $dir.DIRECTORY_SEPARATOR.$item;
                $path = $dir_path ? $dir_path . '/' . $item : $item;

                if (is_dir($full_path)) {
                    $entries[self::TYPE_CONTAINERS][] = array(
                        'name' => $item,
                        'path' => $path,
                        'type' => self::ENTRY_DIRECTORY,
                        'url' => http_build_query(array(
                            'path' => $path,
                        )),
                        'class' => 'folder',
                        'icon_class' => logsHelper::getIconClass('folder', $icons),
                        'icon_title' => _w('Directory'),
                    );
                } else {
                    $size = filesize($full_path);
                    $updatetime = filemtime($full_path);
                    $file = array(
                        'name' => basename($item),
                        'path' => $path,
                        'type' => self::ENTRY_FILE,
                        'sort_data' => array(
                            'size' => $size,
                            'updatetime' => $updatetime,
                        ),
                        'data' => array(
                            'updatetime' => waDateTime::format('humandatetime', $updatetime),
                            'size' => logsHelper::formatSize($size),
                        ),
                        'url' => http_build_query(array(
                            'action' => 'file',
                            'path' => $path,
                        )),
                        'class' => 'file',
                        'icon_class' => logsHelper::getIconClass('file', $icons),
                        'icon_title' => _w('Log file'),
                    );

                    if ($this->mode != self::MODE_DIRECTORY) {
                        $file['file'] = basename($item);
                        $file['folder'] = strpos(logsHelper::normalizePath($item, true), DIRECTORY_SEPARATOR) === false ? '' : dirname($item) . '/';
                    }

                    $entries[self::TYPE_ITEMS][] = $file;
                    $files_paths[] = $path;
                }
            }

            if ($entries[self::TYPE_ITEMS]) {
                $published_statuses = (new logsPublishedModel())->getFilesStatuses($files_paths);
                $tracked_statuses = (new logsTrackedModel())->getFilesStatuses($files_paths);

                array_walk(
                    $entries[self::TYPE_ITEMS],
                    function(&$file) use ($published_statuses, $tracked_statuses) {
                        $file['published'] = $published_statuses[$file['path']];
                        $file['tracked'] = !empty($tracked_statuses[$file['path']]['tracked']);
                        $file['updated'] = !empty($tracked_statuses[$file['path']]['updated']);
                    }
                );
            }

            //add user actions "folder"
            if ($this->mode == self::MODE_DIRECTORY) {
                if (!strlen($dir_path)) {
                    array_unshift($entries[self::TYPE_CONTAINERS], array(
                        'name' => _w('User actions'),
                        'type' => self::ENTRY_ACTIONS,
                        'url' => http_build_query(array(
                            'action' => 'actions',
                        )),
                        'class' => 'folder',
                        'icon_class' => logsHelper::getIconClass('actions', $icons),
                        'icon_title' => _w('User action list'),
                    ));
                }
            }
        }

        //add user actions list
        if (in_array($this->mode, array(self::MODE_FILES_BY_UPDATETIME, self::MODE_ACTIONS))) {
            $log_model = new waLogModel();
            $actions = logsItemAction::getActions();

            $actions_data = $log_model->query(
                'SELECT
                    action,
                    MAX(datetime) as updatetime,
                    COUNT(*) as count
                FROM wa_log
                WHERE action IN(s:actions)
                GROUP BY action',
                array(
                    'actions' => array_keys($actions),
                )
            )->fetchAll('action', true);

            if ($actions_data) {
                if ($this->mode == self::MODE_ACTIONS) {
                    asort($actions);
                }

                foreach (array_keys($actions) as $action_id) {
                    if (!isset($actions_data[$action_id])) {
                        continue;
                    }

                    $entries[self::TYPE_ITEMS][] = array(
                        'type' => self::ENTRY_ACTION,
                        'name' => logsItemAction::getName($action_id),
                        'sort_data' => array(
                            'updatetime' => strtotime($actions_data[$action_id]['updatetime']),
                        ),
                        'data' => array(
                            'updatetime' => waDateTime::format('humandatetime', $actions_data[$action_id]['updatetime']),
                            'size' => _w('%u entry', '%u entries', $actions_data[$action_id]['count']),
                        ),
                        'url' => http_build_query(array(
                            'action' => 'action',
                            'id' => 'login_failed',
                        )),
                        'icon_class' => logsHelper::getIconClass('user', $icons) . ' file',
                        'icon_title' => _w('User action'),
                    );
                }
            }
        }

        if ($this->mode == self::MODE_FILES_BY_SIZE) {
            usort($entries[self::TYPE_ITEMS], array(__CLASS__, 'sortBySize'));
        } elseif ($this->mode == self::MODE_FILES_BY_UPDATETIME) {
            usort($entries[self::TYPE_ITEMS], array(__CLASS__, 'sortByUpdatetime'));
        }

        $result = array();
        foreach ($entries as &$entry) {
            $result = array_merge($result, $entry);
        }
        unset($entry);

        return $result;
    }

    private static function sortBySize($a, $b)
    {
        if ($a['sort_data']['size'] != $b['sort_data']['size']) {
            return $a['sort_data']['size'] < $b['sort_data']['size'] ? 1 : -1;
        } else {
            if (isset($a['path']) && isset($b['path'])) {
                return strcmp($a['path'], $b['path']);
            } else {
                return strcmp($a['name'], $b['name']);
            }
        }
    }

    private static function sortByUpdatetime($a, $b)
    {
        $ui2 = wa()->whichUI() == '2.0';

        if ($ui2) {
            $a_updated_sort = 1 - (int) ifset($a, 'updated', false);
            $b_updated_sort = 1 - (int) ifset($b, 'updated', false);
        }

        if ($ui2 && $a_updated_sort != $b_updated_sort) {
            return $a_updated_sort - $b_updated_sort;
        } else {
            if ($a['sort_data']['updatetime'] != $b['sort_data']['updatetime']) {
                return $a['sort_data']['updatetime'] < $b['sort_data']['updatetime'] ? 1 : -1;
            } else {
                if (isset($a['path']) && isset($b['path'])) {
                    return strcmp($a['path'], $b['path']);
                } else {
                    return strcmp($a['name'], $b['name']);
                }
            }
        }
    }

    public static function getItemListModes()
    {
        return array(
            self::MODE_FILES_BY_SIZE,
            self::MODE_FILES_BY_UPDATETIME,
        );
    }
}
