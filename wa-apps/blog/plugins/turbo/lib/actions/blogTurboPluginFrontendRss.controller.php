<?php


class blogTurboPluginFrontendRssController extends waController
{
	public function execute()
	{
		$page = waRequest::param('page', 1);
		
		$storage = new blogTurboSettingsStorage();
		$turbo_blog_storage = new blogTurboBlogStorage();
		$settings = $storage->getStorefrontSettings(blogTurboHelper::getCurrentStorefront());
		
		if ($settings->isEnabledPages())
		{
			$posts_per_page = $settings->getPostsPerPage();
			
			$count_posts = $turbo_blog_storage->getCountPosts();
			$count_pages = min(10, ceil($count_posts / $posts_per_page));
			$limit = min($posts_per_page * $page, $count_posts) - $posts_per_page * ($page - 1);
			$posts = $turbo_blog_storage->getPosts($posts_per_page * ($page - 1), $limit);
			
			if (!($page <= $count_pages) || count($posts) == 0)
			{
				throw new waException('Page not found', 404);
			}
		}
		else
		{
			$posts = $turbo_blog_storage->getPosts(0, $settings->getNumberOfPosts());
		}
		
		$turbo_page = new blogTurboTurboPage();
		$turbo_page->setTitle($settings->getTitle());
		$turbo_page->setLink(wa()->getUrl(true));
		$turbo_page->setDescription($settings->getDescription());
		$turbo_page->setLanguage($settings->getLanguage());
		$turbo_model = new blogTurboPostsModel();
		$excludes = $turbo_model->getExcludes();
		
		foreach ($posts as $post)
		{
			if (isset($excludes[$post['id']]))
			{
				continue;
			}
			
			$item = $turbo_page->createItem();
			$item->setTitle($post['title']);
			$item->setLink($post['link']);
			$item->setAuthor($post['user']['name']);
			$item->setPubDate(DateTime::createFromFormat('Y-m-d H:i:s', $post['datetime']));
			
			if ($this->getConfig()->getOption('can_use_smarty')) {
				try
				{
					$post['text'] = wa()->getView()->fetch("string:{$post['text']}");
				}
				catch (SmartyException $ex)
				{
					$post['text'] = blogPost::handleTemplateException($ex, $post);
				}
			}
			
			$item->setContent('<header><h1>' . $post['title'] . '</h1></header>' . $post['text']);
		}
		
		$this->getResponse()->addHeader('Content-Type', 'application/xml; charset=utf-8');
		$this->getResponse()->sendHeaders();
		
		echo $turbo_page->toXML();
	}
}
