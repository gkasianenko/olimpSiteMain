<?php

/**
 * Class rlogsRotateCli
 */
class rlogsRotateCli extends waCliController
{
    /**
     *
     */
    public function execute()
    {
        echo 'Start rotate' . PHP_EOL;
        (new rlogsRotate())->run();
    }
}