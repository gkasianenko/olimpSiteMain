<?php

class customizerDraft
{
	protected $id;
	protected $themes = array();
	
	/**
     * Get draft instance
     * @param $id Draft theme id
     */
    public function __construct($id)
    {
		if (!$id) {
			throw new waException(sprintf(_ws("Invalid draft id %s"), $id));
		}
		
		$this->id = $id;
		$this->init();
    }
	
	private function init()
	{
		$apps = wa()->getApps();
        foreach ($apps as $app => $info) {
			if (waTheme::exists($this->id, $app, true)) {
				$theme = new waTheme($this->id, $app);
				$this->themes[$app] = $theme;
				unset($theme);
            }
        }
	}
	
	/**
     * Create draft
     * @param string $id Source theme id
     */
	public function create($id)
    {
		$apps = wa()->getApps();
		foreach ($apps as $app => $info) {
			if (waTheme::exists($id, $app, true) && !waTheme::exists($this->id, $app, true)) {
				$theme = new waTheme($id, $app);
				$params = array(
					'name' => array(
						'en_US' => $this->id,
						'ru_RU' => $this->id,
					),
					'source_theme_id' => $theme->id,
				);
				if ($theme->parent_theme_id) {
					$params['parent_theme_id'] = $theme->parent_theme->app_id . ':' . $this->id;
				}
				$this->themes[$app] = $theme->copy($this->id, $params);
				unset($theme);
			}
		}
		//$this->init();
	}
	
	/**
     * Publish draft (swap source with draft)
     */
	public function publish()
    {
		$timestamp = time();
		foreach ($this->themes as $theme) {
			try {
				$source_theme = new waTheme($theme->source_theme_id, $theme->app_id);
				$params = array(
					'name'            => $source_theme->getName(true),
					'source_theme_id' => $theme->source_theme_id . '_draft_' . $timestamp,
				);
				if ($theme->parent_theme_id) {
					$params['parent_theme_id'] = $theme->parent_theme->app_id . ':' . $theme->source_theme_id;
				}
				
				$source_theme->delete();
				unset($source_theme);
				
				$theme->copy($theme->source_theme_id, $params);
				unset($theme);
			} catch (waException $e) {
				//ignore error
				//$e->getMessage();
			}
		}
	}
	
	/**
     * Save draft (duplicate draft)
     * @param string $id New theme id
	 * @param mixed $name New theme name
     */
	public function save($id, $name = false)
    {
		if ($name && !is_array($name)) {
			$name = array(
				'en_US' => $name,
				'ru_RU' => $name,
			);
		}
		//$source_theme_id = 'draft_' . date('d-m-Y_H-i-s');
		$timestamp = time();
		foreach ($this->themes as $theme) {
			$params = array(
				'name'            => $name ? $name : $theme->getName(true),
				'source_theme_id' => $theme->source_theme_id . '_draft_' . $timestamp,
			);
			if ($theme->parent_theme_id) {
				$params['parent_theme_id'] = $theme->parent_theme->app_id . ':' . $id;
			}
			
			$theme->copy($id, $params);
			unset($theme);
		}
	}
	
	public function reset()
    {
		$this->delete();
	}
	
	public function delete()
    {
		foreach ($this->themes as $app => $theme)
		{
			$theme->delete();
			unset($this->themes[$app]);
		}
	}
}

//EOF