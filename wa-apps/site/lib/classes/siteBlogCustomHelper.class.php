<?php
class siteBlogCustomHelper
{
    public static function hello()
    {
        return 'hello';
    }

    public static function posts($blog_id = null, $number_of_posts = 20, $fields = array())
    {
        $posts = null;
        if ($available_blogs = self::blogs()) {
            $post_model = new blogPostModel();

            $search_options = array();
            if ($blog_id === null) {
                $search_options['blog_id'] = array_keys($available_blogs);
            } elseif (isset($available_blogs[$blog_id])) {
                $search_options['blog_id'] = $blog_id;
            } else {
                $available_blogs = blogHelper::getAvailable(false);
                if (in_array($blog_id, $available_blogs)) {
                    $search_options['blog_id'] = $blog_id;
                }
            }
            if ($search_options) {
                $extend_data = array('blog' => $available_blogs);
                $number_of_posts = max(1, $number_of_posts);
                $posts = $post_model->search($search_options, array('params' => true), $extend_data)->fetchSearchPage(1, $number_of_posts, $fields);
            }
        }
        $non_escape_fields = array(
            'text'            => true,
            'text_before_cut' => true,
            'plugins'         => true,
        );
        self::escape($posts, array('*' => $non_escape_fields));
        return $posts;
    }

    public static function blogs()
    {
        $default_blog_id = intval(wa()->getRouting()->getRouteParam('blog_url_type'));
        if ($default_blog_id < 1) {
            $default_blog_id = null;
        }
        $avaialable_blogs = blogHelper::getAvailable(true, $default_blog_id);
        foreach ($avaialable_blogs as &$item) {
            $item['name'] = htmlspecialchars($item['name'], ENT_QUOTES, 'utf-8');
            if (!is_array($item['link'])) {
                $item['link'] = htmlspecialchars($item['link'], ENT_QUOTES, 'utf-8');
            } else {
                foreach ($item['link'] as &$l) {
                    $l = htmlspecialchars($l, ENT_QUOTES, 'utf-8');
                }
            }
            $item['title'] = htmlspecialchars($item['title'], ENT_QUOTES, 'utf-8');
        }

        return $avaialable_blogs;
    }

    private static function escape(&$data, $pass = array())
    {
        if (is_array($data)) {
            foreach ($data as $key => &$item) {
                if (isset($pass[$key])) {
                    $pass_item = $pass[$key];

                } else if (isset($pass['*'])) {
                    $pass_item = $pass['*'];
                } else {
                    $pass_item = array();
                }
                if ($pass_item !== true) {
                    self::escape($item, $pass_item);
                }
            }
            unset($item);
        } else {
            $data = htmlspecialchars($data, ENT_QUOTES, 'utf-8');
        }
    }

}//EOF