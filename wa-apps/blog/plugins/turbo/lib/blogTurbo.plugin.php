<?php

class blogTurboPlugin extends blogPlugin
{
	public function routing($route = array())
	{
		$storage = new blogTurboSettingsStorage();
		$settings = $storage->getStorefrontSettings(blogTurboHelper::getCurrentStorefront());

		if ($settings->isEnabled())
		{
			if ($settings->isEnabledPages())
			{
				return array(
					'turbo-rss.xml' => array(
						'app' => 'blog',
						'plugin' => 'turbo',
						'module' => 'frontend',
						'action' => 'rssPages',
					),
					'turbo-rss-<page:\d+>.xml' => array(
						'app' => 'blog',
						'plugin' => 'turbo',
						'module' => 'frontend',
						'action' => 'rss',
					),
				);
			}
			else
			{
				return array(
					'turbo-rss.xml' => array(
						'app' => 'blog',
						'plugin' => 'turbo',
						'module' => 'frontend',
						'action' => 'rss',
					),
				);
			}
		}
		else
		{
			return array();
		}
	}

	public function backendPostEditHandle($post)
	{
		$model = new blogTurboPostsModel();
		$is_turbo = $model->isTurbo($post['id']);
		waSystem::popActivePlugin();
		wa()->getView()->assign('is_turbo', $is_turbo);
		$html = wa()->getView()->fetch("{$this->path}/templates/handlers/BackendPostEditSidebar.html");
		waSystem::pushActivePlugin('turbo', 'blog');

		return array(
			'sidebar' => $html,
		);
	}

	public function postSaveHandle($params)
	{
		$post_id = $params['id'];
		$is_turbo = !!waRequest::post('turbo', false);
		$model = new blogTurboPostsModel();
		$model->setIsTurbo($post_id, $is_turbo);
	}
}
