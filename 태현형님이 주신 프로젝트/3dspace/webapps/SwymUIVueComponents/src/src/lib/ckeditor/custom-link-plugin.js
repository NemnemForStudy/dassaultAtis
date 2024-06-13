// Inspired by DS/SwymUIComponents/script/lib/ckeditor/customlink/dialogs/customlink

export default function addCustomLinkDialog() {
  CKEDITOR.dialog.add('customlinkDialog', (editor) => {
    // This method is invoked once a user clicks the OK button, confirming the dialog.
    const onOk = function () {
      // Create a link element and an object that will store the data entered in the dialog window.
      const dialog = this.getDialog();
      const matches = null;
      const data = {
        desc: dialog.getValueOf('linkBuilder', 'desc').trim(),
        url: dialog.getValueOf('linkBuilder', 'url').trim(),
      };
      const link = editor.document.createElement('a');

      const regex = new RegExp(
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/,
      );

      if (!regex.test(data.url)) {
        alert('Please check your URL');
        return false;
      }

      if (!data.desc) {
        alert('The description field cannot be empty!');
        return false;
      }

      if (!data.url) {
        alert('The URL field cannot be empty');
        return false;
      }

      // Always external link
      link.setHtml(data.desc);
      link.setAttribute('href', data.url);
      link.setAttribute('data-type', 'external');

      // Insert the link element into the current cursor position in the editor.
      if (editor.customLink) {
        editor.customLink.outerHTML = link.$.outerHTML;
      } else {
        editor.insertElement(link);
      }

      dialog.hide();
    };
    const onCancel = function (event) {
      const dialog = this.getDialog();
      dialog.hide();
    };

    return {
      // Basic properties of the dialog window: title, minimum size.
      title: 'Link properties',
      minWidth: 400,
      minHeight: 100,
      resizable: false,
      // Dialog window contents definition.
      contents: [
        {
          id: 'linkBuilder',
          elements: [
            {
              type: 'text',
              id: 'desc',
              label: 'Description',
            },
            {
              type: 'text',
              id: 'url',
              label: 'URL',
            },
          ],
        },
      ],
      buttons: [
        {
          type: 'button',
          className: 'cke_dialog_ui_button_ok',
          label: 'OK',
          title: 'OK',
          onClick() {
            onOk.apply(this);
          },
        },
        {
          type: 'button',
          className: 'cancel-button-link-properties',
          label: 'Cancel',
          title: 'Cancel',
          onClick() {
            onCancel.apply(this);
          },
        },
      ],

      onShow() {
        const editor = this.getParentEditor();
        const selection = editor.getSelection();
        let element = null;
        const plugin = CKEDITOR.plugins.link;
        let elementHTML;
        if ((element = plugin.getSelectedLink(editor)) && element.getName() === 'a') {
          // Don't change selection if some element is already selected.
          // For example - don't destroy fake selection.
          if (!selection.getSelectedElement()) selection.selectElement(element);
        } else if (editor.customLink) {
          element = editor.customLink;
        } else if (selection.getStartElement() && selection.getStartElement().getName() === 'a') {
          element = selection.getStartElement();
        } else {
          element = null;
        }

        if (element) {
          if (element.getHtml) {
            elementHTML = element.getHtml();
          } else {
            elementHTML = element.getHTML();
            if (elementHTML === '') {
              elementHTML = element.outerHTML;
            }
          }

          if (editor.customLink) {
            this.setValueOf('linkBuilder', 'desc', elementHTML);
          }

          if (element.hasAttribute('data-content-id')) {
            this.setValueOf('linkBuilder', 'url', linkToDisplay);
            this.setValueOf('linkBuilder', 'desc', elementHTML);
          } else {
            this.setValueOf('linkBuilder', 'desc', elementHTML || element.getAttribute('href'));
            this.setValueOf('linkBuilder', 'url', element.getAttribute('url') || element.getAttribute('href'));
          }
        } else if (selection.getSelectedText()) {
          this.setValueOf('linkBuilder', 'desc', selection.getSelectedText());
        }
      },

      onHide() {
        const editor = this.getParentEditor();
        if (editor.customLink) {
          delete editor.customLink;
          this.getContentElement('linkBuilder', 'desc').getElement().show();
          this.getContentElement('linkBuilder', 'desc').getElement().show();
        }
      },
    };
  });
}
