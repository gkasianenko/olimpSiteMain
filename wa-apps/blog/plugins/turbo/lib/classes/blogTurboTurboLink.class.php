<?php


class blogTurboTurboLink
{
	private $url;
	private $img;
	private $text;
	
	public function getUrl()
	{
		return $this->url;
	}
	
	public function setUrl($url)
	{
		$this->url = $url;
	}
	
	public function getImg()
	{
		return $this->img;
	}
	
	public function setImg($img)
	{
		$this->img = $img;
	}
	
	public function getText()
	{
		return $this->text;
	}
	
	public function setText($text)
	{
		$this->text = $text;
	}
}