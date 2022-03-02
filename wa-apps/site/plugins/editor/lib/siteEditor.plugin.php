<?php

class siteEditorPlugin extends sitePlugin {

 public function frontendPage(&$p) {
    $user = wa()->getUser()->getId();
    if ($user) {
     $contact = new waContact($user);
     $admin = $contact->isAdmin('site');
     $local = $contact->getLocale();
     if ($admin == true){
     $routing = wa()->getRouting()->getRoutes();
     $app = waRequest::param('app');
     foreach ($routing as $r) {
        if($r['app'] == 'site'){
            $main_site_domain = wa()->getConfig()->getDomain();
         $url =   waRouting::getUrlByRoute( array('url' => $r['url']));
         
         $url = $main_site_domain.'/'.$url;
          //  $url = str_replace("*","", $r['url']);
     }
    }
     $this->addCss('css/style.css');
     $this->addJs('js/editor_'.$local.'.js');

     $js ="<script>$(window).load(function() {
    
window.addEventListener('load', function() {
    var editor;

});
editor = ContentTools.EditorApp.get();
editor.init('*[data-editable]', 'data-name');
$('.ct-ignition__button--confirm').on('click', function(){
   
   editor.busy(true);
 
   block = $(";
   $js .='"[data-name=';
   $js .="'main-content-editor']";
   $js .='");';
   $js .="data = block.html();
   
   page_id = block.attr('data-page-id');
   post_id = block.attr('data-post-id');
   product_id = block.attr('data-product-id');
   product_page_id = block.attr('data-product-page-id');
   app = '";$js .=$app."';";
   $js .="$.ajax({
        type: 'POST',
        url: '//";$js .=$url;$js .="siteeditor/edit/',   
        data: { data : data,  page_id : page_id, product_id: product_id, product_page_id: product_page_id, post_id: post_id ,app : app},
        success: function(data,response){
            console.log(data,response);
             new ContentTools.FlashUI('ok');
             editor.busy(false);
        },
        error:  function(xhr, str){
	    console.log(str);
	    console.log(xhr);
	   new ContentTools.FlashUI('no');
          }
     });
});




ContentTools.IMAGE_UPLOADER = function(dialog) {
    var  imageSize, rotate, uploadingTimeout;
    rotate = function() {
                var clearBusy;
                return dialog.busy(!0), clearBusy = function(_this) {
                    return function() {
                        return dialog.busy(!1)
                    }
                }(this), setTimeout(clearBusy, 1500)
            }, 
            
    
    dialog.addEventListener('imageuploader.cancelupload', function() {
                return clearTimeout(uploadingTimeout), dialog.state('empty')
            }), 
            
    dialog.addEventListener('imageuploader.clear', function(ev) {
        
        var file = $('.ct-image-dialog__image').css('background-image');
        file = file.replace(')', '').replace('(', '').replaceAll('";$js .='"';$js .="', '');
        $.ajax({
        type: 'POST',
        url: '//";$js .=$url;$js .="siteeditor/upload/',   
        data: { image : file, temp: 'delete' },
        success: function(data,response){
            console.log(data);
            return dialog.clear();
        },
        error:  function(xhr, str){
	    console.log(str);
	    console.log(xhr);
	   new ContentTools.FlashUI('no');
          }
     });
    }), 
            
    
    
    dialog.addEventListener('imageuploader.fileready', function(ev) {
        var formData;
        var file = ev.detail().file;
        xhrProgress = function (ev) {
            dialog.progress((ev.loaded / ev.total) * 100);
        }

        xhrComplete = function (ev) {
            var response;
            if (ev.target.readyState != 4) {
                return;
            }
            xhr = null
            xhrProgress = null
            xhrComplete = null
            if (parseInt(ev.target.status) == 200) {
               response = JSON.parse(ev.target.responseText);
               var image = {
                    size: response.data.size,
                    url: response.data.url
                    };
                dialog.populate(image.url, image.size);
            } else {
                new ContentTools.FlashUI('no');
            }
        }

        dialog.state('uploading');
        dialog.progress(0);
        formData = new FormData();
        formData.append('image', file);
        formData.append('temp', 'temp');
        xhr = new XMLHttpRequest();
        xhr.upload.addEventListener('progress', xhrProgress);
        xhr.addEventListener('readystatechange', xhrComplete);
        xhr.open('POST', '//";$js .=$url;$js .="siteeditor/upload/', true);
        xhr.send(formData);
            }), 

        dialog.addEventListener('imageuploader.rotateccw', function() {
        var file = $('.ct-image-dialog__image').css('background-image');
        file = file.slice( 0, file.indexOf('?') );
        file = file.replace(')', '').replace('(', '').replaceAll('";$js .='"';$js .="', '');
      
        $.ajax({
        type: 'POST',
        url: '//";$js .=$url;$js .="siteeditor/upload/',   
        data: { image : file, temp: 'rotate', rotate: '-90' },
        success: function(data,response){
            console.log(data);
             image = {
                    size: data.data.size,
                    url: data.data.url + '?_ignore=' + Date.now()
                    };
            dialog.populate(image.url, image.size);
            return rotate();
        },
        error:  function(xhr, str){
	    console.log(str);
	    console.log(xhr);
	   new ContentTools.FlashUI('no');
          }
     });
            }), 
            
        dialog.addEventListener('imageuploader.rotatecw', function() {
        var file = $('.ct-image-dialog__image').css('background-image');
          file = file.slice( 0, file.indexOf('?') );
        file = file.replace(')', '').replace('(', '').replaceAll('";$js .='"';$js .="', '');
        $.ajax({
        type: 'POST',
        url: '//";$js .=$url;$js .="siteeditor/upload/',   
        data: { image : file, temp: 'rotate', rotate: '90' },
        success: function(data,response){
            console.log(data);
             image = {
                    size: data.data.size,
                    url: data.data.url + '?_ignore=' + Date.now()
                    };
            dialog.populate(image.url, image.size);
            return rotate();
        },
        error:  function(xhr, str){
	    console.log(str);
	    console.log(xhr);
	   new ContentTools.FlashUI('no');
          }
     });
    }), 
        dialog.addEventListener('imageuploader.save', function(ev) {
            var clearBusy;
            return dialog.busy(!0), 
                
            clearBusy = function(_this) {
            return function() {
            var file = $('.ct-image-dialog__image').css('background-image');
            file = file.slice( 0, file.indexOf('?') );
            file = file.replace(')', '').replace('(', '').replaceAll('";$js .='"';$js .="', '');
           xhrComplete = function (ev) {
            var response;
            if (ev.target.readyState != 4) {
                return;
            }
            xhr = null
            xhrProgress = null
            xhrComplete = null
            if (parseInt(ev.target.status) == 200) {
                console.log(ev.target.responseText);
                response = JSON.parse(ev.target.responseText);
                image = {
                    size: response.data.size,
                    url: response.data.url
                    };
                dialog.populate(image.url, image.size);
                 return dialog.busy(!1), 
                        dialog.save(image.url, image.size, dialog.cropRegion(),{
                            alt: ''
                        })
            } else {
                new ContentTools.FlashUI('no');
            }
        }
        formData = new FormData();
        formData.append('image_url', file);

        formData.append('crop', dialog.cropRegion());
        formData.append('temp', 'saveImg');
        xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', xhrComplete);
        xhr.open('POST', '//";$js .=$url;$js .="siteeditor/upload/', true);
        xhr.send(formData);
                    }
                }(this), setTimeout(clearBusy, 1e3)
            })
        }

});</script>";
if($app == 'site') { $p['page']['content'] .= $js; } 
if($app == 'blog') { return array('head' => $js, ); }
     return $js;
     }
    }
   }
}