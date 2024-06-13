
/**
 * @overview GraphReader Screen Graph.
 * @licence Copyright 2006-2015 Dassault Systèmes company. All rights reserved.
 * @version 1.0.
 */

/* global define */

define('DS/GraphReaderWdg/Screens/Graph',
[
    // UWA
    'UWA/Core',
    'UWA/Class/Model',

    // UIKIT
    'DS/UIKIT/Tooltip',
    'DS/UIKIT/Alert',

    // W3DXComponents
    'DS/W3DXComponents/Views/GraphView',
    'DS/W3DXComponents/IdCard',

    // GraphReaderWdg
    'DS/GraphReaderWdg/Screens/Screen',

    // NLS
    'i18n!DS/GraphReaderWdg/assets/nls/GraphReader'
],

/**
 * @module DS/GraphReaderWdg/Screens/Graph
 *
 * @requires UWA/Core
 * @requires UWA/Class/Model
 *
 * @requires DS/UIKIT/Tooltip
 * @requires DS/UIKIT/Alert
 *
 * @requires DS/W3DXComponents/Views/GraphView
 * @requires DS/W3DXComponents/IdCard
 *
 * @requires DS/GraphReaderWdg/Screens/Screen
 *
 * @requires i18n!DS/GraphReaderWdg/assets/nls/GraphReader
 */
function (
    // UWA
    UWA,
    Model,

    // UIKIT
    UIKITTooltip,
    UIKITAlert,

    // W3DXComponents
    GraphView,
    IdCard,

    // GraphReaderWdg
    ScreenAbstract,

    // NLS
    Nls
) {
    'use strict';

    var GRAPH_TYPE_LINE = GraphView.TYPE_LINE,
        GRAPH_TYPE_COLUMN = GraphView.TYPE_COLUMN,
        GRAPH_TYPE_PIE = GraphView.TYPE_PIE,
        GRAPH_TYPE_DONUT = GraphView.TYPE_DONUT,
        // GRAPH_TYPE_TABLE = GraphView.TYPE_TABLE,

        DRAGCOMPARE_ENABLE_CLASS = 'dragcompare-enable',
        DIV = 'div';



    var Screen = ScreenAbstract.extend({

        /**
         * @property {Integer} resizeTimeout - Resize timeout.
         * @private
         */
        resizeTimeout: 0,

        /**
         * @property {DS/W3DXComponents/Views/GraphView} _theGraph - Graph view instance.
         * @private
         */
        _theGraph: null,

        /**
         * @property {UWA/Class/Model} _graphTitleModel.
         * @private
         */
        _graphTitleModel: null,

        /**
         * @property {DS/W3DXComponents/IdCard} _graphTitleIdCard.
         * @private
         */
        _graphTitleIdCard: null,

        /**
         * @property {Integer} _intervalLastRefreshInfo.
         * @private
         */
        _intervalLastRefreshInfo: null,





        // =========================
        // PUBLIC API
        // =========================


        /**
         * Show the screen.
         * @param {Object} options - Hash options.
         * @param {Boolean} options.isReadOnly - Is the widget is readOnly.
         */
        show: function (options) {
            var els, isReadOnly, idCardActions, currentData, currentDataTitle, currentDataType,
                headerRight, screenCtn, dispDragCompare,
                that = this;

            options = options || {};
            isReadOnly = options.isReadOnly;

            if (!that._isBuilt) {
                that._build();
                that._isBuilt = true;
            }

            // init var
            currentData = that.Model.getData();
            currentDataTitle = currentData.title || '';
            currentDataType = currentData.type;
            dispDragCompare = currentData.dragcompare;

            els = that.elements;
            headerRight = els.headerRight;
            screenCtn = els.screenCtn;

            idCardActions = !isReadOnly ? [{
                text: Nls.editIcon,
                icon: 'pencil',
                handler: that.View.showOptionsScreen.bind(that.View)
            }] : [];


            that._parent(options);

            if (
                dispDragCompare &&
                !isReadOnly &&
                [GRAPH_TYPE_LINE, GRAPH_TYPE_COLUMN].indexOf(currentDataType) >= 0
            ) {
                screenCtn.addClassName(DRAGCOMPARE_ENABLE_CLASS);
            } else {
                screenCtn.removeClassName(DRAGCOMPARE_ENABLE_CLASS);
            }

            if (!that._graphTitleIdCard) {
                that._graphTitleModel = new Model({
                    title: currentDataTitle
                });

                that._graphTitleIdCard = new IdCard({
                    model: that._graphTitleModel,
                    actions: idCardActions
                }).inject(els.headerLeft);
            } else {
                that._graphTitleModel.set('title', currentDataTitle);
            }

            that.drawTheGraph();
        }, // End function show()


        /**
         * Draw the chart.
         * @param {Object} data - Data to draw the chart.
         */
        drawTheGraph: function (data) {
            var type, xAxisData, lastRefreshEl,
                that = this,
                els = that.elements,
                ctn = els.screenCtn;

            if (!that.View.isGraphScreenDisplay()) {
                return;
            }


            if (that._theGraph) {
                that._theGraph.destroy();
            }

            // If there is no data, display an alert.
            if (!that.Model.hasCurrentData()) {
                new UIKITAlert({
                    className: 'alert',
                    closable: false,
                    visible: true,
                    messages: Nls.NoChartToDraw,
                    messageClassName: that.View.ALERT_INFO_CLASS
                }).inject(ctn);

                return;
            }

            data = data || that.Model.getData();
            data.title = '';
            type = data.type;

            // Manage categories
            xAxisData = data.xAxis;
            if (!xAxisData.useCategories) {
                xAxisData.categories = [];
            }

            data.expertOpts = data.expertOpts || {};

            if ([GRAPH_TYPE_DONUT, GRAPH_TYPE_PIE].indexOf(type) >= 0) {
                UWA.extend(data.expertOpts, {
                    tooltip: {
                        formatter: function () {
                            return that.View.tooltipFormaterPie(this, data);
                        }
                    }
                }, true);
            }

            that._theGraph = new GraphView(data).render().inject(ctn);
            that.resizeGraph();


            if (that.Model.hasPrefUrl()) {
                lastRefreshEl = els.lastRefreshEl;

                if (!lastRefreshEl) {
                    els.lastRefreshEl = lastRefreshEl = UWA.createElement(DIV, {
                        'class': 'last-refresh-info'
                    }).inject(ctn);
                }

                that._updateRefreshInfo();

                clearInterval(that._intervalLastRefreshInfo);
                that._intervalLastRefreshInfo = setInterval(that._updateRefreshInfo.bind(that), 60 * 1000);
            }
        }, // End function drawTheGraph()


        resizeGraph: function () {
            var idCardHeight, dim, height, width,
                that = this,
                theGraph = that._theGraph;

            that.resizeTimeout = null;

            if (!theGraph) {
                return;
            }

            theGraph.hide(); // FIXME: (ios only) Hide the chart in order to have the widget iframe to 100% of its parent container and not more than 100%.

            idCardHeight = that._graphTitleIdCard.container.getDimensions().height;

            dim = that.widgetBody.getDimensions();
            width = dim.innerWidth;
            height = dim.innerHeight;

            theGraph.show(); // FIXME: (ios only) Show the chart previously hidden.

            theGraph.setSize(
                width,
                height - idCardHeight
            );
        },


        /**
         * Fired when the view is resized.
         */
        onResize: function () {
            var that = this;

            if (that.resizeTimeout) {
                clearTimeout(that.resizeTimeout);
                that.resizeTimeout = null;
            }

            that.resizeTimeout = setTimeout(that.resizeGraph.bind(that), 600);
        }, // End function onResize()


        /**
         * Destroy the screen.
         */
        destroy: function () {
            var that = this;

            clearInterval(that._intervalLastRefreshInfo);
            that._intervalLastRefreshInfo = null;

            if (that._theGraph) {
                that._theGraph.destroy();
            }
            that._theGraph = null;

            if (that._graphTitleIdCard) {
                that._graphTitleIdCard.destroy();
            }
            that._graphTitleIdCard = null;

            if (that._graphTitleModel) {
                that._graphTitleModel.destroy();
            }
            that._graphTitleModel = null;

            that._parent();
        }, // End function destroy()






        /**
         * Build the screen.
         * @private
         */
        _build: function () {
            var ctn, headerLeft, headerRight, dragNCompareEl,
                createElement = UWA.createElement,
                that = this,
                els = that.elements;

            // 1 - Main container of the screen.
            ctn = els.screenCtn = createElement(DIV, {
                'class': 'screen-graph'
            }).inject(that.widgetBody);

            headerLeft = els.headerLeft = createElement(DIV, {'class': 'left'});
            headerRight = els.headerRight = createElement(DIV, {'class': 'right'});

            ctn.addContent({
                tag: DIV,
                'class': 'header flex',
                html: [headerLeft, headerRight]
            });

            dragNCompareEl = els.dragNCompareEl = createElement('span', {
                title: 'Drag and compare.',
                'class': 'dragger compare-btn icon fonticon fonticon-chart-line'
            }).inject(headerRight);

            dragNCompareEl.addEventListener('dragstart', that.View.dragStart.bind(that), false);
            dragNCompareEl.draggable = 'true';

            new UIKITTooltip({
                position: 'bottom',
                target: dragNCompareEl,
                body: Nls.dragNCompTooltip
            });
        }, // End function _build()


        /**
         * Update refresh info.
         * @private
         */
        _updateRefreshInfo: function () {
            var that = this,
                lastRefreshEl = that.elements.lastRefreshEl;

            if (lastRefreshEl) {
                lastRefreshEl.setText(
                    that.Controller.replace(
                        Nls.lastRefresh, {
                        time: (that.Model.getPrefLastRefreshUrl() + '').parseRelativeTime()
                    })
                );
            }
        } // End function _updateRefreshInfo()
    });


    /**
     * Screen name.
     * @constant {String} NAME
     * @memberOf module:DS/GraphReaderWdg/Screens/Graph
     */
    Screen.NAME = 'graph';


    return Screen;
});
