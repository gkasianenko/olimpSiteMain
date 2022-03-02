$( document ).ready(function(){

	var $plugin_id = false;
	$('#plugin_docs_plugin_id').each(function() {
		$plugin_id = $( this ).html();
	});

	var $plugin_version = false;
	$('#plugin_docs_plugin_version').each(function() {
		$plugin_version = $( this ).html();
	});

	fieldAddClass(); //добавление классов полям настроек
	fieldsBlockAddWrap(); //добавление обертки полям настроек по блокам
	fieldsBlockClicking(); //скрытие и показ блоков по клику на навигацию
	addLabel(); //добавление label ко всем чекбоксам
	hideShowSettings(); //скрытие и показ "зависимых настроек в зависимости от того включена ли основная настройка
	defaultValue(); //скрытие тега "xmp" с классом "default_value" и добавление кнопки
	settingDocsLink($plugin_id); //скрытие тега "xmp" с классом "setting_docs_link" и добавление ссылки на документацию с Get-параметром
	colorSelect(); //подключением библиотеки для вывода блока с выбором цвета
	enabled(); //скрытие всех настроек при статусе плагина "Отключен"

	settingsImport($plugin_id); //импорт настроек
	settingsExport($plugin_id); //экспорт настроек
	addUpScrollButton(); //добавление кнопки скролла наверх
	docs_generator(); //автоматизация документации

	lastsave_version($plugin_version); //выделение настроек из новой версии плагина

});

function fieldAddClass() {

	$( '#wa-plugins-content #plugins-settings-form .field .value [name]').each(function( index ) {

		var $type = '';

		if ($( this).hasClass('title')) {
			$type = 'title';
		}
		if ($( this).hasClass('checkbox')) {
			$type = 'checkbox';
		}
		if ($( this).hasClass('textarea')) {
			$type = 'textarea';
		}
		if ($( this).hasClass('input')) {
			$type = 'input';
		}
		if ($( this).hasClass('input')) {
			$type = 'input';
		}
		if ($( this).hasClass('select')) {
			$type = 'select';
		}

		$( this ).parent().parent().addClass(`field_${$type}`);
	});

	$( '#wa-plugins-content #plugins-settings-form .field:last-child').each(function( index ) {
		$( this ).addClass('field_savebutton');
	});

	$( '#wa-plugins-content #plugins-settings-form .field .value .hint .plugin_docs').each(function( index ) {
		$( this ).parent().parent().parent().addClass('field_plugindocs');
	});

	$( '#wa-plugins-content #plugins-settings-form .field .value [name*="[enabled]"]').each(function( index ) {
		$( this ).parent().parent().addClass('field_enabled');
	});

	$( '#wa-plugins-content #plugins-settings-form .field .value [name*="[enabled_title]"]').each(function( index ) {
		$( this ).parent().parent().addClass('field_enabledtitle');
	});

	$( '#wa-plugins-content #plugins-settings-form .field .value [name*="[import_title]"]').each(function( index ) {
		$( this ).parent().parent().addClass('field_importtitle');
	});

	$( '#wa-plugins-content #plugins-settings-form .field .value [name*="[export_title]"]').each(function( index ) {
		$( this ).parent().parent().addClass('field_exporttitle');
	});

}

function fieldsBlockAddWrap() {

	//объявляем селекторы, которые нам понадобятся несколько раз
	$field_title_selector = '#wa-plugins-content #plugins-settings-form .field:not(.field_plugindocs):not(.field_enabledtitle):not(.field_enabledtitle):not(.field_importtitle):not(.field_exporttitle).field_title.field_title';
	$field_selector = '#wa-plugins-content #plugins-settings-form .field';
	$fieldblock_selector = '#wa-plugins-content #plugins-settings-form .field[block]';

	//добавляем атрибут "block" заголовкам блоков
	$( $field_title_selector ).each(function(index) {
		$index = index + 1;
		$( this ).attr('block', $index);
	});

	//добавляем атрибут "block" оставшимся элементам блоков
	var $fieldsblock_x = false;
	$( $field_selector ).each(function(index) {
		var $attr = $( this ).attr('block');
		if ($attr) {
			$fieldsblock_x = $attr;
		} else {
			if ($fieldsblock_x) {
				$( this ).attr('block', $fieldsblock_x);
			}
		}
	});

	//оборачиваем каждый блок
	var $count = $( $fieldblock_selector + ':last-child' ).attr('block');
	for (var i = 1; i <= $count; i++) {
		$( `#wa-plugins-content #plugins-settings-form .field[block="${i}"]` ).wrapAll(`<div class="fieldsblock" fieldsblock="${i}">`);
	}

	//создаем блок с навигацией и блок с контентом (который содержит блоки)
	$( '#wa-plugins-content #plugins-settings-form .fieldsblock' ).wrapAll('<div class="settings_content settings_wrap_child">');
	$( '.settings_content' ).before('<div class="settings_nav settings_wrap_child"><ul class="tabs"></ul></div>');
	$( '#wa-plugins-content #plugins-settings-form .settings_wrap_child' ).wrapAll('<div class="settings_wrap">');

	//выдергиваем и возвращаем на базу кнопку сохранения настроек
	$( '#wa-plugins-content #plugins-settings-form .settings_wrap' ).append($( '#wa-plugins-content #plugins-settings-form .fieldsblock .field_savebutton' ));

	//наполняем блок с навигацией
	$( '#wa-plugins-content #plugins-settings-form .fieldsblock .field_title .title' ).each(function (index) {
		$fixindex = index+1;
		$title_html = $( this ).html();
		$( '#wa-plugins-content #plugins-settings-form .settings_nav ul' ).append(`<li showfieldsblock="${$fixindex}"><span>${$title_html}</span></li>`);
	});
}

function fieldsBlockClicking() {

	//включаем по умолчанию 1-й блок настроек
	$( '#wa-plugins-content #plugins-settings-form .settings_nav ul li' ).first().addClass('selected');
	$( '#wa-plugins-content #plugins-settings-form .settings_content .fieldsblock[fieldsblock="1"]' ).css('display','block');
	$( '#wa-plugins-content #plugins-settings-form .settings_content .fieldsblock[fieldsblock="1"]' ).siblings().css('display','none');

	//меняем блоки настроек при клике на навигацию
	$( '#wa-plugins-content #plugins-settings-form .settings_nav ul li span' ).click(function (index) {
		if (!$( this ).parent().hasClass('selected')) {
			$( this ).parent().siblings().removeClass('selected');
			$( this ).parent().addClass('selected');
			$fieldsblock_number = $( this ).parent().attr( 'showfieldsblock' );
			$( `#wa-plugins-content #plugins-settings-form .settings_content .fieldsblock[fieldsblock="${$fieldsblock_number}"]` ).css('display','block');
			$( `#wa-plugins-content #plugins-settings-form .settings_content .fieldsblock[fieldsblock="${$fieldsblock_number}"]` ).siblings().css('display','none');
		}
	});
}

function addLabel() {
	$( '#wa-plugins-content #plugins-settings-form .field .value input[type="checkbox"]' ).each(function(index) {
		$checkbox_id = $( this ).attr('id');
		$( this ).after(`<label for="${$checkbox_id}"></label>`);
	});
}

function hideShowSettings() {


	// "Зависимая настройка" - настройка, показ которой зависит от того, включена ли "Основная настройка"
	// "Основная настройка" - та, на которую ссылается "Зависимая настройка" в классе элемента
	// пример: если у элемента есть класс "mainsetting-test_order", значит от - зависимый, а его "Основная настройка" - это настройка с id "test_order"



	//находим все зависимые настройки
	$( '#wa-plugins-content #plugins-settings-form .field .value [class*="mainsetting-"]' ).each(function( index ) {

		//вычленяем нужный фрагмент из класса
		var $class = $( this ).attr('class');
		var $regex = /(mainsetting-)([^\s]+)/gi;
		var $result = $class.match($regex);
		var $mainsetting_id = $result[0].replace('mainsetting-', '');

		//передаем атрибут всей строке
		$( this ).parent().parent().attr('mainsetting', $mainsetting_id);
	});

	//находим все зависимые настройки (всю строку с настройкой)
	$( '#wa-plugins-content #plugins-settings-form .field[mainsetting]' ).each(function( index ) {

		//получаем значение главной настройки
		var $mainsetting_id = $( this ).attr('mainsetting');
		var $mainsetting_selector = `#wa-plugins-content #plugins-settings-form .field .value [name*="[${$mainsetting_id}]"]`;
		var $mainsetting_val = $( `${$mainsetting_selector}` ).val();

		//сразу скрываем строку с зависимой настройкой, если основная настройка отключена
		if ($mainsetting_val == 0) {

			//костыль для JS (чтобы скрытие работало корректно)
			$mainsetting_val = false;
		}

		if ($( `${$mainsetting_selector}` )[0].tagName == 'INPUT' && $( `${$mainsetting_selector}` ).attr('type') == 'checkbox') {
			if (!$( `${$mainsetting_selector}` ).is(':checked')) {

				//костыль для чекбокса (чтобы скрытие работало корректно)
				$mainsetting_val = false;
			}
		}
		if (!$mainsetting_val) {
			$( this ).addClass("displaynone");
		}

		//на всякий случай, проверяем существует ли основная настройка. Если вдруг нет - показываем строку обратно и выводим предупреждение
		if (!$( `${$mainsetting_selector}` ).length > 0) {
			$( this ).removeClass("displaynone");
			$( this ).css('border','2px solid red');
			$( this ).attr('title','Внимание разработчику! Для данной данной настройки в settings.php указана основная настройка, но она не найдена на странице!');
		}

		//назначаем основной настройке атрибут
		$( `${$mainsetting_selector}` ).attr('is_mainsetting', '');

		//назначаем родителю основной настройки атрибут
		$( `${$mainsetting_selector}` ).parent().parent().attr('is_wrap_of_mainsetting', '');
	});

	//находим все главные настройки
	$( `#wa-plugins-content #plugins-settings-form .field .value [is_mainsetting]` ).change(function() {

		//получаем id основной настройки
		var $name = $( this ).attr('name');
		var $regex = /(\[)([^\s]+)(\])/gi;
		var $result = $name.match($regex);
		var $mainsetting_id = $result[0].replace('[', '').replace(']', '');
		var $mainsetting_selector = `#wa-plugins-content #plugins-settings-form .field[mainsetting="${$mainsetting_id}"]`;

		//скрываем или показываем строку с зависимой настройку каждый раз, когда пользователь меняет значение главной настройки
		if ($( this )[0].tagName == 'INPUT' && $( this ).attr('type') == 'checkbox') {
			if (!$(this).is(':checked')) {
				$( `${$mainsetting_selector}` ).addClass("displaynone");
			} else {
				$( `${$mainsetting_selector}` ).removeClass("displaynone");
			}
		} else {
			if ($( this ).val() == 0) {
				$( `${$mainsetting_selector}` ).addClass("displaynone");
			} else {
				$( `${$mainsetting_selector}` ).removeClass("displaynone");
			}
		}
	});


	//оборачиваем группу из нескольких зависимых харакетристик (велосипед какой-то, но вроде едет)
	var $mainsetting_attr_arr = [];
	$( 'html body #wa-plugins-content #plugins-settings-form .fieldsblock' ).each(function() {
		$mainsetting_arr = $( this ).children( '.field[mainsetting]' );
		if ($mainsetting_arr) {
			$.each($mainsetting_arr, function(index, value) {
				$attr = $( this ).attr('mainsetting');
				if ($mainsetting_attr_arr.indexOf( $attr ) == -1 ) {
					$mainsetting_attr_arr.push($attr);
				}
			});
		}
	});
	$.each($mainsetting_attr_arr, function(index, value) {
		$( `html body #wa-plugins-content #plugins-settings-form .fieldsblock .field[mainsetting="${value}"]` ).wrapAll('<div class="mainsetting_childs">');
	});
}

function defaultValue() {

	var $default_values_html = [];

	$( '#wa-plugins-content #plugins-settings-form .field .value' ).each(function( index ) {

		//проверяем наличие xmp в описании настройки
		if ($( this ).find('.hint xmp.default_value').length > 0) {

			//скрываем xmp
			$( this ).find('.hint xmp.default_value').hide();

			//сохраняем значение xmp
			$default_values_html[index] = $( this ).find('.hint xmp.default_value').html();

			//создаем кнопку восстановления default value и записываем в нее значение xmp
			$( this ).find('[name]').after(`<div><span class="set_default_value button purple">вернуть дефолтное значение</span></div>`);

			//создаем обработчик кнопки
			$( this ).find('.set_default_value').click(function() {

				if ($( this ).parent().parent().find('[name]').val() == $default_values_html[index]) {
					alert('Дефолтное значение итак уже установлено.');
				} else{
					var result = confirm('Будет установлено дефолтное значение:\n\n"' + $default_values_html[index] + '"\n\nПодтвердите действие.');
					if (result) {
						$( this ).parent().parent().find('[name]').val($default_values_html[index]);
					}
				}
			});
		}
	});
}

function settingDocsLink($plugin_id) {

	$docs_link = false;

	$( '#wa-plugins-content #plugins-settings-form .field .value .hint #plugin_docs_plugin_docs_link' ).each(function() {
		if ($plugin_id) {
			$docs_attr_href = $( this ).find('a').attr('href');
			if ($docs_attr_href) {
				$docs_link = $docs_attr_href;
			}
		}
	});

	if ($docs_link) {
		$( '#wa-plugins-content #plugins-settings-form .field .value .hint .setting_docs_link' ).each(function() {
			$setting_attr_name = $( this ).parents('div.value').find('[name]').attr('name');
			if ($setting_attr_name) {
				var $regex = /\[([^\s]+)\]/;
				var $setting_id_arr = $setting_attr_name.match($regex);
				if ($setting_id_arr[0]) {
					var $setting_id = $setting_id_arr[0].replace('[','').replace(']','');
					if ($setting_id) {
						$( this ).html(`<a href="${$docs_link}?setting_info=${$setting_id}" target="_blank">>> Подробнее в документации</a>`);
					}
				}
			}
		});
	}
}

function colorSelect() {

	var inputs = [];
	$( '#wa-plugins-content #plugins-settings-form .field .value .is_color_input' ).each(function( index ) {

		inputs[index] = $ (this);

		var replacer = $('<span class="color_icon">' +
			'<i class="icon16 color" style="background: #' + inputs[index].val().substr(1) + '"></i>' +
			'</span>').insertAfter(inputs[index]);
		var picker = $('<div class="displaynone color_picker"></div>').insertAfter(replacer);
		var farbtastic = $.farbtastic(picker, function (color) {
			replacer.find('i').css('background', color);
			inputs[index].val(color);
		});
		farbtastic.setColor('#' + inputs[index].val());
		replacer.click(function () {
			picker.slideToggle(200);
			return false;
		});

		var timer_id;
		inputs[index].unbind('keydown').bind('keydown', function () {
			if (timer_id) {
				clearTimeout(timer_id);
			}
			timer_id = setTimeout(function () {
				farbtastic.setColor(inputs[index].val());
			}, 250);
		});

		inputs[index].change(function () {
			farbtastic.setColor(inputs[index].val());
		});

		$( this ).siblings('div').find('.set_default_value').click(function() {
			farbtastic.setColor(inputs[index].val());
		});
	});

	$( '#wa-plugins-content #plugins-settings-form .field .value .color_icon' ).click(function() {

		//скрываем другие такие же блоки (если они вдруг активны)
		$( '#wa-plugins-content #plugins-settings-form .field .value .color_picker' ).each(function( index ) {
			$( this ).addClass('displaynone');
		});

		//отображаем блок с выбором цвета
		$( this ).siblings('.color_picker').removeClass('displaynone');

	});
}

function enabled() {

	$( '#wa-plugins-content #plugins-settings-form .field .value [name*="[enabled]"]' ).each(function( index ) {

		var $all_settings_selector = '#wa-plugins-content #plugins-settings-form .field:not(.field_plugindocs):not(.field_enabled):not(.field_enabledtitle):not(.field_savebutton):not(.field_importtitle):not(.field_exporttitle)';

		if (!$( this ).val() || $( this ).val() == 0) {
			hideAllSettings($all_settings_selector);
		} else {
			showAllSettings($all_settings_selector);
		}

		$( this ).change(function() {
			if (!$( this ).val() || $( this ).val()== 0) {
				hideAllSettings($all_settings_selector);
			} else {
				showAllSettings($all_settings_selector);
			}
		});
	});

	$( '#wa-plugins-content #plugins-settings-form .field.field_enabledtitle' ).each(function (index) {
		$( this ).addClass('enabled_wrap_child');
	});

	$( '#wa-plugins-content #plugins-settings-form .field.field_enabled' ).each(function (index) {
		$( this ).addClass('enabled_wrap_child');
	});

	$( '#wa-plugins-content #plugins-settings-form .field.enabled_wrap_child' ).wrapAll('<div class="enabled_wrap">');

	$( '#wa-plugins-content #plugins-settings-form .enabled_wrap' ).each(function (index) {
		$( this ).addClass('flex_wrap_child');
	});

	$( '#wa-plugins-content #plugins-settings-form .field_importtitle' ).each(function (index) {
		$( this ).addClass('flex_wrap_child');
	});

	$( '#wa-plugins-content #plugins-settings-form .field_exporttitle' ).each(function (index) {
		$( this ).addClass('flex_wrap_child');
	});

	$( '#wa-plugins-content #plugins-settings-form .flex_wrap_child' ).wrapAll('<div class="flex_wrap">');


}

function hideAllSettings($all_settings_selector) {
	$( $all_settings_selector ).each(function( index ) {
		$( this ).css( "display", "none" );
	});

	$( '#wa-plugins-content #plugins-settings-form .settings_nav' ).each(function( index ) {
		$( this ).css( "display", "none" );
	});

	$( '#wa-plugins-content #plugins-settings-form .settings_content' ).each(function( index ) {
		$( this ).css( "display", "none" );
	});
}

function showAllSettings($all_settings_selector) {
	$( $all_settings_selector ).each(function( index ) {
		$( this ).css( "display", "flex" );
	});

	$( '#wa-plugins-content #plugins-settings-form .settings_nav' ).each(function( index ) {
		$( this ).css( "display", "block" );
	});

	$( '#wa-plugins-content #plugins-settings-form .settings_content' ).each(function( index ) {
		$( this ).css( "display", "block" );
	});
}

function settingsImport($plugin_id) {

	$( '#wa-plugins-content #plugins-settings-form .field .value .settings_import' ).each(function( index ) {
		$( this ).click(function() {
			var is_confirm = confirm('Вы действительно хотите импортировать настройки?');
			if (is_confirm) {
				result = prompt('Вставьте в это поле дамп настроек плагина и подтвердите действие.', '');
				if (result) {

					//проверяем первую строчку дампа
					var $regex = /(\/plugins\/)([^\s]+)(\/lib\/)/gi;
					var $dump_plugin_id_arr = result.match($regex);
					if ($dump_plugin_id_arr) {

						//проверяем соответствие ID плагина и дампа настроек
						var $dump_plugin_id = $dump_plugin_id_arr[0].replace('/plugins/', '').replace('/lib/', '')
						if ($dump_plugin_id == $plugin_id) {

							if (result.indexOf(' => ') !== -1) {
								var arr = result.split('  ');

								$.each(arr, function(arr_key, arr_val) {
									if (arr_val.indexOf(' => ') !== -1) {

										var setting = arr_val.split(' => ');
										$.each(setting, function(setting_key, setting_val) {
											if (setting_key == 0) {

												//получаем ID настройки
												$setting_id = setting_val.replace(/'/gi, '');
											}
											if (setting_key == 1) {

												//получаем значение настройки
												$setting_value = setting_val.replace(/',/gi, '').replace(/'/gi, '').replace(/\r?\n/g, '');

												//находим на странице настройку и записываем в нее значение:
												$setting_selector = `#wa-plugins-content #plugins-settings-form .field .value [name*="[${$setting_id}]"]`;

												//console.log('настройка: ' + $setting_id + ', значение: ' + $setting_value);

												$( $setting_selector ).each(function() {

													//console.log('нашли настройку: ' + $setting_id);
													if ($( this).hasClass('checkbox')) {
														if ($setting_value == 1) {

															//console.log('меняем чекбокс ' + $setting_id + ' - ставим checked');
															$( this ).attr("checked","checked").trigger('change');
														} else if ($setting_value == 0) {

															//console.log('меняем чекбокс ' + $setting_id + ' - убираем checked');
															$( this ).removeAttr("checked").trigger('change');
														}
													}
													if ($( this).hasClass('textarea')) {

														//console.log('меняем textarea ' + $setting_id + ' - ставим html: ' + $setting_value);
														$( this ).html($setting_value).trigger('change');
													}
													if ($( this).hasClass('input')) {

														//console.log('меняем input ' + $setting_id + ' - ставим val: ' + $setting_value);
														$( this ).val($setting_value).trigger('change');
													}
													if ($( this).hasClass('select')) {

														//console.log('меняем select ' + $setting_id + ' - ставим option ' + $setting_value + ': selected');
														if ($( this ).find(`option[value="${$setting_value}"]`).length > 0) {
															$( this ).find('option[selected]').removeAttr('selected');
															$( this ).find(`option[value="${$setting_value}"]`).attr('selected', 'selected');
															$( this ).trigger('change');
														}
													}
												});
											}
										});
									}
								});
								alert('Настройки импортированы. Проверьте их корректность. На забудьте сохранить изменения - настройки еще не сохранены.');
							} else {
								alert('Ошибка 665. В отправленной форме не найдено ни одной настройки. Вы точно вставили дамп настроек плагина и не редактировали его? Пожалуйста, ознакомьтесь с документацией к плагину.');
							}
						} else {
							alert(`Ошибка 664. ID текущего плагина и ID плагина из дампа настроек не совпадают. Вы точно вставили дамп настроек плагина ${$plugin_id}?`);
						}
					} else {
						alert('Ошибка 663. В отправленной форме не найдено первой строчки, в которой проверяется ID плагина. Вы точно вставили дамп настроек плагина и не редактировали его? Пожалуйста, ознакомьтесь с документацией к плагину.');
					}
				}
			}
		});
	});
}

function settingsExport($plugin_id) {
	$( '#wa-plugins-content #plugins-settings-form .field .value .settings_export' ).each(function( index ) {
		$( this ).click(function() {
			if ($plugin_id) {
				var is_confirm = confirm('Вы действительно хотите экспортировать настройки?');
				if (is_confirm) {
					alert('Сейчас вы будете переадресованы на страницу с дампом настроек плагина. Скопируйте дамп - он понадобится для дальнейшего импорта. ');
					window.open(`?shop_${$plugin_id}_settings=1`, '_blank');
				}
			} else {
				alert('Ошибка. Не удалось получить ID плагина. Обратитесь в техническую поддержку плагина.');
			}
		});
	});
}

function addUpScrollButton() {
	if ($( '.flex_wrap' ).length > 0) {
		$( '.field_savebutton' ).each(function() {
			$( this ).after('<div class="up_scroll_button_wrap"><span class="up_scroll_button">↑</span></div>');
		});

		$('.up_scroll_button_wrap').click(function(){
			$('html, body').animate({
					scrollTop: $('.flex_wrap').offset().top
				}, 350
			);
		});
	}
}

function docs_generator() {
	if ($('.field_savebutton input.button').length > 0) {
		$('.field_savebutton input.button').after('<span class="button green docs_generator_button">Сгенерировать документацию</span>');
	}
	$( '#wa-plugins-content h1' ).dblclick(function() {
		$('.docs_generator_button').each(function() {
			$( this ).show();
		});
	});

	$( '.docs_generator_button' ).click(function() {
		$docs_html = $('.settings_wrap').html();
		copytext($docs_html);
		alert('Документация вставлена в буфер обмена');
	});
}

function copytext(save) {
	var $tmp = $('<input>');
	$('body').append($tmp);
	$tmp.val(save).select();
	document.execCommand('copy');
	$tmp.remove();
}

function lastsave_version($plugin_version) {

	//получаем старое значение настройки
	$lastsave_version = $( '#wa-plugins-content #plugins-settings-form .field input[name*="lastsave_version"]' ).val();

	//подставляем в настройки актуальную версию плагина
	//скрываем field у скрытой настройки
	$('#wa-plugins-content #plugins-settings-form .field input[name*="lastsave_version"]').val($plugin_version).parent('.field').hide();

	if ($lastsave_version != 0) {

		//просматриваем настройки
		$('#wa-plugins-content #plugins-settings-form .field .value').each(function (index) {

			//проверяем наличие xmp.new_setting в описании настройки
			if ($(this).find('.hint xmp.new_setting').length > 0) {

				//скрываем xmp
				$(this).find('.hint xmp.new_setting').hide();

				//получаем значение xmp
				$setting_version = $(this).find('.hint xmp.new_setting').html();

				//сравниваем значения
				if ($setting_version > $lastsave_version) {

					//проверяем тип настройки
					if ($(this).find('*[name]').hasClass('select')) {
						$info_text_start = 'Данная настройка появилась (или обзавелась новыми опциями)';
					} else {
						$info_text_start = 'Данная настройка появилась';
					}

					//выводим бейдж на настройке
					$(this).parent('.field').find('.name label').after(`<div><div class="new_setting_wrap"><span class="new_setting_span_new">new!</span><span class="new_setting_span_version">${$setting_version}</span><span class="new_setting_question">?</span><div class="new_setting_info"><p>${$info_text_start} в версии плагина <b>${$setting_version}</b>.</p><p>Вы последний раз вносили изменения в настройки плагина в версии плагина <b>${$lastsave_version}</b>.</p><hr><p>После того как вы сохраните настройки плагина и перезагрузите страницу, бейджики "New!" исчезнут.</p></div></div></div>`);

					//выводим бейдж на основной настройке, если она есть
					$main_field = $(this).parents('#wa-plugins-content #plugins-settings-form .mainsetting_childs').siblings('.field[is_wrap_of_mainsetting]');
					if ($main_field.hasClass('has_new_settings')) {
						$new_settings_text = 'появились новые настройки';
					} else {
						$new_settings_text = 'появилась новая настройка';
					}
					if ($main_field.find('.new_setting_wrap_group').length > 0) {
						$main_field.find('.new_setting_wrap_group').remove();
					}
					$main_field.append(`<div class="new_setting_wrap new_setting_wrap_group"><span class="new_setting_span_new">new!</span><div class="new_setting_info"><p>В данной группе настроек ${$new_settings_text}!</div></div>`).addClass('has_new_settings');

					//выводим бейдж в главном меню настроек плагина
					$title_setting_number = $(this).parents('#wa-plugins-content #plugins-settings-form .fieldsblock').attr('fieldsblock');
					$title_element = $(`#wa-plugins-content #plugins-settings-form .settings_nav ul li[showfieldsblock="${$title_setting_number}"]`);
					if ($title_element.hasClass('has_new_settings')) {
						$new_child_settings_text = 'появились новые настройки';
					} else {
						$new_child_settings_text = 'появилась новая настройка';
					}
					if ($title_element.find('.new_setting_wrap').length > 0) {
						$title_element.find('.new_setting_wrap').remove();
					}
					$title_element.append(`<div class="new_setting_wrap"><span class="new_setting_span_new">new!</span><div class="new_setting_info"><p>В данном блоке настроек ${$new_child_settings_text}!</div></div>`).addClass('has_new_settings');
				}
			}
		});
	}
}