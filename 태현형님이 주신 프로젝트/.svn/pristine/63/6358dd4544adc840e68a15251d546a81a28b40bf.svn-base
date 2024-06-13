/*const utils = 	'DS/SwymUICore/script/utils/utils',
		'DS/WebappsUtils/WebappsUtils',
		'i18n!DS/SwymUIComponents/assets/nls/lib/ckeditor/highlight/highlight'

	function(Utils, WebappsUtils, Nls) {
		// Register the plugin within the editor.
		CKEDITOR.plugins.add('highlight', {
			// Register the icons.
			icons: 'highlight',

			style: {
				element: 'span',
				attributes: {
					class: 'marker'
				}
			},
			// The plugin initialization logic goes inside this method.
			init: function(editor) {
				var that = this;
				// Remove the "link" menu item in context menu (right click on a link)
				if (editor._.menuItems.link) {
					delete editor._.menuItems.link;
				}

				// Define an editor command that opens our dialog.
				editor.addCommand('highlight', {
					contextSensitive: true,
					exec: function(editor, resetOption) {
						//We are adding/removing style
						if (this.state === CKEDITOR.TRISTATE_ON) {
							editor.removeStyle(new CKEDITOR.style(that.style));
							this.setState(CKEDITOR.TRISTATE_OFF);
						} else {
							editor.applyStyle(new CKEDITOR.style(that.style));
						}
					},
					refresh: function(editor, path) {
						//we need to refresh options selected when the user change paragraph selection
						var range = editor.getSelection().getRanges()[0],
							currentNode = range.startContainer.$,
							notFound = true;
						while (
							currentNode.parentNode &&
							currentNode.parentNode.getAttribute &&
							currentNode.parentNode.getAttribute('id') !== editor.name &&
							notFound
						) {
							if (
								currentNode &&
								currentNode.nodeName === 'SPAN' &&
								currentNode.getAttribute('class') === 'marker'
							) {
								this.setState(CKEDITOR.TRISTATE_ON);
								notFound = false;
							} else {
								this.setState(CKEDITOR.TRISTATE_OFF);
							}
							currentNode = currentNode.parentNode;
						}
					}
				});

				// Create a toolbar button that executes the above command.
				editor.ui.addButton('Highlight', {
					// The text part of the button (if available) and tooptip.
					label: Nls.highlight,

					// The command to execute on click.
					command: 'highlight',

					// The button placement in the toolbar (toolbar group name).
					toolbar: 'basicstyles',

					icon: WebappsUtils.getWebappsBaseUrl() + 'SwymUIComponents/assets/ckeditor/highlight.png'
				});
			}
		});
	}
);*/
