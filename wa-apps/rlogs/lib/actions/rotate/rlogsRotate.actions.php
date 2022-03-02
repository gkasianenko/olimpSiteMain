<?php

/**
 * Class rlogsRotateActions
 */
class rlogsRotateActions extends waJsonActions
{

    /**
     * @throws waException
     */
    public function runAction(): void
    {
        (new rlogsRotate())->run();
        $this->response = [];
    }
}