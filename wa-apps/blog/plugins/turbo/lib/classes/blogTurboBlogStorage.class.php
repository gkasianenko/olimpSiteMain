<?php


class blogTurboBlogStorage
{
	public function getCountPosts()
	{
		$search = $this->getSearch();
		
		if ($search == null)
		{
			return 0;
		}
		
		$search->fetchSearch(0, 1);
		
		return $search->searchCount();
	}
	
	public function getPosts($offset, $limit)
	{
		$search = $this->getSearch();
		
		if ($search == null)
		{
			return null;
		}
		
		return $search->fetchSearch($offset, $limit);
	}
	
	private function getSearch()
	{
		$view_helper = new blogViewHelper(wa('blog'));
		
		if ($available_blogs = $view_helper->blogs())
		{
			$post_model = new blogPostModel();
			
			$search_options = array();
			$search_options['blog_id'] = array_keys($available_blogs);
			
			if ($search_options)
			{
				$extend_data = array('blog' => $available_blogs);
				
				return $post_model->search($search_options, array('params' => true), $extend_data);
			}
		}
		
		return null;
	}
}