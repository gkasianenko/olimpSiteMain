<?php

class blogBlogmetaPlugin extends blogPlugin
{

    public $shop_name = '';
    public $shop_email = '';
    public $shop_phone = '';

    public function backendBlogEdit($blog)
    {
        $view = waSystem::getInstance()->getView();
        //$settings = $this->getSettings();
        $model = new blogBlogmetaPluginModel();
        $blogmeta = $model->getByField('blog_id', $blog['id'], true);

        $blogmetaArr = array();
        foreach ($blogmeta as $meta) {
            $blogmetaArr[$meta['type']] = $meta;
        }

        $view->assign('id', $blog['id']);
        //$view->assign('settings', $settings);
        $view->assign('blogmeta', $blogmetaArr);

        return array(
            'settings' => $view->fetch($this->path . '/templates/backendBlogEdit.html')
        );
    }

    public function bm_ucfirst($str) {
        $fc = mb_strtoupper(mb_substr($str, 0, 1));
        return $fc.mb_substr($str, 1);
    }

    public function bm_lcfirst($str)
    {
        $fc = mb_strtolower(mb_substr($str, 0, 1));
        return $fc.mb_substr($str, 1);
    }

    public function frontendPost($post)
    {
        //echo waRequest::param('action'); //post 

        $model = new blogBlogmetaPluginModel();
        $search = array(
            'blog_id' => $post['blog_id'],
            'type' => 'post',
        );
        $blogmeta = $model->getByField($search);

        $modelSettings = new waAppSettingsModel();
        $compName = $modelSettings->get('webasyst', 'name');

        if (wa()->appExists('shop')) {
            $this->shop_name = trim(wa('shop')->getConfig()->getGeneralSettings('name'));
            $this->shop_email = trim(wa('shop')->getConfig()->getGeneralSettings('email')); 
            $this->shop_phone = trim(wa('shop')->getConfig()->getGeneralSettings('phone'));  
        }

        /*
        $modelBlog = new blogBlogModel();
        $blogInfo = $modelBlog->getByField('id', $post['blog_id']);
        */

        $post['title'] = htmlspecialchars_decode($post['title'], ENT_QUOTES);

        if ( ($blogmeta['meta_replace'] && $blogmeta['title']) || ($blogmeta['title'] && !$post['meta_title']) ) {

            $blogmeta['title'] = str_replace(
                array(
                    '{title|lcfirst}', 
                    '{company_name|lcfirst}', 
                    '{blog_name|lcfirst}', 
                    '{shop_name|lcfirst}',
                ),
                array(
                    $this->bm_lcfirst($post['title']), 
                    $this->bm_lcfirst($compName), 
                    $this->bm_lcfirst($post['blog_name']), 
                    $this->bm_lcfirst($this->shop_name),
                ),
                $blogmeta['title']
            );
            $blogmeta['title'] = str_replace(
                array(
                    '{title|ucfirst}', 
                    '{company_name|ucfirst}', 
                    '{blog_name|ucfirst}', 
                    '{shop_name|ucfirst}',
                ),
                array(
                    $this->bm_ucfirst($post['title']), 
                    $this->bm_ucfirst($compName), 
                    $this->bm_ucfirst($post['blog_name']), 
                    $this->bm_ucfirst($this->shop_name),
                ),
                $blogmeta['title']
            );
            $blogmeta['title'] = str_replace(
                array(
                    '{title}', 
                    '{company_name}',
                    '{blog_name}',
                    '{shop_name}',
                    '{comment_count}', 
                    '{shop_email}', 
                    '{shop_phone}'
                ),
                array(
                    $post['title'],
                    $compName,
                    $post['blog_name'],
                    $this->shop_name,
                    $post['comment_count'], 
                    $this->shop_email, 
                    $this->shop_phone,
                ),
                $blogmeta['title']
            );

            wa()->getResponse()->setTitle($blogmeta['title']);

        }

        if ( ($blogmeta['meta_replace'] && $blogmeta['description']) || ($blogmeta['description'] && !$post['meta_description']) ) {

            $clearText = trim(strip_tags($post['text']));

            $blogmeta['description'] = str_replace(
                array(
                    '{title|lcfirst}', 
                    '{text|lcfirst}',
                    '{company_name|lcfirst}', 
                    '{blog_name|lcfirst}', 
                    '{shop_name|lcfirst}'),
                array(
                    $this->bm_lcfirst($post['title']), 
                    $this->bm_lcfirst($clearText), 
                    $this->bm_lcfirst($compName), 
                    $this->bm_lcfirst($post['blog_name']), 
                    $this->bm_lcfirst($this->shop_name)),
                $blogmeta['description']
            );
            $blogmeta['description'] = str_replace(
                array(
                    '{title|ucfirst}', 
                    '{text|ucfirst}',
                    '{company_name|ucfirst}', 
                    '{blog_name|ucfirst}', 
                    '{shop_name|ucfirst}'),
                array(
                    $this->bm_ucfirst($post['title']), 
                    $this->bm_ucfirst($clearText), 
                    $this->bm_ucfirst($compName), 
                    $this->bm_ucfirst($post['blog_name']), 
                    $this->bm_ucfirst($this->shop_name)),
                $blogmeta['description']
            );
            $blogmeta['description'] = str_replace(
                array(
                    '{title}', 
                    '{text}',
                    '{company_name}', 
                    '{blog_name}', 
                    '{shop_name}',
                    '{comment_count}', 
                    '{shop_email}', 
                    '{shop_phone}'),
                array(
                    $post['title'], 
                    $clearText, 
                    $compName, 
                    $post['blog_name'],
                    $this->shop_name,
                    $post['comment_count'], 
                    $this->shop_email, 
                    $this->shop_phone),
                $blogmeta['description']
            );

            if (preg_match("/\{text\|([\d]+)[\|]?(lcfirst|ucfirst)?\}/", $blogmeta['description'], $out)) {
                $more = '...';
                $trunCount = 0;
                if (isset($out[1]) && $out[1] > 1) {
                    $trunCount = $out[1];

                    if (mb_strlen($clearText) > 15 && $out[1] > 15) {
                        $pos2 = mb_strpos($clearText, ' ', ($out[1] - 15));
                        if ($pos2 !== false && $out[1] > $pos2) {
                            $trunCount = $pos2 + 1;
                        }
                    }

                    if (mb_strlen($clearText) > 50 && $out[1] > 50) {
                        $pos1 = mb_strpos($clearText, '.', ($out[1] - 50));
                        if ($pos1 !== false && $out[1] > $pos1) {
                            $trunCount = $pos1 + 1;
                            $more = '';
                        }
                    }

                    $truncText = (mb_strlen($clearText) > $trunCount) ? mb_substr($clearText, 0, $trunCount).$more : $clearText;

                    if (isset($out[2]) && $out[2] == 'lcfirst') $truncText = $this->bm_lcfirst($truncText);
                    elseif (isset($out[2]) && $out[2] == 'ucfirst') $truncText = $this->bm_ucfirst($truncText);

                    $textBeforeReplace = '{text|'.$out[1];
                    if (isset($out[2])) $textBeforeReplace .= '|'.$out[2].'}';
                    else $textBeforeReplace .= '}';

                    $blogmeta['description'] = str_replace($textBeforeReplace, $truncText, $blogmeta['description']);
                }
            }

            wa()->getResponse()->setMeta('description', $blogmeta['description']);

        }

        if ( ($blogmeta['meta_replace'] && $blogmeta['keywords']) || ($blogmeta['keywords'] && !$post['meta_keywords']) ) {

            $blogmeta['keywords'] = str_replace(
                array(
                    '{title|lcfirst}', 
                    '{company_name|lcfirst}', 
                    '{blog_name|lcfirst}', 
                    '{shop_name|lcfirst}'),
                array(
                    $this->bm_lcfirst($post['title']), 
                    $this->bm_lcfirst($compName), 
                    $this->bm_lcfirst($post['blog_name']), 
                    $this->bm_lcfirst($this->shop_name)),
                $blogmeta['keywords']
            );
            $blogmeta['keywords'] = str_replace(
                array(
                    '{title|ucfirst}', 
                    '{company_name|ucfirst}', 
                    '{blog_name|ucfirst}', 
                    '{shop_name|ucfirst}'),
                array(
                    $this->bm_ucfirst($post['title']), 
                    $this->bm_ucfirst($compName), 
                    $this->bm_ucfirst($post['blog_name']), 
                    $this->bm_ucfirst($this->shop_name)),
                $blogmeta['keywords']
            );
            $blogmeta['keywords'] = str_replace(
                array(
                    '{title}', 
                    '{company_name}', 
                    '{blog_name}', 
                    '{shop_name}',
                    '{comment_count}', 
                    '{shop_email}', 
                    '{shop_phone}'),
                array(
                    $post['title'], 
                    $compName, 
                    $post['blog_name'], 
                    $this->shop_name,
                    $post['comment_count'], 
                    $this->shop_email, 
                    $this->shop_phone),
                $blogmeta['keywords']
            );

            wa()->getResponse()->setMeta('keywords', $blogmeta['keywords']);

        }

        return array(
            'footer' => '',
        );

    }

    public function frontendActionPage($params)
    {
        //Баг - в $params в title, meta_keywords и meta_description данные с главной страницы "настройки поселения"
    }

    public function frontendActionDefault($params)
    {
        //Баг - в $params в title, meta_keywords и meta_description данные с главной страницы "настройки поселения"

        //echo waRequest::param('action'); //default 

        // Все блоги. Иерархические адреса (например /blog/*)
        $defaultBlogID = '';
        if (is_array($params['blog_id'])) {
            $defaultBlogID = intval($this->getSettings('defaultBlogID'));
            if (!$defaultBlogID) {
                // на странице несколько блогов - не понятно настройки какого брать?
                return;
            }
        }

        //$type = 'blog';
        if (isset($params['year'])) {
            $type = 'tag';
        } elseif (isset($params['tag'])) {
            $type = 'pluginTag';
        } elseif (preg_match('/\/author\/([\d]+)\//', waRequest::server('REQUEST_URI'), $out)) {
            $type = 'author';
            $authorId = intval($out[1]);
        } elseif (preg_match('/\/category\/(.+)\//', waRequest::server('REQUEST_URI'), $out)) {
            $type = 'category';
            $categoryUrl = $out[1];
        } elseif (isset($params['blog_url'])) {
            $type = 'blog';
        } else {
            // главная страница поселения
            return;
        }

        $model = new blogBlogmetaPluginModel();
        $search = array(
            'blog_id' => ($defaultBlogID) ? $defaultBlogID : $params['blog_id'],
            'type' => $type,
        );
        $blogmeta = $model->getByField($search);

        if (wa()->appExists('shop')) {
            $this->shop_name = trim(wa('shop')->getConfig()->getGeneralSettings('name'));
            $this->shop_email = trim(wa('shop')->getConfig()->getGeneralSettings('email')); 
            $this->shop_phone = trim(wa('shop')->getConfig()->getGeneralSettings('phone'));  
        }

        if ($type == 'blog') {
            $this->setBlogmetaBlog($blogmeta, $params);
        } elseif ($type == 'tag') {
            $this->setBlogmetaBlog($blogmeta, $params);
        } elseif ($type == 'pluginTag') {
            $this->setBlogmetaBlog($blogmeta, $params);
        } elseif ($type == 'author') {
            if ($authorId > 0) {
                $user_model = new waContactModel();
                $user = $user_model->getByField('id', $authorId);
                $params['author'] = $user['name'];
            }
            $this->setBlogmetaBlog($blogmeta, $params);
        } elseif ($type == 'category') {
            if ($categoryUrl) {
                $category_model = new blogBlogmetaPluginCategoryModel();
                try {
                    $category = $category_model->getByField('url', $categoryUrl);
                    $params['category'] = $category['name'];
                } catch (waDbException $e) {
                    //в случае неудачи поле будет пустым
                }
            }
            $this->setBlogmetaBlog($blogmeta, $params);
        }

    }

    public function setBlogmetaBlog($blogmeta, $params)
    {

        $page = intval(waRequest::get('page', 1, 'int'));

        $months = array(
            '',
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        );

        if (!isset($params['author'])) $params['author'] = '';
        if (!isset($params['category'])) $params['category'] = '';
        if (!isset($params['tag'])) $params['tag'] = '';
        if (!isset($params['year'])) $params['year'] = '';
        if (!isset($params['month'])) $params['month'] = '';
        $month = intval($params['month']);

        $modelSettings = new waAppSettingsModel();
        $compName = $modelSettings->get('webasyst', 'name');

        $modelBlog = new blogBlogModel();
        $blogInfo = $modelBlog->getByField('id', $params['blog_id']);

        if ($blogmeta['pagination'] && $page > 1) {
            $blogmeta['title'] = $blogmeta['title_pagin'];
            $blogmeta['description'] = $blogmeta['description_pagin'];
            $blogmeta['keywords'] = $blogmeta['keywords_pagin'];
        }

        if ( $blogmeta['title'] ) {

            $blogmeta['title'] = str_replace(
                array(
                    '{author|lcfirst}',
                    '{category|lcfirst}',
                    '{company_name|lcfirst}', 
                    '{blog_name|lcfirst}', 
                    '{shop_name|lcfirst}',
                    '{month|lcfirst}',
                    '{tag|lcfirst}',
                ),
                array(
                    $this->bm_lcfirst($params['author']),
                    $this->bm_lcfirst($params['category']),
                    $this->bm_lcfirst($compName), 
                    $this->bm_lcfirst($blogInfo['name']), 
                    $this->bm_lcfirst($this->shop_name),
                    $this->bm_lcfirst($months[$month]),
                    $this->bm_lcfirst($params['tag']),
                ),
                $blogmeta['title']
            );
            $blogmeta['title'] = str_replace(
                array(
                    '{author|ucfirst}',
                    '{category|ucfirst}',
                    '{company_name|ucfirst}', 
                    '{blog_name|ucfirst}', 
                    '{shop_name|ucfirst}',
                    '{month|ucfirst}',
                    '{tag|ucfirst}',
                ),
                array(
                    $this->bm_ucfirst($params['author']),
                    $this->bm_ucfirst($params['category']),
                    $this->bm_ucfirst($compName), 
                    $this->bm_ucfirst($blogInfo['name']), 
                    $this->bm_ucfirst($this->shop_name),
                    $this->bm_ucfirst($months[$month]),
                    $this->bm_ucfirst($params['tag']),
                ),
                $blogmeta['title']
            );
            $blogmeta['title'] = str_replace(
                array(
                    '{author}',
                    '{category}',
                    '{company_name}', 
                    '{blog_name}', 
                    '{shop_name}',
                    '{month}',
                    '{page}', 
                    '{shop_email}', 
                    '{shop_phone}',
                    '{year}',
                    '{tag}',
                ),
                array(
                    $params['author'],
                    $params['category'],
                    $compName, 
                    $blogInfo['name'], 
                    $this->shop_name,
                    $months[$month],
                    $page, 
                    $this->shop_email, 
                    $this->shop_phone,
                    $params['year'],
                    $params['tag']
                ),
                $blogmeta['title']
            );

            wa()->getResponse()->setTitle($blogmeta['title']);

        }

        if ( $blogmeta['description'] ) {

            $blogmeta['description'] = str_replace(
                array(
                    '{author|lcfirst}',
                    '{category|lcfirst}',
                    '{company_name|lcfirst}', 
                    '{blog_name|lcfirst}', 
                    '{shop_name|lcfirst}',
                    '{month|lcfirst}',
                    '{tag|lcfirst}',
                ),
                array(
                    $this->bm_lcfirst($params['author']),
                    $this->bm_lcfirst($params['category']),
                    $this->bm_lcfirst($compName), 
                    $this->bm_lcfirst($blogInfo['name']), 
                    $this->bm_lcfirst($this->shop_name),
                    $this->bm_lcfirst($months[$month]),
                    $this->bm_lcfirst($params['tag']),
                ),
                $blogmeta['description']
            );
            $blogmeta['description'] = str_replace(
                array(
                    '{author|ucfirst}',
                    '{category|ucfirst}',
                    '{company_name|ucfirst}', 
                    '{blog_name|ucfirst}', 
                    '{shop_name|ucfirst}',
                    '{month|ucfirst}',
                    '{tag|ucfirst}',
                ),
                array(
                    $this->bm_ucfirst($params['author']),
                    $this->bm_ucfirst($params['category']),
                    $this->bm_ucfirst($compName), 
                    $this->bm_ucfirst($blogInfo['name']), 
                    $this->bm_ucfirst($this->shop_name),
                    $this->bm_ucfirst($months[$month]),
                    $this->bm_ucfirst($params['tag']),
                ),
                $blogmeta['description']
            );
            $blogmeta['description'] = str_replace(
                array(
                    '{author}',
                    '{category}',
                    '{company_name}', 
                    '{blog_name}', 
                    '{shop_name}',
                    '{month}',
                    '{page}', 
                    '{shop_email}', 
                    '{shop_phone}',
                    '{year}',
                    '{tag}',
                ),
                array(
                    $params['author'],
                    $params['category'],
                    $compName, 
                    $blogInfo['name'], 
                    $this->shop_name,
                    $months[$month],
                    $page, 
                    $this->shop_email, 
                    $this->shop_phone,
                    $params['year'],
                    $params['tag'],
                ),
                $blogmeta['description']
            );

            wa()->getResponse()->setMeta('description', $blogmeta['description']);

        }

        if ( $blogmeta['keywords'] ) {

            $blogmeta['keywords'] = str_replace(
                array(
                    '{author|lcfirst}',
                    '{category|lcfirst}',
                    '{company_name|lcfirst}', 
                    '{blog_name|lcfirst}', 
                    '{shop_name|lcfirst}',
                    '{month|lcfirst}',
                    '{tag|lcfirst}',
                ),
                array(
                    $this->bm_lcfirst($params['author']),
                    $this->bm_lcfirst($params['category']),
                    $this->bm_lcfirst($compName), 
                    $this->bm_lcfirst($blogInfo['name']), 
                    $this->bm_lcfirst($this->shop_name),
                    $this->bm_lcfirst($months[$month]),
                    $this->bm_lcfirst($params['tag']),
                ),
                $blogmeta['keywords']
            );
            $blogmeta['keywords'] = str_replace(
                array(
                    '{author|ucfirst}',
                    '{category|ucfirst}',
                    '{company_name|ucfirst}', 
                    '{blog_name|ucfirst}', 
                    '{shop_name|ucfirst}',
                    '{month|ucfirst}',
                    '{tag|ucfirst}',
                ),
                array(
                    $this->bm_ucfirst($params['author']),
                    $this->bm_ucfirst($params['category']),
                    $this->bm_ucfirst($compName), 
                    $this->bm_ucfirst($blogInfo['name']), 
                    $this->bm_ucfirst($this->shop_name),
                    $this->bm_ucfirst($months[$month]),
                    $this->bm_ucfirst($params['tag']),
                ),
                $blogmeta['keywords']
            );
            $blogmeta['keywords'] = str_replace(
                array(
                    '{author}',
                    '{category}',
                    '{company_name}', 
                    '{blog_name}', 
                    '{shop_name}',
                    '{month}',
                    '{page}', 
                    '{shop_email}', 
                    '{shop_phone}',
                    '{year}',
                    '{tag}',
                ),
                array(
                    $params['author'],
                    $params['category'],
                    $compName, 
                    $blogInfo['name'], 
                    $this->shop_name,
                    $months[$month],
                    $page, 
                    $this->shop_email, 
                    $this->shop_phone,
                    $params['year'],
                    $params['tag'],
                ),
                $blogmeta['keywords']
            );

            wa()->getResponse()->setMeta('keywords', $blogmeta['keywords']);
            
        }

    }

}
