<?php


class blogTurboTurboItem
{
	private $title;
	private $link;
	/** @var DateTime */
	private $pub_date;
	private $author;
	private $content;
	/** @var blogTurboTurboLink[] */
	private $related = array();
	
	public function getTitle()
	{
		return $this->title;
	}
	
	public function setTitle($title)
	{
		$this->title = $title;
	}
	
	public function getLink()
	{
		return $this->link;
	}
	
	public function setLink($link)
	{
		$this->link = $link;
	}
	
	public function getPubDate()
	{
		return $this->pub_date;
	}
	
	public function setPubDate(DateTime $pub_date)
	{
		$this->pub_date = $pub_date;
	}
	
	public function getAuthor()
	{
		return $this->author;
	}
	
	public function setAuthor($author)
	{
		$this->author = $author;
	}
	
	public function getContent()
	{
		return $this->content;
	}
	
	public function setContent($content)
	{
		$this->content = $this->handleContent($content);
	}
	
	public function getRelated()
	{
		return $this->related;
	}
	
	public function createRelated()
	{
		$link = new blogTurboTurboLink();
		$this->related[] = $link;
		
		return $link;
	}
	
	private function handleContent($content)
	{
		$content = strip_tags($content, '<header><h1><h2><h3><h4><h5><h6><figure><p><br><i><ul><ol><li><b><strong><em><sup><sub><ins><del><small><big><pre><code><abbr><u><a><video><img><figcaption><iframe><hr><blockquote><dl><dt><dd>');
		$document = new DOMDocument('1.0', 'UTF-8');
		@$document->loadHTML('<?xml encoding="UTF-8">' . $content);
		$images = $document->getElementsByTagName('img');
		
		/** @var DOMElement $img */
		foreach (iterator_to_array($images) as $img)
		{
			$parent = $img->parentNode;
			
			if ($parent->tagName == 'figure')
			{
				continue;
			}
			
			$figure = $document->createElement('figure');
			$parent->replaceChild($figure, $img);
			$figure->appendChild($img);
		}
		
		$content = '';
		$body = $document->getElementsByTagName('body')->item(0);
		
		foreach (iterator_to_array($body->childNodes) as $node)
		{
			$content .= $document->saveHTML($node);
		}
		
		return $content;
	}
}