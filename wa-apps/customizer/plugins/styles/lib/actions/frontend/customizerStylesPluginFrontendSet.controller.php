<?php

class customizerStylesPluginFrontendSetController extends waJsonController
{
    protected $id      = 'styles';
    protected $app_id  = 'customizer';

    public function execute()
    {
        $errors = array();
        $id     = waRequest::post('id');

        if (!$id) {
            $errors[] = _wp('No draft ID');
        } else {
            try {
                $app_id	  = 'site'; //
                $theme    = new waTheme($id, $app_id);
                $plugin   = wa()->getPlugin($this->id);

                // write config
                $file = $plugin->getSettings('config');
                $path = $theme->path . DIRECTORY_SEPARATOR . $file;
                $data = waRequest::post('config', array());
                waUtils::varExportToFile($data, $path);

                // write css
                $file    = $plugin->getSettings('css');
                $content = waRequest::post('css', '');
                $error   = $this->templateAdd($file, $theme, false, $content);
                if ( $error ) {
                    $errors[] = $error;
                }

                // write min
                $file    = $plugin->getSettings('min');
                $content = waRequest::post('min', '');
                $error   = $this->templateAdd($file, $theme, false, $content);
                if ( $error ) {
                    $errors[] = $error;
                }

                if ( $plugin->getSettings('replaceIcons') ) {

                    // write icons
                    $file    = $plugin->getSettings('icons');
                    $content = waRequest::post('icons', '');
                    $error   = $this->templateAdd($file, $theme, false, $content);
                    if ( $error ) {
                        $errors[] = $error;
                    }

                    // write icons min
                    $file    = $plugin->getSettings('iconsMin');
                    $content = waRequest::post('iconsMin', '');
                    $error   = $this->templateAdd($file, $theme, false, $content);
                    if ( $error ) {
                        $errors[] = $error;
                    }

                }
            } catch (waException $e) {
                $errors[] = $e->getMessage();
            }
        }

		$this->response = array(
            'errors' => $errors,
		);
    }

     /**
      * Create File theme template.
      *
      * @param string $file
      * @param object waTheme $theme
 	  * @param boolean $flush
 	  * @param string $content
 	  * @param array $options
      * @return string
      */
 	private function templateAdd($file, $theme, $flush = false, $content, $options = array())
 	{
 		if ( $theme['type'] == waTheme::ORIGINAL ) {
 			return _wp('Theme is not a draft'); //$theme->copy();
 		}

 		$f = $theme->getFile($file);
 		if ( empty($f) ) {
 			$theme->addFile($file, null, $options); // add file
 			// $theme->save();
 		} else {
            $theme->changeFile($file, ''); // change file
        }

        // $theme->__set('Edition', true);
        $theme->offsetSet('Edition', true); // increment build number, preventing style caching

        $theme->save(); // save

 		$path = $theme->path . DIRECTORY_SEPARATOR . $file;

 		if ( $content ) {
 			if ( waFiles::write($path, $content) ) {
 				if ( $flush ) {
 					$theme->flush();
 				}
 				return; //_wp('Template has been added!');
 			}
 		} else {
            waFiles::delete( $path );
        }

 		return empty($content) ? _wp( 'Content not found!' ) : _wp('Insufficient access permissions to save the file ' . $path);
 	}
}
