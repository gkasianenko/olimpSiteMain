<?php

/*
 * @author Anatoly Chikurov <anatoly@chikurov-seo.ru>
 */

class shopMetarobotsPlugin extends shopPlugin
{	
	//all settings will be in array $settings
	private static $all_settings = '';
	
	//getters for all settings
	public static function getAllSettingsFromPlugin() {
		self::$all_settings = wa('shop')->getPlugin('metarobots')->getSettings();
	}
	public static function getAllSettings() {
		return self::$all_settings;
	}
	
	//variables
	private static $meta_text = '';
	private static $page_type = '';

	//getters and setters for variables
	public static function getMetaText() {
		return self::$meta_text;
	}
	public static function setMetaText($meta_text) {
		self::$meta_text = $meta_text;
	}
	public static function getPageType() {
		return self::$page_type;
	}
	public static function setPageType($page_type) {
		self::$page_type = $page_type;
	}
	
	//hook
	public function frontendCategory($category) {
		$settings = $this->getAllSettings();
		if ($settings == '') {
			$this->getAllSettingsFromPlugin();
			$settings = $this->getAllSettings();
		}
		if ($settings['enabled'] == 0) {
			return '';
		}
		
		$this->checkCategoryPage($category);
		return '';
	}
	
	//helper
	public static function altFrontendCategory($category) {
		return;
	}
	
	public static function checkCategoryPage($category) {	
		$settings = self::getAllSettings();
		if ($settings == '') {
			self::getAllSettingsFromPlugin();
			$settings = self::getAllSettings();
		}
		
		self::setPageType('category');
		$meta_text = '';
		$html = '';
		
		//set meta_text for hidden category pages with or without get params
		if (!$category['status']) {
			
			self::setPageType('hidden_category');
			
			//add meta_text for robots
			$value = $settings['hidden_category_for_robots'];
			$meta_text = self::changeMetaText('robots', $meta_text, $value);
			
			//add meta_text for yandex
			$value = $settings['hidden_category_for_yandex'];
			$meta_text = self::changeMetaText('yandex', $meta_text, $value);
			
			//add meta_text for googlebot
			$value = $settings['hidden_category_for_googlebot'];
			$meta_text = self::changeMetaText('googlebot', $meta_text, $value);
			
			//save meta_text
			self::setMetaText($meta_text);
		}
		return;
	}
	
	//hook
	public function frontendProduct($product) {
		$settings = $this->getAllSettings();
		if ($settings == '') {
			$this->getAllSettingsFromPlugin();
			$settings = $this->getAllSettings();
		}
		if ($settings['enabled'] == 0) {
			return;
		}
		$this->checkProductPage($product);
		
		return;
	}
	
	//helper
	public static function altFrontendProduct($product) {
		return;
	}
	
	public static function checkProductPage($product) {
		$settings = self::getAllSettings();
		if ($settings == '') {
			self::getAllSettingsFromPlugin();
			$settings = self::getAllSettings();
		}
		$url = $_SERVER['REQUEST_URI'];
		$url_has_reviews = self::checkReviews($url); //'true' if has 'reviews' in URL
		
		if ($url_has_reviews) {
			if ($product['reviews']) {
				self::setPageType('product_reviews_not_empty');
			} else {
				self::setPageType('product_reviews_empty');
			}
		} else {
			self::setPageType('product');
		}
		
		$meta_text = '';
		$html = '';
		
		if (!$product['status']) {
			$meta_text = '';
			
			//add meta_text for robots
			$value = $settings['hidden_product_for_robots'];
			$meta_text = self::changeMetaText('robots', $meta_text, $value);
			
			//add meta_text for yandex
			$value = $settings['hidden_product_for_yandex'];
			$meta_text = self::changeMetaText('yandex', $meta_text, $value);
			
			//add meta_text for googlebot
			$value = $settings['hidden_product_for_googlebot'];
			$meta_text = self::changeMetaText('googlebot', $meta_text, $value);
			
			//save meta_text
			self::setMetaText($meta_text);
			
			if ($url_has_reviews) {
				self::setPageType('hidden_product_reviews');
			} else {
				self::setPageType('hidden_product');
			}
		}
		return;
	}
	
	//hook
	public function frontendHead() {
		$settings = $this->getAllSettings();
		if ($settings == '') {
			$this->getAllSettingsFromPlugin();
			$settings = $this->getAllSettings();
		}
		
		if ($settings['enabled'] == 0) {
			return '';
		}
		if ($settings['need_alt_frontend_head'] == 1) {
			return '';
		}

		return $this->outputMetaText();
	}
	
	//helper
	public static function altFrontendHead() {
		$settings = self::getAllSettings();
		if ($settings == '') {
			self::getAllSettingsFromPlugin();
			$settings = self::getAllSettings();
		}
		
		if ($settings['enabled'] == 0) {
			return '';
		}
		if ($settings['need_alt_frontend_head'] == 0) {
			return '';
		}
		return self::outputMetaText();
	}
	
	public static function outputMetaText() {
		$settings = self::getAllSettings();
		if ($settings == '') {
			self::getAllSettingsFromPlugin();
			$settings = self::getAllSettings();
		}
		
		//get meta_text from other functions
		$meta_text = self::getMetaText();
		$page_type = self::getPageType();
		
		//meta_text for page with get params (but not for hidden category and hidden product, if it already has meta_text)
		if ($meta_text == '') {
			
			//determine the type of page
			$page_param_type = self::setPageParamType();
			
			if ($page_param_type == 'page') {		
				$page_type = 'category_with_param_page';
				
				//add meta_text for robots
				$value = $settings['category_with_param_page_for_robots'];
				$meta_text = self::changeMetaText('robots', $meta_text, $value);
				
				//add meta_text for yandex
				$value = $settings['category_with_param_page_for_yandex'];
				$meta_text = self::changeMetaText('yandex', $meta_text, $value);
				
				//add meta_text for googlebot
				$value = $settings['category_with_param_page_for_googlebot'];
				$meta_text = self::changeMetaText('googlebot', $meta_text, $value);
			}
			
			if ($page_param_type == 'sku') {
				$page_type = 'product_with_param_sku';
				
				//add meta_text for robots
				$value = $settings['product_with_param_sku_for_robots'];
				$meta_text = self::changeMetaText('robots', $meta_text, $value);
				
				//add meta_text for yandex
				$value = $settings['product_with_param_sku_for_yandex'];
				$meta_text = self::changeMetaText('yandex', $meta_text, $value);
				
				//add meta_text for googlebot
				$value = $settings['product_with_param_sku_for_googlebot'];
				$meta_text = self::changeMetaText('googlebot', $meta_text, $value);
			}
			
			if ($page_param_type == 'other') {
				$page_type = 'page_with_other_params';
				
				//add meta_text for robots
				$value = $settings['page_with_other_params_for_robots'];
				$meta_text = self::changeMetaText('robots', $meta_text, $value);
				
				//add meta_text for yandex
				$value = $settings['page_with_other_params_for_yandex'];
				$meta_text = self::changeMetaText('yandex', $meta_text, $value);
				
				//add meta_text for googlebot
				$value = $settings['page_with_other_params_for_googlebot'];
				$meta_text = self::changeMetaText('googlebot', $meta_text, $value);
			}
			
			if ($page_param_type == 'cnc') {
				$page_type = 'page_with_cnc_params';
			}
			
			if ($page_type == 'product_reviews_empty') {
				
				//add meta_text for robots
				$value = $settings['page_with_other_params_for_robots'];
				$meta_text = self::changeMetaText('robots', $meta_text, $value);
				
				//add meta_text for yandex
				$value = $settings['page_with_other_params_for_yandex'];
				$meta_text = self::changeMetaText('yandex', $meta_text, $value);
				
				//add meta_text for googlebot
				$value = $settings['page_with_other_params_for_googlebot'];
				$meta_text = self::changeMetaText('googlebot', $meta_text, $value);
			}
			
			if ($page_type == 'product_reviews_not_empty') {
				
				//add meta_text for robots
				$value = $settings['page_productreview_for_robots'];
				$meta_text = self::changeMetaText('robots', $meta_text, $value);
				
				//add meta_text for yandex
				$value = $settings['page_productreview_for_yandex'];
				$meta_text = self::changeMetaText('yandex', $meta_text, $value);
				
				//add meta_text for googlebot
				$value = $settings['page_productreview_for_googlebot'];
				$meta_text = self::changeMetaText('googlebot', $meta_text, $value);
			}
		}
		
		//output message for admin
		if ($page_type !='' && $page_type !='category' && $page_type !='product') {
			$html = self::message($page_type, $meta_text);
			echo $html;
		}

		//output meta_text for all pages
		if ($meta_text != '') {
			return $meta_text;
		}
		return '';
	}
	
	public static function changeMetaText($robot, $meta_text, $value) {
		if ($value != 'disabled') {
			$meta_text .= '<meta name="'.$robot.'" content="'.$value.'" />';
		}
		return $meta_text;
	}
	
	public static function setPageParamType() {
		$page_type = self::getPageType();
		
		$url = $_SERVER['REQUEST_URI'];
		$has_underscores = self::checkUnderscores($url); //'true' if has '?_=' or '&_=' in URL
		$has_question = self::checkQuestion($url); //'true' if has '/?' in the end in URL
		
		if ($has_question) {
			return 'other';
		}
		
		
		
		if (waRequest::request() || $has_underscores) {			
			if (count(waRequest::request()) == 1 && !$has_underscores) {
				
				//check param "page"
				if (waRequest::request('page')) {
					if ((preg_match("/^[0-9]+$/", waRequest::request('page'))) && (waRequest::request('page') !=1) && ($page_type !='product') && ($page_type !='product_reviews_not_empty') && ($page_type !='product_reviews_empty')) {
						
						//if correct param "page"
						return 'page';
					} else {

						//if incorrect param "page"
						return 'other';
					}
				}
				
				//check param "sku"
				if (waRequest::request('sku')) {
					if (preg_match("/^[0-9]+$/", waRequest::request('sku')) && $page_type =='product') {
						
						//if correct param "sku"
						return 'sku';
					} else {
						
						//if incorrect param "sku"
						return 'other';
					}
				}
				
				//if count param == 1 , but not "page" and not "sku"
				$has_symbol = self::checkGetParams($url);
				if ($has_symbol) {
					return 'other';
				} else {
					return 'cnc';
				}
			}

			//if count param > 1
			$has_symbol = self::checkGetParams($url); //'true' if has '?' in URL
			if ($has_symbol) {
				if ((preg_match("/^[0-9]+$/", waRequest::request('page'))) && (waRequest::request('page') !=1) && ($page_type !='product') && ($page_type !='product_reviews_not_empty') && ($page_type !='product_reviews_empty')) {
					$has_ampersand = self::checkGetAmpersand($url); //'true' if has '&' in URL
					if ($has_ampersand) {
						return 'other';
					} else {
						return 'page';
					}
				}
				return 'other';
			} else {
				return 'cnc';
			}
			
		} else {
			
			//if count param == 0
			return false;
		}
	}
	
	public static function checkUnderscores($url) {
		if (strpos($url,'?_=') || strpos($url,'&_=')) {
			return true;
		}
		return false;
	}
	
	public static function checkQuestion($url) {
		if (substr($url, -2) == '/?') {
			return true;
		}
		return false;
	}
	
	public static function checkReviews($url) {
		if (strpos($url,'/reviews/')) {
			return true;
		}
		return false;
	}
	
	public static function checkGetParams($url) {
		if (strpos($url,'?')) {
			return true;
		}
		return false;
	}
	
	public static function checkGetAmpersand($url) {
		if (strpos($url,'&')) {
			return true;
		}
		return false;
	}
	
	public static function message($page_type, $meta_text) {
		$settings = self::getAllSettings();
		if ($settings == '') {
			self::getAllSettingsFromPlugin();
			$settings = self::getAllSettings();
		}
		
		$html = '';
		
		//test mode for technical support 
		$is_test_mode = waRequest::cookie('metarobots_test');
		
		if ($settings['need_notice'] || $is_test_mode) {
			$user_id = wa()->getUser()->getId(); //get user ID
			$contact = new waContact($user_id); //get contact ID
			$is_admin = $contact->isAdmin('shop'); //if contact is admin

			//show message for admin
			if ($is_admin || $is_test_mode) {

				if ($page_type == 'hidden_category') {
					$page_name = 'Страница скрытой категории';
				} elseif ($page_type == 'hidden_product') {
					$page_name = 'Страница (или подстраница) скрытого товара';
				} elseif ($page_type == 'category_with_param_page') {
					$page_name = 'Страница пагинации';
				} elseif ($page_type == 'product_with_param_sku') {
					$page_name = 'Артикульная страница товара';
				} elseif ($page_type == 'page_with_other_params') {
					$page_name = 'Мусорная страница';
				} elseif ($page_type == 'product_reviews_not_empty') {
					$page_name = 'Страница отхывов о товаре';
				} elseif ($page_type == 'product_reviews_empty') {
					$page_name = 'Пустая страница отзывов о товаре (мусорная страница)';
				} elseif ($page_type == 'product_reviews') {
					$page_name = 'Страница отзывов о товаре (с хотя бы 1 опубликованным отзывом)';
				} elseif ($page_type == 'page_with_cnc_params') {
					$page_name = 'Страница с заменой GET-параметров на ЧПУ URL (например, это может быть страница плагина "SEO-фильтр", итп плагинов)';
				}
				
				//add css
				$html = '<style> .plugin-mtrbts__title { font-size: 14px !important; } .plugin-mtrbts__wrap { font-size: 12px !important; position: fixed !important; bottom: 50px !important; background: yellow !important; color: black !important; z-index: 999999 !important; width: 47% !important; max-width: 1200px !important; padding: 10px !important; margin: 0 auto !important; box-shadow: 0 0 20px !important; } .plugin-mtrbts__title { display: inline-block !important; margin-bottom: 15px !important; } .plugin-mtrbts__closeButton { height: 30px !important; width: 30px !important; background-color: #eeeeee !important; border-radius: 5px !important; position: absolute !important; right: 10px !important; top: 10px !important; color: black !important; border: 1px solid #969696 !important; text-align: center !important; padding: 0 !important; line-height: 28px !important;} .plugin-mtrbts__settingsText { line-height: 30px !important; } .plugin-mtrbts__settingsLink { color: #ffffff !important; text-decoration: underline; background: blue !important; padding: 5px 10px !important; } .plugin-mtrbts__settingsLink:hover { text-decoration: none !important; } .plugin-mtrbts__textNotice { font-weight: 600 !important; color: red !important } .plugin-mtrbts__metaText { margin: 0 !important; padding: 10px !important; cursor: text !important; display: inline !important; background: white !important; line-height: 40px !important;} .plugin-mtrbts__metaTextWrap { display: inline-block !important; margin: 5px 0 15px !important; } .plugin-mtrbts__clearBoth { clear: both !important; } .plugin-mtrbts__hidden { display: none !important; } </style>';
				
				//add html
				$html .='<div class="plugin-mtrbts__wrap"><button class="plugin-mtrbts__closeButton">x</button><h3 class="plugin-mtrbts__title">Тестирование плагина "SEO Meta R&#111;b&#111;ts"</h3><div class="plugin-mtrbts__clearBoth"></div><p class="plugin-mtrbts__textNotice">Этот блок показывается только администратору сайта! Отключить его можно в настройках плагина:<br><i>("Админстративная панель сайта" --> "Магазин" --> "Плагины" --> "SEO Meta R&#111;b&#111;ts")</i></p><p>Данная страница определена плагином "SEO Meta R&#111;b&#111;ts" как «<u>'.$page_name.'</u>».</p>';
				if ($page_type == 'page_with_cnc_params') {
					$html .='<p>В исходном коде между тегами &lt;head&gt; и &lt;/head&gt;, плагин <b>не должен</b> выводить метатег «r&#111;b&#111;ts» при любых настройках.</p>';
				} elseif ($meta_text != '') {
					$meta_text = str_replace('<','&lt;',$meta_text);
					$meta_text = str_replace('>','&gt;',$meta_text);
					$meta_text = str_replace('o','&#111;',$meta_text);
					$meta_text = str_replace('n','&#110;',$meta_text);
					$html .='<p>В исходном коде между тегами &lt;head&gt; и &lt;/head&gt;, согласно настройкам, плагин должен вывести:</p><div class="plugin-mtrbts__metaTextWrap"><span class="plugin-mtrbts__metaText">'.$meta_text.'</span></div>';
				} else {
					$html .='<p>В исходном коде между тегами &lt;head&gt; и &lt;/head&gt;, согласно настройкам, плагин <b>не должен</b> выводить метатег «r&#111;b&#111;ts».</p>';
				}
				$html .='<div class="plugin-mtrbts__clearBoth"></div></div>';
				
				//add script
				$html .='<script> const btn = document.querySelector(".plugin-mtrbts__closeButton"); const content = document.querySelector(".plugin-mtrbts__wrap"); btn.addEventListener("click", btnClick); function btnClick() {content.classList.toggle("plugin-mtrbts__hidden");}</script>';
			}
		}
		return $html;
	}
	
	// экспорт настроек
	public function frontendFooter() {
		$this->getSettingsDump();
		return;
	}
	public function backendMenu() {
		$this->getSettingsDump();
		return;
	}
	public function getSettingsDump() {
		$plugin_id = 'metarobots'; //не забыть указать id плагина при копипасте!!
		if (waRequest::request('shop_' . $plugin_id . '_settings') == 1) {
			echo '
				<div class="dump_info">
					<span><b>Установленная версия плагина на данном проекте:</b> <b class="b-bitch">' . wa('shop')->getPlugin($plugin_id)->getVersion() . '</b><span>
					<h3>Инструкция по копированию дампа:</h3>
					<ol>
						<li>Убетитесь, что вы хотите импортировать настройки на проект, на котором установлена <b class="b-bitch">такая же</b> версия плагина</li>
						<li>Нажмите на серый блок</li>
						<li>Убетитесь, что все содержимое серого блока выделилось</li>
						<li>Скопируйте выделенный текст</li>
						<li>Вставьте его на форму импорта настроек плагина, не внося никаких изменений</li>
					</ol>
					
					<h3>Дамп настроек плагина ' . $plugin_id . ':</h3>
				</div>
			';
			echo '
				<style>
					pre { background: #eaeaea; display: inline-block; padding: 10px; border-radius: 10px; user-select: all; cursor: pointer; margin-top: 0; }
					.dump_info {  display: block; width: 100%; }
					.dump_info span { display: block; }
					b.b-bitch { font-weight: 900; text-decoration: underline; color: black; font-size: 1.2em; text-decoration-color: red; }
				</style>
			';
			wa_dump($this->getSettings());
		}
	}
}