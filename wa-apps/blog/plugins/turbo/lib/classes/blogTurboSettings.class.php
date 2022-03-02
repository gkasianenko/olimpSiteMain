<?php


class blogTurboSettings
{
	private $is_enabled;
	private $title;
	private $description;
	private $language;
	private $number_of_posts;
	private $is_enabled_pages;
	private $posts_per_page;

	public function isEnabled()
	{
		return $this->is_enabled;
	}

	public function setIsEnabled($is_enabled)
	{
		$this->is_enabled = $is_enabled;
	}

	public function getTitle()
	{
		return $this->title;
	}

	public function setTitle($title)
	{
		$this->title = $title;
	}

	public function getDescription()
	{
		return $this->description;
	}

	public function setDescription($description)
	{
		$this->description = $description;
	}

	public function getLanguage()
	{
		return $this->language;
	}

	public function setLanguage($language)
	{
		$this->language = $language;
	}

	public function getNumberOfPosts()
	{
		return $this->number_of_posts;
	}

	public function setNumberOfPosts($number_of_posts)
	{
		$this->number_of_posts = $number_of_posts;
	}

	public function isEnabledPages()
	{
		return $this->is_enabled_pages;
	}

	public function setIsEnabledPages($is_enabled_pages)
	{
		$this->is_enabled_pages = $is_enabled_pages;
	}

	public function getPostsPerPage()
	{
		return $this->posts_per_page;
	}

	public function setPostsPerPage($posts_per_page)
	{
		$this->posts_per_page = $posts_per_page;
	}

	public function toArray()
	{
		return array(
			'is_enabled' => $this->isEnabled(),
			'title' => $this->getTitle(),
			'description' => $this->getDescription(),
			'language' => $this->getLanguage(),
			'number_of_posts' => $this->getNumberOfPosts(),
			'is_enabled_pages' => $this->isEnabledPages(),
			'posts_per_page' => $this->getPostsPerPage(),
		);
	}
}
