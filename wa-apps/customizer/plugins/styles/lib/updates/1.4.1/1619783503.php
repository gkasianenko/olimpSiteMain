<?php

$app_id = 'customizer';
$id     = 'styles';

$path   = wa()->getAppPath('plugins/'. $id . '/vendor/assets/themes/sandc/src/less/theme/styles/', $app_id);

$files  = array(
    'dark-brown.less',
    'dark-yellow.less',
    'white-bordeaux.less',
    'white-gray.less',
    'white-red.less',
    'white-yellow.less',
);

foreach ($files as $file) {
    waFiles::delete($path . $file);
}
