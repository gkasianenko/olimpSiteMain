<?php

class siteEditorPluginFrontendEditController extends waJsonController {

    public function execute()
    {
       $app = waRequest::post('app');
       $data = waRequest::post('data');
       $page_id = waRequest::post('page_id');
       $post_id = waRequest::post('post_id');
       $product_id = waRequest::post('product_id');
       $product_page_id = waRequest::post('product_page_id');
       
     switch ($app) {
      case "site":
        $result = self::site($page_id,$data);
      break;
      case "blog":
        $result = self::blog($page_id,$post_id,$data); 
      break;
      case "shop": 
          $result =  self::shop($product_id,$page_id,$product_page_id,$data); 
      break;
     }
    $this->response = array($result);
    return $this->response;
     
    }

   function site($page_id,$data) {
            $model = new sitePageModel();
            $model->updateById($page_id, array('content' => $data));
   }
   
   function blog($page_id,$post_id,$data) {
      wa('blog');
     if($post_id) { $model = new blogPostModel(); $res = $model->updateById($post_id, array('text' => $data)); }
     if($page_id) { $model = new blogPageModel(); $res =$model->updateById($page_id, array('content' => $data)); }
   }
    
   function shop($product_id,$page_id,$product_page_id,$data) { 
        wa('shop');
        if($product_id) { $model = new shopProductModel(); $model->updateById($product_id, array('description' => $data)); }
        if($page_id) { $model = new shopPageModel(); $model->updateById($page_id, array('content' => $data)); }
        if($product_page_id) { $model = new shopProductPagesModel(); $model->updateById($product_page_id, array('content' => $data)); }
   }
}