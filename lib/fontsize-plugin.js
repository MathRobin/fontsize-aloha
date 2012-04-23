/**
 * fontsize
 * Aloha-Editor plugin
 *
 * @author Mathieu ROBIN
 * @link https://github.com/MathRobin/fontsize-aloha
 * @copyright BSD License
 * @version 1.0
 */
/*jslint devel: true, browser: true, sloppy: true, windows: true, white: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals define */
define(
	['aloha', 'aloha/jquery', 'aloha/plugin', 'aloha/floatingmenu', 'i18n!fontsize/nls/i18n'], function (Aloha, jQuery, Plugin, FloatingMenu, i18n) {
		"use strict";
		var GENTICS = window.GENTICS;

		return Plugin.create('fontsize', {
			languages : ['en', 'fr'],

			init : function () {
				var buttons = [],
					names = ['increase', 'decrease'],
					i = 0;
				FloatingMenu.createScope('Aloha.Font', 'Aloha.continuoustext');

				jQuery.each(names, function(index, value){
					buttons.push(new Aloha.ui.Button({
						"iconClass" : "GENTICS_button_" + value,
						"size" : "small",
						"tooltip" : i18n.t('button.font.' + value + '.tooltip'),
						"onclick": function () {
							if (Aloha.activeEditable) {
								Aloha.activeEditable.obj[0].focus();
							}

							var newSize,
								markup = jQuery('<span></span>'),
								rangeObject = Aloha.Selection.rangeObject,
								foundMarkup = rangeObject.findMarkup(function() {
									return (this.nodeName.toLowerCase() === markup.get(0).nodeName.toLowerCase());
								}, Aloha.activeEditable.obj);

							if (foundMarkup) {
								newSize = (parseInt(jQuery(foundMarkup).css('font-size'), 10) + (index === 0?1:-1)) + 'px';
								jQuery(foundMarkup).css('font-size', newSize);
							} else {
								GENTICS.Utils.Dom.addMarkup(rangeObject, markup);
							}

							rangeObject.select();
							return false;
						}
					}));
				});


				for (i = 0; i < names.length; i++) {
					FloatingMenu.addButton(
						"Aloha.continuoustext",
						buttons[i],
						i18n.t("floatingmenu.tab.fontformat"),
						1
					);
				}
			}
		});
	}
);