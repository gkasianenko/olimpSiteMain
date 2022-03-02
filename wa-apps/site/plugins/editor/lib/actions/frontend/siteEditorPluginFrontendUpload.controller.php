<?php

class siteEditorPluginFrontendUploadController extends waJsonController {

    public function execute()
    {
        $response = array();
        $temp = waRequest::post('temp');
        
        if ($temp === 'delete') {
            $img_url =  waRequest::post('image');
            $ok = $this->deleteTemp($img_url);
            $response['ok'] = $ok;
            
        } 
        
        if ($temp === 'rotate') {
             $img_url =  waRequest::post('image');
             $rotate =  waRequest::post('rotate');
             $ok = $this->rotateTemp($img_url, $rotate);
             $response = $ok;
         }
        
       
        if ($temp === 'temp') {
            $file = waRequest::file('image');
            $response = $this->saveTemp($file);
        }
        
        if ($temp == 'saveImg') {
           $img_url =  waRequest::post('image_url');
           $crop = waRequest::post('crop');
           $response = $this->saveImg($img_url, $crop);
        }

        $this->response = $response;
        return $this->response;
    }


    protected function deleteTemp($img_url){
        $file_name = basename($img_url); 
        $path = wa()->getDataPath('temp', true, 'site'); 
        $del =  $path."/".$file_name;
        $ok = waFiles::delete($del);
        return $ok;
    }
    
    protected function rotateTemp($img_url, $rotate){
        $file_name = basename($img_url); 
        $path = wa()->getDataPath('temp', true, 'site'); 
        $rotate_img =  $path."/".$file_name;
        $image = waImage::factory($rotate_img);
        $image->rotate($rotate);
        $image->save(null, 100);
        $w = $image->width;
        $h = $image->height;
        $response['size'] = array($w,$h);
        $response['url'] = wa()->getDataUrl('temp/'.$file_name, true, null, !!waRequest::get('absolute'));
        return $response;
     }
     
    protected function saveTemp($f){
        
    
        $errors = array();
        $f = waRequest::file('image');
        $i =  waImage::factory($f);
        $w = $i->width;
        $h = $i->height;
        $f->transliterateFilename();
        $name = $f->name;
        $path = wa()->getDataPath('temp', true, 'site');
        if ($this->processFile($f, $path, $name, $errors)) {
            $response['url'] = wa()->getDataUrl('temp/'.$name, true, null, !!waRequest::get('absolute'));
        }
        $errors = implode(" \r\n", $errors);
        $response['size'] = array($w,$h);
        return $response;
        
    }
     protected function saveImg($img_url, $crop){
                $temp_path = wa()->getDataPath('temp', true, 'site');
                $path = wa()->getDataPath('img', true, 'site');
                $file_name = basename($img_url); 
                $image = waImage::factory($temp_path.DIRECTORY_SEPARATOR.$file_name);
                $source = $temp_path.DIRECTORY_SEPARATOR.$file_name;
            
            if (file_exists($path.DIRECTORY_SEPARATOR.$file_name)) {
            $i = strrpos($file_name, '.');
            $ext = substr($file_name, $i + 1);
            $file_name = substr($file_name, 0, $i);
            $i = 1;
            while (file_exists($path.DIRECTORY_SEPARATOR.$file_name.'-'.$i.'.'.$ext)) {
                $i++;
            }
            $file_name = $file_name.'-'.$i.'.'.$ext;
            }
                $target = $path.DIRECTORY_SEPARATOR.$file_name;
                waFiles::move($source, $target);
                
                $i =  waImage::factory($target);
                $w = $i->width;
                $h = $i->height;
                
                
                
                $crop = explode(",", $crop);
                
                if ($crop[1] === 0) {
                    $offset_x = 0;
                } else {
                $offset_x = $w * $crop[1];
                }
                if ($crop[0] === 0) {
                    $offset_y = 0;
                } else {
                 $offset_y = $h * $crop[0];
                }
                
                 if ($crop[3] === 1) {
                    $offset_x2 = 0;
                 } else {
                    $crop[3] = 1 - $crop[3];
                    $offset_x2 = $w * $crop[3];
                 }
                 if ($crop[2] === 1) {
                    $offset_y2 = 0;
                 } else {
                      $crop[2] = 1 - $crop[2];
                $offset_y2 = $h * $crop[2];
                 }
                
                $width = $w - $offset_x - $offset_x2;
                $height = $h - $offset_y -  $offset_y2;
                
                $new_crop = array($width, $height, $offset_y, $offset_x);
                
                $i->crop($width, $height, $offset_x, $offset_y);
                
                
                $i->save(null, 100);
                $w = $i->width;
                $h = $i->height;
                
                $response['size'] = array($w,$h);
                $response['crop']  = $new_crop;
                $response['url'] = wa()->getDataUrl('img/'.$file_name, true, 'site', !!waRequest::get('absolute'));
                return $response;
     }
     
     
     
     
     
 protected function processFile(waRequestFile $f, $path, &$name,  &$errors = array())
    {
        if ($f->uploaded()) {
            if (!$this->isFileValid($f, $errors)) {
                return false;
            }
            if (!$this->saveFile($f, $path, $name)) {
                $errors[] = sprintf(_w('Failed to upload file %s.'), $f->name);
                return false;
            }
            return true;
        } else {
            $errors[] = sprintf(_w('Failed to upload file %s.'), $f->name).' ('.$f->error.')';
            return false;
        }
    }

    protected function isFileValid($f, &$errors = array())
    {
        $allowed = array('jpg', 'jpeg', 'png', 'gif');
        if (!in_array(strtolower($f->extension), $allowed)) {
            $errors[] = sprintf(_ws("Files with extensions %s are allowed only."), '*.'.implode(', *.', $allowed));
            return false;
        }
        return true;
    }

    protected function saveFile(waRequestFile $f, $path, &$name)
    {
        $name = $f->name;
        if (!preg_match('//u', $name)) {
            $tmp_name = @iconv('windows-1251', 'utf-8//ignore', $name);
            if ($tmp_name) {
                $name = $tmp_name;
            }
        }
        if (file_exists($path.DIRECTORY_SEPARATOR.$name)) {
            $i = strrpos($name, '.');
            $ext = substr($name, $i + 1);
            $name = substr($name, 0, $i);
            $i = 1;
            while (file_exists($path.DIRECTORY_SEPARATOR.$name.'-'.$i.'.'.$ext)) {
                $i++;
            }
            $name = $name.'-'.$i.'.'.$ext;
        }
        return $f->moveTo($path, $name);
    }
    
}