<?php

//заполнить информацию о плагине
$app_id = 'shop';
$plugin_id = 'metarobots'; // (!!!) не забыть изменить при копипасте!
$plugin_version = wa($app_id)->getPlugin($plugin_id)->getVersion();
$arr = explode('.', $plugin_version);
foreach ($arr as $i) {
    if (strlen($i) > 7) {
        $replaced_text = '.' . $i;
        $plugin_version = str_replace($replaced_text, '', $plugin_version);
    }
}

//заполнить информацию о разработчике
$docs_fullpath = 'https://chikurov-seo.ru/plugins-docs/metarobots/';
$developer_site = 'https://chikurov-seo.ru';
$developer_id = '1200329';
$developer_name = 'Веб-студия Анатолия Чикурова';
$developer_promo = '<p><a href="https://t.me/seo_flood" target="_blank"> >> Telegram канал разработчика</a><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i></p><p class="telegram_invitation"><i>Вступайте в телеграм канал! Вас ждут полезные новости и анонсы, приглашения на бесплатные вебинары, а также чат с коллегами и разработчиками, которые готовы помочь с решением вашей проблемы! (<a href="https://telegram.org/" target="_blank">скачать Telegram</a>)</i></p>';

//скрипты и стили для страницы настроек плагина
$files = '<link rel="stylesheet" href="../../wa-content/js/farbtastic/farbtastic.css?v1.14.7" type="text/css"><script type="text/javascript" src="../../wa-content/js/farbtastic/farbtastic.js?v1.14.7"></script><link href="../../wa-apps/shop/plugins/' . $plugin_id . '/css/settings.css?v=' . $plugin_version . '" rel="stylesheet"><script src="../../wa-apps/shop/plugins/' . $plugin_id . '/js/settings.js?v=' . $plugin_version . '"></script>';


//настройки (блоки визуально выделены отступами)
//документация по настройкам плагина: https://chikurov-seo.ru/instruktsii/instruktsiya-po-razrabotke-plagina/
return array(
    
	//////////////////////////// must have block
		'plugin_info_title' => array(
			'control_type' => waHtmlControl::TITLE,
			'value' => 'Информация о плагине и авторе',
			'description' => '
				<div class="plugin_docs">
					<p>ID плагина: <span id="plugin_docs_plugin_id">' . $plugin_id . '</span></p>
					<p>Текущая версия плагина: <span id="plugin_docs_plugin_version">' . $plugin_version . '</span></p>
					<p><a href="https://www.webasyst.ru/store/plugin/' . $app_id . '/' . $plugin_id . '/" target="_blank"> >> Страница плагина в магазине Webasyst</a></p>
					<p><span id="plugin_docs_plugin_docs_link"><a href="' . $docs_fullpath . '" target="_blank"> >> Документация к плагину</a></span></p><br>
					<p><b>@ ' . $developer_name . '</b></p>
					<p><a href="https://www.webasyst.ru/store/developer/' . $developer_id . '/" target="_blank"> >> Все плагины разработчика в магазине Webasyst</a></p>
					<p><a href="' . $developer_site  . '" target="_blank"> >> Сайт разработчика</a></p>
					'. $developer_promo . '
				</div>
				' . $files . '
			',
		),
		'enabled_title' => array(
			'control_type' => waHtmlControl::TITLE,
			'value' => 'Статус плагина',	
		),
		'enabled' => array(	
			'value' => 'Статус плагина',
			'control_type' => waHtmlControl::SELECT,
			'options' => array(
				array(
					'value' => '0',
					'title' => 'Откл',
				),
				array(
					'value' => '1',
					'title' => 'ВКЛ',
				),
			),
		),
		'export_title' => array(
			'control_type' => waHtmlControl::TITLE,
			'value' => 'Экспорт настроек плагина',
			'description' => '
				<span class="settings_export button red">Экспортировать</span>'
			,
		),
		'import_title' => array(
			'control_type' => waHtmlControl::TITLE,
			'value' => 'Импорт настроек плагина',
			'description' => '
				<span class="settings_import button red">Импортировать</span>'
			,
		),
        'lastsave_version' => array(
            'control_type' => waHtmlControl::HIDDEN,
            'value' => '0',
        ),
	////////////////////////////
	
	
	'hidden_product_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Скрытые товары',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">Тег будет выведен на страницах товаров со статусом "Скрыт с сайта" (в т.ч. на подстраницах скрытых товаров, на страницах скрытых отзывов, артикульных страницах скрытых товаров и мусорных страницах скрытых товаров).</span>
			</div>
		',
	),
	'hidden_product_for_robots' => array(
        'title' => 'Метатег "robots" для скрытых товаров:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="robots" content="noindex, nofollow" >',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="robots" content="noindex" />',
			),
		),
    ),
	'hidden_product_for_yandex' => array(
        'title' => 'Метатег "yandex" для скрытых товаров:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="yandex" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="yandex" content="noindex" />',
			),
		),
    ),
	'hidden_product_for_googlebot' => array(
        'title' => 'Метатег "googlebot" для скрытых товаров:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="googlebot" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="googlebot" content="noindex" />',
			),
		),
    ),
	
	
	'hidden_category_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Скрытые категории',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">Тег будет выведен на страницах категорий со статусом "Скрыт с сайта" (в.т.ч. на мусорных страницах скрытых категорий, и на страницах скрытых категорий с заменой GET-параметров на ЧПУ URL - страницах плагина "SEO-фильтр", итп плагинов).</span>
			</div>
		',
	),
	'hidden_category_for_robots' => array(
        'title' => 'Метатег "robots" для скрытых категорий:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="robots" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="robots" content="noindex" />',
			),
		),
		'value' => 'disabl',
    ),
	'hidden_category_for_yandex' => array(
        'title' => 'Метатег "yandex" для скрытых категорий:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="yandex" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="yandex" content="noindex" />',
			),
		),
    ),
	'hidden_category_for_googlebot' => array(
        'title' => 'Метатег "googlebot" для скрытых категорий:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="googlebot" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="googlebot" content="noindex" />',
			),
		),
    ),
	
	
	'category_with_param_page_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Страницы пагинаций',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">Тег будет выведен на страницах, содержащих в URL фрагмент "/?page=" (кроме страниц товаров: в этом случае страницы будут определены как мусорные).</span>
			</div>
		',
	),
	'category_with_param_page_for_robots' => array(
        'title' => 'Метатег "robots" для страниц пагинаций:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="robots" content="noindex" />',
			),
			//если хотите закрыть от индексации страницы пагинаций с запретом перехода по ссылкам, раскомментируйте код ниже и примените данную настройку на свой страх и риск.
			
			//noindex, nofollow для страниц пагинаций
			//array(
			//	'value' => 'noindex, nofollow',
			//	'title' => '<meta name="robots" content="noindex, nofollow" >',
			//),
		),
    ),
	'category_with_param_page_for_yandex' => array(
        'title' => 'Метатег "yandex" для страниц пагинаций:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="yandex" content="noindex" />',
			),
		),
    ),
	'category_with_param_page_for_googlebot' => array(
        'title' => 'Метатег "googlebot" для страниц пагинаций:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="googlebot" content="noindex" />',
			),
		),
    ),
	
	
	'product_with_param_sku_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Артикульные страницы товаров',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">Тег будет выведен на страницах, содержащих в URL фрагмент "/?sku=" (только на страницах товаров: на других типах страниц данные URL определяются как мусорные страницы).</span>
			</div>
		',
	),
	'product_with_param_sku_for_robots' => array(
        'title' => 'Метатег "robots" для артикульных страниц товаров:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="robots" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="robots" content="noindex" />',
			),
		),
    ),
	'product_with_param_sku_for_yandex' => array(
        'title' => 'Метатег "yandex" для артикульных страниц товаров:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="yandex" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="yandex" content="noindex" />',
			),
		),
    ),
	'product_with_param_sku_for_googlebot' => array(
        'title' => 'Метатег "googlebot" для артикульных страниц товаров:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="googlebot" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="googlebot" content="noindex" />',
			),
		),
    ),
	
	
	'page_with_other_params_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Мусорные страницы',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">Тег будет выведен на страницах, содержащих в URL фрагмент "/?", за ислючением "?page=" и "?sku="; а также на страницах отзывов о товарах, на которых не опубликовано ни одного отзыва.</span>
				<span class="xmp1_info">Некоторые плагины (например, "SEO-фильтр") заменяют некоторые GET-параметры страниц на ЧПУ (например, заменяя в URL фрагмент "/?color=red" на "/krasnogo-cveta/"). Технически страницы с заменой GET-параметра всё равно остаются страницами с GET-параметрами, но с точки зрения SEO они уже не являются мусорными страницами. Поэтому плагин для определения мусорных страниц проверяет не только наличие GET-параметров, но также наличие знака "?" в URL страницы. Если знака "?" в URL нет, значит страница не считается мусорной.</span>
			</div>
		',
	),
	'page_with_other_params_for_robots' => array(
        'title' => 'Метатег "robots" для мусорных страниц:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="robots" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="robots" content="noindex" />',
			),
		),
    ),
	'page_with_other_params_for_yandex' => array(
        'title' => 'Метатег "yandex" для мусорных страниц:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="yandex" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="yandex" content="noindex" />',
			),
		),
    ),
	'page_with_other_params_for_googlebot' => array(
        'title' => 'Метатег "googlebot" для мусорных страниц:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="googlebot" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="googlebot" content="noindex" />',
			),
		),
    ),
	
	
	'page_productreview_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Страницы отзывов о товарах',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">Тег будет выведен на страницах отзывов о товарах, на которых имеется хотя бы 1 отзыв. Страницы отзывов о товарах, на которых нет ни одного отзыва, опеределяются как мусорные страницы.</span>
				<span class="xmp1_info">На страницах отзывов о скрытых товарах будет выведен метатаг, указанный для страниц скрытых товара, при его наличии.</span>
				<span class="xmp2_info">Если стандартный url страницы отзыва вида "/reviews/" изменен на любой другой (с помощью сторонних плагинов или доработкой движка), то настройки к таким страницам применяться не будут.</span>
			</div>
		',
	),
	'page_productreview_for_robots' => array(
        'title' => 'Метатег "robots" для страниц отзывов о товарах:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="robots" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="robots" content="noindex" />',
			),
		),
    ),
	'page_productreview_for_yandex' => array(
        'title' => 'Метатег "yandex" для страниц отзывов о товарах:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="yandex" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="yandex" content="noindex" />',
			),
		),
    ),
	'page_productreview_for_googlebot' => array(
        'title' => 'Метатег "googlebot" для страниц отзывов о товарах:',
        'control_type' => waHtmlControl::SELECT,
		'options' => array(
			array(
				'value' => 'disabled',
				'title' => 'Не выводить',
			),
			array(
				'value' => 'noindex, nofollow',
				'title' => '<meta name="googlebot" content="noindex, nofollow" />',
			),
			array(
				'value' => 'noindex',
				'title' => '<meta name="googlebot" content="noindex" />',
			),
		),
    ),
	
	
	'need_notice_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Режим тестирования',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">При включении режима тестирования на витрине сайта на каждой из перечисленных выше страниц выводится блок-уведомление "Тестирование плагина «SEO Meta Robots»".</span>
				<span class="xmp1_info">Блок-уведомление выводится только для авторизованных администраторов интернет-магазина.</span>
				<span class="xmp1_info">Блок-уведомление не выводится на мобильных устройствах.</span>
			</div>
		',
	),
	'need_notice' => array(
        'title' => 'Режим тестирования:',
		'control_type' => waHtmlControl::CHECKBOX,
    ),
	
	
	'alt_hooks_title' => array(
		'control_type' => waHtmlControl::TITLE,
		'value' => 'Способ вывода тега',
		'description' => '
			<div class="hint_code_info">
				<span class="xmp1_info">Если в вашей теме дизайна хук "frontend_head" не выводится или выводится в нестандартном месте (например, в теле тега "body", а не в тега "head") - используйте для вывода тега хелпер.</span>
				<span class="xmp2_info">В 99% случаев применять хелпер нет необходимости.</span>
				<span class="xmp3_info">Наличие/отсутствие других хуков в теме дизайна на работу плагина влияния не оказывает.</span>
			</div>
		',
	),
	'need_alt_frontend_head' => array(
        'title' => 'Использование хука "frontend_head" для работы плагина',	
        'control_type' => waHtmlControl::SELECT,
		'description' => 'Хелпер: <span class="chikurov-seo_hint">{shopMetarobotsPlugin::altFrontendHead()}</span>',
		'options' => array(
			array(
				'value' => '0',
				'title' => 'Использовать хук',
			),
			array(
				'value' => '1',
				'title' => 'Использовать хелпер',
			),
		),
    ),
);