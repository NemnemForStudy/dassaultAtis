/* global define */

define('DS/MailWdg/Models/Attachment',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Model',
],
function (UWA, Model) {
    'use strict';

    var AttachmentModel = Model.extend({

        defaults: {
            size: 0,
            filename : '',
            type : '',
            url : '',
        },

        idAttribute: 'url',

        url: function () {
            // Is this the best way to get the base url ?
            // return UWA.hosts.exposition + '/proxy/mail/attachment' + this.get('url');
            return this.get('url');
        },

        parse: function (data) {

            var defaults = this.defaults;

            data.length = UWA.is(data.length, 'number') ? data.length : defaults.length;
            data.title = UWA.is(data.title, 'string') ? data.title : defaults.filename;
            data.type = UWA.is(data.type, 'string') ? data.type : defaults.type;
            data.url = UWA.is(data.url, 'string') ? data.url : defaults.url;

            return {
                // File size in bytes.
                size: data.length,
                // Remove heading and trailing quote.
                filename: data.title.replace(/^\"|\"$/g, ''),
                // Only get the mime type from the content disposition (leaving the filename).
                type: data.type.split(';')[0],
                // Url param to use
                url: data.url
            };
        },

        getSize: function () {
            var size = this.get('size'),
                unit;

            if (UWA.is(size, 'number')) {

                ['Ko', 'Mo', 'Go'].every(function(u) {
                    size /=1024;
                    unit = u;
                    return size >= 1000;
                });

                return Math.round(size) + ' ' + unit;

            } else {
                return '';
            }
        },

        getExtension: function () {

            var filename = this.get('filename'),
                ext = filename.split('.').pop();

            return filename !== ext ? ext : undefined;
        },

        getIcon: function () {
            var ext = this.getExtension(),
                icon;

            switch (ext) {
                case 'jpg':
                case 'jpeg':
                case 'png':
                case 'raw':
                case 'svg':
                case 'tiff':
                case 'gif':
                case 'bmp':
                case 'webp':
                    icon = 'picture';
                    break;
                case 'doc':
                case 'docx':
                case 'txt':
                case 'rtf':
                    icon = 'doc-text';
                    break;
                case 'xls':
                case 'xlsx':
                case 'csv':
                    icon = 'chart-line';
                    break;
                case 'ppt':
                case 'ppts':
                case 'pptx':
                    icon = 'chart-pie';
                    break;
                case 'mov':
                case 'wmv':
                case 'avi':
                case 'mp4':
                case 'flv':
                case 'webm':
                case 'mkv':
                case 'ogv':
                case 'asf':
                    icon = 'video';
                    break;
                case 'aac':
                case 'mp3':
                case 'wav':
                case 'ogg':
                case 'flac':
                case 'alac':
                    icon = 'music';
                    break;
                case 'epub':
                case 'ibooks':
                case 'azw':
                case 'azw3':
                case 'kf8':
                case 'lrf':
                case 'lrx':
                case 'cbr':
                case 'cbz':
                case 'cb7':
                case 'cbt':
                case 'cba':
                case 'pdb':
                case 'fb2':
                case 'cb7':
                    icon = 'book';
                    break;
                case 'pdf':
                    icon = 'newspaper';
                    break;
                case 'zip':
                case 'zipx':
                case 'rar':
                case 'tar':
                case 'gz':
                case 'tgz':
                case 'bz2':
                case '7z':
                case 'ace':
                case 'apk':
                case 'jar':
                case 'war':
                case 'kgb':
                    icon = 'archive';
                    break;
                case 'ics':
                case 'vcs':
                    icon = 'calendar';
                    break;
                case 'vcf':
                case 'vcard':
                    icon = 'vcard';
                    break;
                default:
                    icon = 'doc';
                    break;
            }

            return icon;
        }

    });

    return AttachmentModel;

});

