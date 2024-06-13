window.mimeTypeResolver = function(){
    'use strict';

    var objMimeIcons = {};
    var instance = null;

    this.types = {
        video : 'video',
        audio : 'audio',
        text : 'text',
        storage : 'storage',
        html : 'html',
        css : 'css',
        flash : 'flash',
        pdf: 'pdf',
        word: 'wordDoc',
        powerpoint: 'powerpoint',
        excel: 'excel',
        xml: 'xml',
        other : 'other',
        rdf: 'rdf',
        image: 'image'
    };

    this.setMimeTypeIcon = function(mimeType,icon) {
        objMimeIcons[mimeType] = icon;
    };

    this.resolve = function(mimeType, fileName){
        var arr = fileName.split('.');
        var extension = arr[arr.length-1].toLowerCase();
        var icon = objMimeIcons[mimeType] || ('DELWebInfrastructure/DSCommon/graphics/fileicons/' + extension + '.png');
        switch(mimeType){
            case 'application/x-shockwave-flash':
                return { type: this.types.flash, icon: icon};

            case 'application/vnd.adobe.air-application-installer-package+zip':
            case 'application/x-7z-compressed':
            case 'application/x-bittorrent':
            case 'application/x-bzip':
            case 'application/x-bzip2':
            case 'application/zip':
                return { type:this.types.storage, icon: icon};

            case 'application/pdf':
                return { type: this.types.pdf, icon: icon};

                case 'text/html':
                return { type: this.types.html, icon: icon};

            case 'text/x-c':
            case 'text/css':
            case 'text/csv':
            case 'text/calendar':
                return { type: this.types.text, icon: icon};

            case 'image/webp':
            case 'image/vnd.wap.wbmp':
            case 'image/x-rgb':
            case 'image/vnd.ms-modi':
            case 'image/ktx':
            case 'image/bmp':
            case 'image/jpeg':
            case 'application/vnd.oasis.opendocument.image':
            case 'application/vnd.oasis.opendocument.image-template':
            case 'image/x-pcx':
            case 'image/x-pict':
            case 'image/x-xbitmap':
            case 'image/g3fax':
            case 'image/cgm':
            case 'image/gif':
            case 'image/x-icon':
            case 'image/ief':
            case 'image/tiff':
            case 'image/png':
                return { type: this.types.image, icon: icon};

            case 'text/plain':
            case 'application/java-archive':
            case 'application/java-vm':
            case 'text/x-java-source,java':
            case 'application/javascript':
            case 'application/json':
                return { type: this.types.text, icon: icon};

            case 'video/quicktime':
            case 'video/x-ms-wmv':
            case 'video/x-ms-wvx':
            case 'video/ogg':
            case 'video/webm':
            case 'video/mpeg':
            case 'video/mp4':
            case 'video/x-ms-wm':
            case 'video/x-ms-wmx':
            case 'video/x-msvideo':
            case 'video/jpm':
            case 'video/jpeg':
            case 'video/x-ms-asf':
            case 'video/vnd.ms-playready.media.pyv':
            case 'video/x-f4v':
            case 'video/x-flv':
                return { type: this.types.video, icon: icon};

            case 'audio/x-pn-realaudio':
            case 'audio/x-pn-realaudio-plugin':
            case 'audio/midi':
            case 'audio/mp4':
            case 'audio/ogg':
            case 'audio/x-ms-wma':
            case 'audio/x-ms-wax':
            case 'audio/x-wav':
            case 'audio/vnd.ms-playready.media.pya':
                return { type: this.types.audio, icon: icon};

            case 'application/vnd.ms-excel':
            case 'application/vnd.ms-excel.addin.macroenabled.12':
            case 'application/vnd.ms-excel.sheet.binary.macroenabled.12':
            case 'application/vnd.ms-excel.template.macroenabled.12':
            case 'application/vnd.ms-excel.sheet.macroenabled.12':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                return { type: this.types.excel, icon: icon};

            case 'application/vnd.ms-powerpoint':
            case 'application/vnd.ms-powerpoint.addin.macroenabled.12':
            case 'application/vnd.ms-powerpoint.slide.macroenabled.12':
            case 'application/vnd.ms-powerpoint.presentation.macroenabled.12':
            case 'application/vnd.ms-powerpoint.slideshow.macroenabled.12':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                return { type: this.types.powerpoint, icon: icon};


            case 'application/sparql-query':
            case 'application/sparql-results+xml':
            case 'text/turtle':
                return { type: this.types.rdf, icon: icon};

            case 'application/xcap-diff+xml':
            case 'application/xenc+xml':
            case 'application/patch-ops-error+xml':
            case 'application/resource-lists+xml':
            case 'application/rls-services+xml':
            case 'application/resource-lists-diff+xml':
            case 'application/xslt+xml':
            case 'application/xop+xml':
            case 'application/xml':
                return { type: this.types.xml, icon: icon};

            case 'application/msword':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                return { type: this.types.word, icon: icon};

            case 'application/x-authorware-bin':
            case 'application/x-authorware-map':
            case 'application/x-authorware-seg':
            case 'application/vnd.adobe.fxp':
            case 'application/x-csh':
            case 'application/vnd.cups-ppd':
            case 'application/x-director':
            case 'application/vnd.adobe.xdp+xml':
            case 'application/vnd.adobe.xfdf':
            case 'application/vnd.airzip.filesecure.azf':
            case 'application/vnd.airzip.filesecure.azs':
            case 'text/x-fortran':
            case 'application/vnd.gmx':
            case 'application/x-gtar':
            case 'application/vnd.google-earth.kml+xml':
            case 'application/vnd.google-earth.kmz':
            case 'application/vnd.lotus-1-2-3':
            case 'application/vnd.lotus-approach':
            case 'application/vnd.lotus-freelance':
            case 'application/vnd.lotus-notes':
            case 'application/vnd.lotus-organizer':
            case 'application/vnd.lotus-screencam':
            case 'application/vnd.lotus-wordpro':
            case 'application/x-msaccess':
            case 'application/x-msdownload':
            case 'application/vnd.ms-artgalry':
            case 'application/vnd.ms-cab-compressed':
            case 'application/vnd.ms-ims':
            case 'application/x-ms-application':
            case 'application/x-msclip':
            case 'application/vnd.ms-fontobject':
            case 'application/vnd.ms-htmlhelp':
            case 'application/x-mscardfile':
            case 'application/vnd.ms-lrm':
            case 'application/x-msmediaview':
            case 'application/x-msmoney':
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
            case 'application/vnd.openxmlformats-officedocument.presentationml.slide':
            case 'application/vnd.openxmlformats-officedocument.presentationml.slideshow':
            case 'application/vnd.openxmlformats-officedocument.presentationml.template':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.template':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
            case 'application/x-msbinder':
            case 'application/vnd.ms-officetheme':
            case 'application/onenote':
            case 'application/vnd.ms-project':
            case 'application/x-mspublisher':
            case 'application/x-msschedule':
            case 'application/x-silverlight-app':
            case 'application/vnd.ms-pki.stl':
            case 'application/vnd.ms-pki.seccat':
            case 'application/vnd.visio':
            case 'application/x-ms-wmd':
            case 'application/vnd.ms-wpl':
            case 'application/x-ms-wmz':
            case 'application/x-msmetafile':
            case 'application/x-msterminal':
            case 'application/x-mswrite':
            case 'application/vnd.ms-works':
            case 'application/x-ms-xbap':
            case 'application/vnd.ms-xpsdocument':
            case 'application/mp21':
            case 'application/mp4':
            case 'application/x-dtbncx+xml':
            case 'application/ogg':
            case 'application/vnd.sun.xml.calc':
            case 'application/vnd.sun.xml.calc.template':
            case 'application/vnd.sun.xml.draw':
            case 'application/vnd.sun.xml.draw.template':
            case 'application/vnd.sun.xml.impress':
            case 'application/vnd.sun.xml.impress.template':
            case 'application/vnd.sun.xml.math':
            case 'application/vnd.sun.xml.writer':
            case 'application/vnd.sun.xml.writer.global':
            case 'application/vnd.sun.xml.writer.template':
            case 'application/vnd.previewsystems.box':
            case 'application/x-tar':
            case 'application/x-font-ttf':
            case 'application/x-cdlink':
            case 'video/vnd.vivo':
            case 'application/voicexml+xml':
            case 'application/vnd.wap.wbxml':
            case 'application/widget':
            case 'application/winhlp':
            case 'text/vnd.wap.wml':
            case 'application/vnd.wordperfect':
            case 'application/xhtml+xml':
            default:
                return { type: this.types.other, icon: (objMimeIcons[mimeType] || 'DELWebInfrastructure/DSCommon/graphics/fileicons/file.png') };
        }
    };
};

mimeTypeResolver.singleton = function() {
    'use strict';
    if(!mimeTypeResolver.instance) {
        mimeTypeResolver.instance = new mimeTypeResolver();
    }
    return mimeTypeResolver.instance;
};

