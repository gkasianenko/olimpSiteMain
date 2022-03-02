<?php


class blogCustomerHelper
{
    public static function blogPagination($currentPage, $totalPages, $range = 3)
    {
        $totalPages = (int)$totalPages;
        $rangeStart = self::rangeStart($currentPage, $range);
        $rangeEnd = self::rangeEnd($currentPage, $range, $totalPages);

        $pages = [];

        for ($i = $rangeStart; $i <= $rangeEnd; $i++) {
            $pages[$i] = $i;
        }

        if (count($pages) > 1) {
            return $pages;
        } else {
            return [];
        }
    }

    protected static function rangeStart($current, $range)
    {
        $start = $current - $range;

        return $start > 0 ? $start : 1;
    }

    protected static function rangeEnd($current, $range, $totalPages)
    {
        $end = $current + $range;

        return $end < $totalPages ? $end : $totalPages;
    }

    public static function prevPage($current)
    {
        return $current - 1;

    }

    public static function nextPage($current)
    {
        return $current + 1;

    }

    public static function hasPrev($current)
    {
        return $current > 1;
    }

    public static function hasNext($current, $totalPages)
    {
        return $current < $totalPages;
    }

    public static function getBlogCategories()
    {
        $categories = blogCategory::getAll();
        $output = array();

        foreach ($categories as $category) {
            $output[] = [
                'url' => wa()->getRouteUrl('blog/frontend', array('category' => urlencode($category['url'])), true),
                'name' => htmlentities($category['name'], ENT_QUOTES, 'utf-8'),
            ];
        }

        return $output;
    }

    public static function getPrevPost($post)
    {
        $result = (new blogPostModel())->query("SELECT * FROM blog_post WHERE blog_id = :blog_id AND id < :post_id and `status`='published' ORDER BY id DESC LIMIT 1",
            ["blog_id" => $post['blog_id'], "post_id" => $post['id']])->fetchAssoc();

        if ($result) {
            $result['url'] = blogPost::getUrl($result);
        }

        return $result;
    }

    public static function getNextPost($post)
    {
        $result = (new blogPostModel())->query("SELECT * FROM blog_post WHERE blog_id = :blog_id AND id > :post_id and `status`='published' ORDER BY id ASC LIMIT 1",
            ["blog_id" => $post['blog_id'], "post_id" => $post['id']])->fetchAssoc();

        if ($result) {
            $result['url'] = blogPost::getUrl($result);
        }

        return $result;
    }
}