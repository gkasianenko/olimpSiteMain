(function ($) {
	// js controller
	$.email = {
		// init js controller
		init: function () {

			$("#add-new-records").click(function () {
				$.email.recordsAdd();
				return false;
			})

			$("#mail").live('submit', function () {
				var f = $(this);
				$.email.mailSave(f);
				return false;
			})
			$("#content-save").live('submit', function () {
				var f = $(this);
				$.email.contentSave(f);
				return false;
			})
			if (typeof($.History) != "undefined") {
				$.History.bind(function () {
					$.email.dispatch();
				});
			}

			var hash = window.location.hash;
			if (hash === '#/' || !hash) {
				$.email.dispatch();
			}
		},
		// dispatch call method by hash
		dispatch: function (hash) {
			if (hash === undefined) {
				hash = location.hash.replace(/^[^#]*#\/*/, '');
			}
			if (hash) {
				// clear hash
				hash = hash.replace(/^.*#/, '');
				hash = hash.split('/');
				if (hash[0]) {
					var actionName = "";
					var attrMarker = hash.length;
					for (var i = 0; i < hash.length; i++) {
						var h = hash[i];
						if (i < 2) {
							if (i === 0) {
								actionName = h;

							//} else if (parseInt(h, 10) != h) {
							//	actionName += h.substr(0,1).toUpperCase() + h.substr(1);
							} else {
								attrMarker = i;
								break;
							}
						} else {
							attrMarker = i;
							break;
						}
					}
					var attr = hash.slice(attrMarker);
					// call action if it exists
					if (this[actionName + 'Action']) {
						this.currentAction = actionName;
						this.currentActionAttr = attr;
						this[actionName + 'Action'](attr);
					} else {
						if (console) {
							console.log('Invalid action name:', actionName+'Action');
						}
					}
				} else {
					// call default action
					this.defaultAction();
				}
			} else {
				// call default action
				this.defaultAction();
			}
			$("ul.menu-v.s-domains-tree li.selected").removeClass('selected');
			$("#sb-all-contacts-li").removeClass('selected');
			if (!attr) {
				$("#sb-all-contacts-li").addClass('selected');
			} else {
				if ( actionName  === "domains") {
					var a = $("ul.menu-v.s-domains-tree li a[href='#/domains/" + attr[0] + "/']");
					a.parent().addClass('selected');
				} else if (actionName  === "mail") {
					if( '-1' != attr[0].indexOf('@')) {
						//alert(attr[0].indexOf('@'));
						var nam = attr[0].indexOf('@') +1;
						var dom = attr[0].substring(nam);
					} else {
						var dom = attr[0];
					}
					var a = $("ul.menu-v.s-domains-tree li a[href='#/domains/" + dom + "/']");
					a.parent().addClass('selected');
				}
			}

		},

		defaultAction: function () {
			$("#content").load('?action=records');
		},

		domainsAction: function (params) {
			$("#content").load('?action=records&domains='+params[0]);
		},

		recordAction: function (params) {
			$.get('?action=record', {id: params[0]}, function (response) {
				if (response.status == 'ok') {
					var html = '<div class="block">' +
					'<h1 class="wa-page-heading">' + response.data.title + '</h1>' +
					'</div><div class="block padded">' + response.data.content + '</div>';
					$("#content").html(html);
				} else {
					alert(response.errors);
				}
			}, 'json');
		},

		recordsAdd: function () {
			$('#dialog-action').waDialog({
				onSubmit: function (d) {
					var f = $(this);
					$.post("?action=DomenAdd", f.serialize(), function (response) {
						if (response.status === 'ok') {
							window.location.href = response.data.url;
							jQuery(".dialog:visible").trigger('esc');
							$(this).remove();
		                } else {
		                	alert(response.errors.meseg);
		                }
					}, 'json');
					return false;
				},
				'buttons': '<input type="submit" class="button green" value="' + $_("Add") + '" /> ' + $_("or") + '<a href="javascript:void(0)" class="inline-link cancel"><b><i> ' + $_("cancel") + '</i></b></a>',
                url:"?action=mailAdd",
                onClose: function (d) {
                	$(this).remove();
                },
			});
		},

		mailAction: function (params) {
			$.get('?action=mail', {email: params[0]}, function (response) {
				$("#content").html(response);
			});
		},

		mailSave: function (params) {
			var f = params.serialize();
			$('.mail-content .loading').show();
			$.post("?action=MailSave", f, function (response) {
				if (response.status == 'ok') {
					$("#s-settings-form-status").show();
                	setTimeout('$("#s-settings-form-status").hide(1000)', 2000);
                	if(response.data.check){
                		alert(response.data.check);
                	}
				} else {
                    alert(response.errors);
                }
                $('.mail-content .loading').hide();
			}, 'json');
		},
		contentSave: function (params) {
			var f = params.serialize();
			$('.mail-content .loading').show();
			$.post("?module=settings&action=save", f, function (response) {
				if (response.status == 'ok') {
					$("#s-settings-form-status").show();
                	setTimeout('$("#s-settings-form-status").hide(1000)', 2000);
                	if(response.data.check){
                		alert(response.data.check);
                	}
				} else {
                    alert(response.errors);
                }
                $('.mail-content .loading').hide();
			}, 'json');
		},
		historyAction: function(params){
			$("#content").load('?action=history');
		},
		notificationsAction: function(params){
			$("#content").load('?action=notifications');
		},
		sendAction: function(params){
			$("#content").load('?action=send');
		},
	}
})(jQuery);
