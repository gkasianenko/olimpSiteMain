<?php

class blogBlogmetaPluginBackendSaveController extends waJsonController
{

    public function execute()
    {

        $model = new blogBlogmetaPluginModel();
        $blog_id = intval(waRequest::post('blogmeta_blog_id', 0, 'int'));

        $dataPostMeta = array(
            'id_type' => md5($blog_id.'post'),
            'blog_id' => $blog_id,
            'type' => 'post',
            'meta_replace' => intval(waRequest::post('blogmeta_post_replace', 0, 'int')),
            'title' => trim(waRequest::post('blogmeta_post_title', '', 'string')),
            'description' => trim(waRequest::post('blogmeta_post_description', '', 'string')),
            'keywords' => trim(waRequest::post('blogmeta_post_keywords', '', 'string')),
        );
        $model->insert($dataPostMeta, 1);

        $dataBlogMeta = array(
            'id_type' => md5($blog_id.'blog'),
            'blog_id' => $blog_id,
            'type' => 'blog',
            'pagination' => intval(waRequest::post('blogmeta_blog_pagination', 0, 'int')),
            'title' => trim(waRequest::post('blogmeta_blog_title', '', 'string')),
            'description' => trim(waRequest::post('blogmeta_blog_description', '', 'string')),
            'keywords' => trim(waRequest::post('blogmeta_blog_keywords', '', 'string')),
            'title_pagin' => trim(waRequest::post('blogmeta_blog_title_pagin', '', 'string')),
            'description_pagin' => trim(waRequest::post('blogmeta_blog_description_pagin', '', 'string')),
            'keywords_pagin' => trim(waRequest::post('blogmeta_blog_keywords_pagin', '', 'string')),
        );
        $model->insert($dataBlogMeta, 1);

        $dataTagMeta = array(
            'id_type' => md5($blog_id.'tag'),
            'blog_id' => $blog_id,
            'type' => 'tag',
            'pagination' => intval(waRequest::post('blogmeta_tag_pagination', 0, 'int')),
            'title' => trim(waRequest::post('blogmeta_tag_title', '', 'string')),
            'description' => trim(waRequest::post('blogmeta_tag_description', '', 'string')),
            'keywords' => trim(waRequest::post('blogmeta_tag_keywords', '', 'string')),
            'title_pagin' => trim(waRequest::post('blogmeta_tag_title_pagin', '', 'string')),
            'description_pagin' => trim(waRequest::post('blogmeta_tag_description_pagin', '', 'string')),
            'keywords_pagin' => trim(waRequest::post('blogmeta_tag_keywords_pagin', '', 'string')),
        );
        $model->insert($dataTagMeta, 1);

        $dataAuthorMeta = array(
            'id_type' => md5($blog_id.'author'),
            'blog_id' => $blog_id,
            'type' => 'author',
            'pagination' => intval(waRequest::post('blogmeta_author_pagination', 0, 'int')),
            'title' => trim(waRequest::post('blogmeta_author_title', '', 'string')),
            'description' => trim(waRequest::post('blogmeta_author_description', '', 'string')),
            'keywords' => trim(waRequest::post('blogmeta_author_keywords', '', 'string')),
            'title_pagin' => trim(waRequest::post('blogmeta_author_title_pagin', '', 'string')),
            'description_pagin' => trim(waRequest::post('blogmeta_author_description_pagin', '', 'string')),
            'keywords_pagin' => trim(waRequest::post('blogmeta_author_keywords_pagin', '', 'string')),
        );
        $model->insert($dataAuthorMeta, 1);

        $dataCategoryMeta = array(
            'id_type' => md5($blog_id.'category'),
            'blog_id' => $blog_id,
            'type' => 'category',
            'pagination' => intval(waRequest::post('blogmeta_category_pagination', 0, 'int')),
            'title' => trim(waRequest::post('blogmeta_category_title', '', 'string')),
            'description' => trim(waRequest::post('blogmeta_category_description', '', 'string')),
            'keywords' => trim(waRequest::post('blogmeta_category_keywords', '', 'string')),
            'title_pagin' => trim(waRequest::post('blogmeta_category_title_pagin', '', 'string')),
            'description_pagin' => trim(waRequest::post('blogmeta_category_description_pagin', '', 'string')),
            'keywords_pagin' => trim(waRequest::post('blogmeta_category_keywords_pagin', '', 'string')),
        );
        $model->insert($dataCategoryMeta, 1);

        $dataPluginTagMeta = array(
            'id_type' => md5($blog_id.'pluginTag'),
            'blog_id' => $blog_id,
            'type' => 'pluginTag',
            'pagination' => intval(waRequest::post('blogmeta_pluginTag_pagination', 0, 'int')),
            'title' => trim(waRequest::post('blogmeta_pluginTag_title', '', 'string')),
            'description' => trim(waRequest::post('blogmeta_pluginTag_description', '', 'string')),
            'keywords' => trim(waRequest::post('blogmeta_pluginTag_keywords', '', 'string')),
            'title_pagin' => trim(waRequest::post('blogmeta_pluginTag_title_pagin', '', 'string')),
            'description_pagin' => trim(waRequest::post('blogmeta_pluginTag_description_pagin', '', 'string')),
            'keywords_pagin' => trim(waRequest::post('blogmeta_pluginTag_keywords_pagin', '', 'string')),
        );
        $model->insert($dataPluginTagMeta, 1);

        $this->response = array(
            'blogmeta' => 'ok',
        );

    }

}