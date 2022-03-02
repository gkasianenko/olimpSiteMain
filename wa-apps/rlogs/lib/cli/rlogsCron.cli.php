<?php


class rlogsCronCli extends waCliController
{
    /**
     *
     */
    public function execute()
    {
//        echo 'Start cron' . PHP_EOL;
        (new rlogsRotate())->run();
    }
}