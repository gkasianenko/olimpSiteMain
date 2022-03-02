<?php


class blogTurboPostsModel extends waModel
{
	protected $table = 'blog_turbo_posts';
	protected $id = 'post_id';
	
	public function isTurbo($post_id)
	{
		$row = $this->getById($post_id);
		
		if (!isset($row))
		{
			return true;
		}
		
		return !!$row['is_turbo'];
	}
	
	public function setIsTurbo($post_id, $is_turbo)
	{
		$this->replace(array(
			'post_id' => $post_id,
			'is_turbo' => $is_turbo,
		));
	}
	
	public function getExcludes()
	{
		$rows = $this->select('post_id')->where('is_turbo = ?', '0')->fetchAll('post_id');
		$keys = array_keys($rows);
		
		if (count($keys) > 0)
		{
			return array_combine($keys, $keys);
		}
		else
		{
			return array();
		}
	}
}