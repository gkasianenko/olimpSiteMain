<?php

try {
    $model = new waModel();
    $model->exec(
        'DELETE FROM photos_pm_meta
        WHERE type = "photo"
            AND id NOT IN(
                SELECT id
                FROM photos_photo
            )'
    );
} catch (Exception $e) {
    //
}
