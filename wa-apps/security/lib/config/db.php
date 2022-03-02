<?php
return array(
    'security_scans' => array(
        'id' => array('int', 11, 'null' => 0, 'autoincrement' => 1),
        'status' => array('int', 11, 'null' => 0, 'default' => '0'),
        'full_scan' => array('int', 11, 'null' => 0, 'default' => '0'),
        'count_mailware' => array('int', 11, 'null' => 0, 'default' => '0'),
        'count_files' => array('int', 11, 'null' => 0, 'default' => '0'),
        'count_scan' => array('int', 11, 'default' => '0'),
        'count_signature' => array('int', 11, 'null' => 0, 'default' => '0'),
        'count_known' => array('int', 11, 'null' => 0, 'default' => '0'),
        'result' => array('int', 11, 'null' => 0, 'default' => '0'),
        'start' => array('timestamp', 'null' => 0, 'default' => 'CURRENT_TIMESTAMP'),
        'end' => array('timestamp'),
        ':keys' => array(
            'PRIMARY' => 'id',
        ),
    ),
    'security_result' => array(
        'id' => array('int', 11, 'null' => 0, 'autoincrement' => 1),
        'id_scan' => array('int', 11, 'null' => 0),
        'signature_id' => array('int', 11, 'null' => 0, 'default' => '0'),
        'filename' => array('text', 'null' => 0),
        'result' => array('int', 11),
        'error' => array('int', 11),
        'message' => array('text'),
        'filesize' => array('int', 11),
        ':keys' => array(
            'PRIMARY' => 'id',
            'id_scan' => 'id_scan',
            'signature_id' => 'signature_id',
        ),
    ),
);
