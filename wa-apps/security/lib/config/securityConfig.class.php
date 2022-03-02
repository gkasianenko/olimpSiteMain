<?php
class securityConfig extends waAppConfig
{

    public function onCount()
    {
        $result = 0;

        $find = securityScansModel::find();

        if (empty($find)){
            $model = new securityScansModel();
            $find = $model->order('id desc')->fetch();

            if (!empty($find)){
                $result = $find['count_mailware'];
            }
        }

        return empty($result) ? '' : $result;
    }
}