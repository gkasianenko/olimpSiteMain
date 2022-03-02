<?php

/**
 * remove this controller in the next update
 */
class customizerFrontendChangeController extends waJsonController
{
    public function execute()
    {
		$request = waRequest::request();
		$response = array();

		$params = $request;
		wa()->event('customizer.change', $params);

		$this->response = $response;
    }
}
