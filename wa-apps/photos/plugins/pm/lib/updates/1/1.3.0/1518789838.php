<?php

$model = new waModel();

try {
    $model->exec('ALTER TABLE `photos_pm_meta` CHANGE `title` `title` TEXT NULL DEFAULT NULL');
} catch (Exception $e) {
    //
}

try {
    $model->exec('ALTER TABLE `photos_pm_meta` CHANGE `keywords` `keywords` TEXT NULL DEFAULT NULL');
} catch (Exception $e) {
    //
}

try {
    $model->exec('ALTER TABLE `photos_pm_meta` CHANGE `description` `description` TEXT NULL DEFAULT NULL');
} catch (Exception $e) {
    //
}

//delete useless meta table entries corresponding to non-existent tags on photo deletion
$model->exec('
    DELETE FROM photos_pm_meta
    WHERE type = "tag"
        AND id NOT IN(
            SELECT id
            FROM photos_tag
        )
');
