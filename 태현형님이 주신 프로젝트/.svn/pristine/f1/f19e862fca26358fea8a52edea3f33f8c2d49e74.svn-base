/*
 * BT WW Competencies Center - Fast Prototypes Team
 * @author UM5
 * Custom build not tested on touch devices yet
 */

define("BTWWUtils/PanZoom_ES6_UM5_v1/PanZoom", [], function () {
    class panZoom {
        /**
         * 
         * @param {jQuery Object} $panelEv 
         * @param {jQuery Object} $panelMove 
         * @param {object} options 
         * @param {float} options.zoom zoom factor defaults to 1
         * @param {object} options.translate object with x and y values for the default translation defaults to (0, 0)
         */
        constructor($panelEv, $panelMove, options) {
            this.lastX = -1;
            this.lastY = -1;
            this._zoomFactor = options.zoom || 1;
            this._translate2d = options.translate || {
                x: 0,
                y: 0
            };
            this.$panelEv = $panelEv;
            this.$panelMove = $panelMove;

            this.$panelMove.css("transform-origin", "0 0");
            this.$panelMove.css("-webkit-transform-origin", "0 0");
            this.$panelMove.css("-moz-transform-origin", "0 0");
            this.$panelMove.css("-ms-transform-origin", "0 0");
            this.$panelMove.css("-o-transform-origin", "0 0");

            this.events = options.events || {};

            this.setupEvents();
        }

        refresh2dTransform() {
            this.$panelMove.css("transform", `translate(${this._translate2d.x}px,${this._translate2d.y}px) scale(${this._zoomFactor})`);
            this.$panelMove.css("-webkit-transform", `translate(${this._translate2d.x}px,${this._translate2d.y}px) scale(${this._zoomFactor})`);
            this.$panelMove.css("-moz-transform", `translate(${this._translate2d.x}px,${this._translate2d.y}px) scale(${this._zoomFactor})`);
            this.$panelMove.css("-ms-transform", `translate(${this._translate2d.x}px,${this._translate2d.y}px) scale(${this._zoomFactor})`);
            this.$panelMove.css("-o-transform", `translate(${this._translate2d.x}px,${this._translate2d.y}px) scale(${this._zoomFactor})`);
        }

        setupEvents() {
            let that = this;
            this.$panelEv.on("wheel", (ev) => {
                ev.stopPropagation();
                ev.preventDefault();

                let origZoom = that._zoomFactor;

                var scrollY = ev.originalEvent.deltaY;
                if (scrollY > 0) {
                    //Scroll Down
                    that._zoomFactor /= 1.1;
                } else {
                    //Scroll Up
                    that._zoomFactor *= 1.1;
                }

                //Center zoom on mouse cursor
                var pos = that.getEvPosition(ev);
                //Math ! Yeah !!! It's ok when we translate then we scale after and with the transformation origin on (0,0) top left corner of the panel
                var tX = pos.x - that._zoomFactor / origZoom * (pos.x - that._translate2d.x);
                var tY = pos.y - that._zoomFactor / origZoom * (pos.y - that._translate2d.y);

                that._translate2d.x = tX;
                that._translate2d.y = tY;

                that.refresh2dTransform();
            });
            this.$panelEv.on("mousedown touchstart", (ev) => {
                ev.preventDefault();
                let pos = that.getEvPosition(ev);
                that.lastX = pos.x;
                that.lastY = pos.y;

                that.$panelEv.css("cursor", "move");

                that.$panelEv.on("mousemove touchmove", (ev) => {
                    ev.preventDefault();
                    that.moveToEv(ev);
                });
            });

            this.$panelEv.on("mouseup touchend mouseleave touchleave", (ev) => {
                ev.preventDefault();
                that.$panelEv.off("mousemove touchmove");
                that.$panelEv.css("cursor", "default");
            });
        }

        on() {
            this.setupEvents();
        }

        off() {
            this.$panelEv.off("mousedown touchstart mouseup touchend mouseleave touchleave mousemove touchmove wheel");
        }

        getEvPosition(jQueryEvent) {
            let posX = 0;
            let posY = 0;
            if (jQueryEvent.originalEvent.targetTouches && jQueryEvent.originalEvent.targetTouches.length > 0) {
                posX = jQueryEvent.originalEvent.targetTouches[0].pageX;
                posY = jQueryEvent.originalEvent.targetTouches[0].pageY;
            } else {
                posX = jQueryEvent.pageX;
                posY = jQueryEvent.pageY;
            }
            return {
                x: posX - this.$panelEv.offset().left,
                y: posY - this.$panelEv.offset().top
            };
        }

        moveToEv(jQueryEvent) {
            var pos = this.getEvPosition(jQueryEvent);
            var dX = pos.x - this.lastX;
            var dY = pos.y - this.lastY;

            this._translate2d.x += dX;
            this._translate2d.y += dY;

            this.lastX = pos.x;
            this.lastY = pos.y;

            this.refresh2dTransform();
        }

        reset() {
            this._zoomFactor = 1;
            this._translate2d = {
                x: 0,
                y: 0
            };
            this.refresh2dTransform();
        }

        zoom(factor) {
            let origZoom = this._zoomFactor;

            if (factor < 0) {
                //Scroll Down
                this._zoomFactor /= (-1 * factor);
            } else {
                //Scroll Up
                this._zoomFactor *= factor;
            }

            //Center zoom on mouse cursor
            var pos = {
                x: this.$panelEv.width() / 2,
                y: this.$panelEv.height() / 2
            };
            //Math ! Yeah !!! It's ok when we translate then we scale after and with the transformation origin on (0,0) top left corner of the panel
            var tX = pos.x - this._zoomFactor / origZoom * (pos.x - this._translate2d.x);
            var tY = pos.y - this._zoomFactor / origZoom * (pos.y - this._translate2d.y);

            this._translate2d.x = tX;
            this._translate2d.y = tY;

            this.refresh2dTransform();
        }

        zoomOut() {
            this.zoom(-1.1);
        }

        zoomIn() {
            this.zoom(1.1);
        }
    }

    return panZoom;
});