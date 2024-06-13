// Allowed tags
// To revise
const basicListOfAllowedContent = 'p;span(*);pre;a[!href];h1;h2;ul;li;ol;i;u;s;strong;blockquote;em;table[*]{*};caption;thead[*]{*};tbody[*]{*};th[*]{*};tr[*]{*};td[*]{*};br;figcaption;';

export const simpleFormattingEditorConfig = {
  extraAllowedContent: basicListOfAllowedContent,
  toolbar: [
    {
      name: 'paragraph',
      groups: ['paragraph', 'insert', 'document'],
      items: [
        'h1Command',
        'h2Command',
        'BulletedListCommand',
        'NumberedListCommand',
        'BlockquoteCommand',
        'formattedCommand',
        '-',
        'Outdent',
        'Indent',
        'AddCustomTable'
      ],
    },
    {
      name: 'basicstyles',
      groups: ['basicstyles', 'cleanup'],
      items: ['Bold', 'Italic', 'Underline', 'Strike', 'Highlight', '-', 'RemoveFormat'],
    },
    { name: 'links', items: ['CustomLink', 'Unlink'] },
  ],
  removePlugins: 'elementspath,resize',
  removeButtons: 'PasteFromWord',
  editorplaceholder: 'Start writing',
  extraPlugins: 'sticky,editorplaceholder,h1Style,h2Style,formattedStyle,BulletedListStyle,NumberedListStyle,BlockquoteStyle,highlight,customtable, customlink',
  copyFormatting_outerCursor: false,
  copyFormatting_allowedContexts: false,
  height: '680',
  ContextMenu: [],
};
const commandButtonList = {
  h1Style: {
    command: 'h1Command',
    toolbar: 'paragraph',
    label: 'Heading 1',
    style: 'h1',
    type: 'style',
  },
  h2Style: {
    command: 'h2Command',
    toolbar: 'paragraph',
    label: 'Heading 2',
    style: 'h2',
    type: 'style',
  },
  formattedStyle: {
    command: 'formattedCommand',
    toolbar: 'paragraph',
    label: 'Formatted Style',
    style: 'pre',
    type: 'style',
  },
  BulletedListStyle: {
    command: 'BulletedListCommand',
    toolbar: 'paragraph',
    ckCommand: 'bulletedlist',
    label: 'Insert/Remove Bulleted List',
    style: 'ul',
    type: 'command',
  },
  NumberedListStyle: {
    command: 'NumberedListCommand',
    ckCommand: 'numberedlist',
    toolbar: 'paragraph',
    label: 'Insert/Remove Numbered List',
    style: 'ol',
    type: 'command',
  },
  BlockquoteStyle: {
    command: 'BlockquoteCommand',
    toolbar: 'paragraph',
    ckCommand: 'blockquote',
    label: 'Block Quote',
    style: 'blockquote',
    type: 'command',
  },
};
export function createCommand(CKEDITOR) {
  for (const key in commandButtonList) {
    CKEDITOR.plugins.add(key, {
      init(editor) {
        // Define an editor command
        editor.addCommand(commandButtonList[key].command, {
          contextSensitive: true,
          exec(editor, resetOption) {
            // Prevent combination
            if (!resetOption) {
              for (const index in editor.toolbar) {
                if (
                  editor.toolbar.hasOwnProperty(k)
                  && editor.toolbar[index].hasOwnProperty('name')
                  && editor.toolbar[index].hasOwnProperty('items')
                  && editor.toolbar[index].name === 'paragraph'
                ) {
                  const { items } = editor.toolbar[index];
                  for (const item in items) {
                    if (
                      items.hasOwnProperty(item)
                      && items[item].hasOwnProperty('type')
                      && items[item].type === 'button'
                      && items[item].getState() === CKEDITOR.TRISTATE_ON
                      && items[item].command !== commandButtonList[key].command
                    ) {
                      // we set true as second argument because we don't want to prevent combination again
                      // ( if not => infinite loop)
                      editor.execCommand(items[item].command, true);
                    }
                  }
                }
              }
            }
            // We are adding/removing text formatting/style
            if (this.state === CKEDITOR.TRISTATE_ON) {
              if (commandButtonList[key].type === 'command') {
                editor.execCommand(commandButtonList[key].ckCommand);
              } else {
                editor.removeStyle(new CKEDITOR.style({ element: commandButtonList[key].style }));
              }
              this.setState(CKEDITOR.TRISTATE_OFF);
            } else {
              if (commandButtonList[key].type === 'command') {
                editor.execCommand(commandButtonList[key].ckCommand);
              } else {
                editor.applyStyle(new CKEDITOR.style({ element: commandButtonList[key].style }));
              }
              this.setState(CKEDITOR.TRISTATE_ON);
            }
          },
          refresh(editor, path) {
            // we need to refresh options selected when the user change paragraph selection
            let nodeType = path;
            if (nodeType.block && nodeType.block.getName()) {
              nodeType = nodeType.block.getName();
              if (nodeType === 'p' || nodeType === 'li') {
                nodeType = path.block.getParent().getName();
              }
              if (nodeType === commandButtonList[key].style) {
                this.setState(CKEDITOR.TRISTATE_ON);
              } else {
                this.setState(CKEDITOR.TRISTATE_OFF);
              }
            }
          },
        });

        editor.ui.addButton(commandButtonList[key].command, {
          // The text part of the button (if available) and tooptip.
          label: commandButtonList[key].label,

          // The command to execute on click.
          command: commandButtonList[key].command,

          // The button placement in the toolbar (toolbar group key).
          toolbar: commandButtonList[key].toolbar,
        });
      },
    });
  }
}
