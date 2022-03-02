<?php

class blogFieldsPlugin extends blogPlugin
{

    public function backendPostEdit($post)
    {
        $view = wa()->getView();

        if(!empty($post['id'])) {
            $model = new blogFieldsPluginPostParamsModel();
            $plugin_fields = $model->getById($post['id']);
        } else {
            $plugin_fields = array();
        }

        $view->assign('plugin_fields', $plugin_fields);
        return array(
            'sidebar' => $view->fetch($this->path.'/templates/hooks/backend_post_edit.sidebar.html')
        );
    }

    public function postSave($blog_post)
    {
        if(!empty($blog_post['id'])) {
            $request = waRequest::post('plugin_fields', array(), waRequest::TYPE_ARRAY);
            $model = new blogFieldsPluginPostParamsModel();


            if(empty($request['og:title'])) {
                $request['og:title'] = $blog_post['meta_title'] ? $blog_post['meta_title'] : $blog_post['title'];
            }
            if(empty($request['og:description'])) {
                $request['og:description'] = $blog_post['meta_description'];
            }
            if(empty($request['og:image'])) {
                $request['og:image'] = $this->parseImg($blog_post['text']);
            }
            $model->save($blog_post['id'], $request);
        }
    }

    public function frontendPost($post)
    {
        $model = new blogFieldsPluginPostParamsModel();
        if(!empty($post['id']) && ($p = $model->getById($post['id']))) {
            $response = wa()->getResponse();


            $c = wa()->getConfig();
            $auth = wa()->getAuthConfig();

            if(!empty($auth['adapters']) && !empty($auth['adapters']['facebook']['app_id'])) {
                $fbapp_id = $auth['adapters']['facebook']['app_id'];
            } else {
                $fbapp_id = null;
            }

            if(method_exists($response, 'setOGMeta')) {
                $response->setOGMeta('og:url', $c->getRootUrl(true) . $c->getRequestUrl(true, true));
                if($fbapp_id) $response->setOGMeta('fb:app_id', $fbapp_id);

                foreach ($p as $param => $value) {
                    $response->setOGMeta($param, $value);
                }
            }
        }
    }

    private function parseImg($text)
    {
        if(preg_match('/< *img[^>]*src *= *["\']([^"\']+)/i', $text, $matches)) {
            return $matches[1];
        }

        return '';
    }
}