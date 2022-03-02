<?php


class blogTurboTurboPage
{
	private $title;
	private $link;
	private $description;
	private $language;
	/** @var blogTurboTurboItem[] */
	private $items = array();
	
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
	
	public function getItems()
	{
		return $this->items;
	}
	
	public function createItem()
	{
		$item = new blogTurboTurboItem();
		$this->items[] = $item;
		
		return $item;
	}
	
	public function toXML()
	{
		$document = new DOMDocument('1.0', 'utf-8');
		
		$cms_plugin = $document->createElement('turbo:cms_plugin', '0BE3F8FB1C8AA6DA88767FABB1BFD1F2');
		$title = $document->createElement('title', $this->getTitle());
		$link = $document->createElement('link', $this->getLink());
		$description = $document->createElement('description', $this->getDescription());
		$language = $document->createElement('language', $this->getLanguage());
		
		$channel = $document->createElement('channel');
		$channel->appendChild($cms_plugin);
		$channel->appendChild($title);
		$channel->appendChild($link);
		$channel->appendChild($description);
		$channel->appendChild($language);
		
		foreach ($this->getItems() as $item)
		{
			$item_title = $document->createElement('title', $item->getTitle());
			$item_link = $document->createElement('link', $item->getLink());
			$item_author = $document->createElement('author', $item->getAuthor());
			$item_pub_date = $document->createElement('pubDate', $item->getPubDate()->format('r'));
			$cdata_content = $document->createCDATASection($item->getContent());
			$item_content = $document->createElement('turbo:content');
			$item_content->normalize();
			$item_content->appendChild($cdata_content);
			
			$_item = $document->createElement('item');
			$_item->setAttribute('turbo', 'true');
			$_item->appendChild($item_title);
			$_item->appendChild($item_link);
			$_item->appendChild($item_author);
			$_item->appendChild($item_pub_date);
			$_item->appendChild($item_content);
			
			$has_related = count($item->getRelated()) > 0;
			
			if ($has_related)
			{
				$item_related = $document->createElement('yandex:related');
				
				foreach ($item->getRelated() as $_link)
				{
					$related_link = $document->createElement('link', $_link->getText());
					$related_link->setAttribute('url', $_link->getUrl());
					$related_link->setAttribute('img', $_link->getImg());
					
					$item_related->appendChild($related_link);
				}
				
				$_item->appendChild($item_related);
			}
			
			$channel->appendChild($_item);
		}
		
		$rss = $document->createElement('rss');
		$rss->setAttribute('version', '2.0');
		$rss->setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:yandex', 'http://news.yandex.ru');
		$rss->setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:media', 'http://search.yahoo.com/mrss/');
		$rss->setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:turbo', 'http://turbo.yandex.ru');
		$rss->appendChild($channel);
		
		$document->appendChild($rss);
		
		return $document->saveXML();
	}
}