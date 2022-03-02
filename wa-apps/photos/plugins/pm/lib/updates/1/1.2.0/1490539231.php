<?php

try {
    $model = new waModel();
    $model->exec(
        'DELETE FROM photos_pm_meta
        WHERE type = "album"
            AND id NOT IN(
                SELECT id
                FROM photos_album
            )'
    );
} catch (Exception $e) {
    //
}
