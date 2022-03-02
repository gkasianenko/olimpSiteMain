<?php


class blogTurboPluginFrontendRssPagesAction extends waViewAction
{
	public function execute()
	{
		$storage = new blogTurboSettingsStorage();
		$settings = $storage->getStorefrontSettings(blogTurboHelper::getCurrentStorefront());
		$posts_per_page = $settings->getPostsPerPage();
		$turbo_blog_storage = new blogTurboBlogStorage();
		$count_posts = $turbo_blog_storage->getCountPosts();
		$count_pages = min(10, ceil($count_posts / $posts_per_page));
		$urls = array();
		
		for ($page = 0; $page < $count_pages; $page++)
		{
			$urls[] = wa()->getRouteUrl('blog/frontend/rss', array('plugin' => 'turbo', 'page' => $page + 1), true);
		}
		
		$this->view->assign('urls', $urls);
	}
}
