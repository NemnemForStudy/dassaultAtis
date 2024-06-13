/**
 * BT WW Competencies Center - Fast Prototypes Team
 * @author UM5
 *
 * Based on Code from II2
 */

define("BTWWSemanticUI/SemanticUITable_ES5_UM5_v2/SemanticUITable", [
    "UWA/Drivers/jQuery",
    "css!BTWWLibrairies/semantic-ui/semantic.min",
    "css!BTWWSemanticUI/SemanticUITable_ES5_UM5_v2/SemanticUITable"
], function ($) {
    /**
     * Semantic UI Table constructor
     *
     * Options are :
     * - config : default configuration for the Table, can be changed later on
     * - id : the html tag id that will be set for the Table
     * - parentId : the id of the html tag to be append into. If not define, no append is done and you can do it manually after by getting $table
     * - style : Style to add to the differents levels of the html Table
     * - events : Events that are launched when user interact with the Table
     * - container : Used to put the table in + used to calculate max height...
     * - scroll : Used to indicate how to set the default scroll position
     *
     * config format :
     * {
     *  rowsFunction: function(row, trElement){},                                   Optional
     *  headersFunction: function(index, columnDef, thElement){},                   Optional
     *  columns:[
     *      {
     *          header: "Some String",                                              Mandatory
     *          width: "123px",                                                     Optional
     *          cell: function(rowObject, columnDef){return String||HTMLElement},   Mandatory
     *          title: function(rowObject, columnDef){return String}                Optional    Will use rowObject[columnDef.key] if not specified
     *          html: function(rowObject, tdElement, columnDef){}                   Optional
     *          group: "Some String"                                                Optional
     *          key: "Some String"                                                  Mandatory   Object key that will be used to sort or filter
     *      },...
     *  ]
     * }
     *
     * style format :
     * {
     *  table : "some css classes",
     *  header : "some css classes",
     *  body : "some css classes",
     *  rows : "some css classes"
     * }
     *
     * scroll format :
     * {
     *  startLine: 123
     * }
     *
     * events format :
     * {
     *  onSelectLine: function(rowObject, isSelected){}                                             Optional
     *  onColumnDefinitionChange: function(newColumnsDefinition){}                  Optional
     *  onScrollChange: function(newScrollInfos){}                                  Optional
     * }
     *
     * @param {any} options Options to use to construct the Table
     */

    //TODO Add Row Grouping

    //TOCHECK Add Sort on Column Header, option available with button in Header + icon in header when active

    //TODO Add Filter on Column, option available in header + icon in header when active

    //TOCHECK Callback when Column Def is change to save it in widget prefs and to reload it later (when using headers options)

    //TOCHECK Line virtualization, index of line to add + scroll events and position + save current line displayed on top and set it back when display is refreshed...
    //TODO better scroll with not only the mousewheel

    //TOCHECK Column Option to colorize on specific values

    //TODO Ctrl or Shift + Clic to multi select lines, based on line number + lastly selected line number, save the line number selected for Line Virtualization
    //TODO Change _events.onSelect way of calling to send the object (or objects) selected instead of the click event
    //TODO Add a function to call to indicate that Objects are selected

    //TOCHECK onSelectLine to send the object selected and not the html element clicked

    //TODO??? Column reordering with DnD ??? (widgets prefs are ok for now)

    //TODO Export CSV / HTML without the line virtualization

    //TODO ?? Option to display line number ??

    function SemanticUITable(options) {
        this.$table = null;
        this.$thead = null;
        this.$tbody = null;

        this._id = options.id || "semanticTable-1"; //Set _id for the Table

        this.$container = $(options.container);

        this._tableConfig = options.config || {
            columns: []
        }; //Set _tableConfig

        this._tableConfig.style = options.style || {};

        this._events = options.events || {};

        this._startLine = options.scroll.startLine || 0; //Used for line virtualization

        this._initTableDOM = function () {
            this.$table = $("<table id=" + this._id + "></table>")
                .addClass("ui celled table")
                .addClass(this._tableConfig.style.table);
            this.$thead = $("<thead></thead>").appendTo(this.$table);
            this.$tbody = $("<tbody></tbody>").appendTo(this.$table);

            this.$thead.addClass(this._tableConfig.style.header);
            this.$tbody.addClass(this._tableConfig.style.body);

            this._initTableHeaders();

            var that = this;
            //Scroll on a global div and not only the Table
            this.$container.off("wheel");
            this.$container.on("wheel", function (ev) {
                ev.preventDefault();
                var scrollY = ev.originalEvent.deltaY;
                if (scrollY > 0) {
                    that._startLine++;
                } else {
                    that._startLine--;
                }

                if (that._startLine >= that._rowCounts) {
                    that._startLine = that._rowCounts - 1;
                } else if (that._startLine < 0) {
                    that._startLine = 0;
                }

                that.refreshDisplay();

                if (typeof that._events.onScrollChange === "function") {
                    that._events.onScrollChange({
                        startLine: that._startLine,
                        endLine: that._endLine,
                        rowCounts: this._rowCounts
                    });
                }
            });

            this.$container.append(this.$table);

            this.$infoObjs = $("<div id='infoObjs'></div>");

            this.$container.append(this.$infoObjs);

            this.$scrollbar = $("<div id='tableScroll'></div>");
            this.$scrollIndicator = $("<div id='scrollIndicator'></div>");
            this.$scrollbar.append(this.$scrollIndicator);
            this.$container.append(this.$scrollbar);

            //TODO add events to scroll by moving the bar
            //TODO add events to scroll on touch devices
            let scrollActive = false;
            let scrollToEV = function (ev) {
                let posY = 0;
                if (ev.originalEvent.targetTouches && ev.originalEvent.targetTouches.length > 0) {
                    posY = ev.originalEvent.targetTouches[0].pageY;
                } else {
                    posY = ev.pageY;
                }
                //Offset correction
                posY -= that.$scrollbar.get(0).offsetTop;

                let hScroll = that.$scrollbar.height();
                let newStart = that._rowCounts * posY / hScroll;
                that._startLine = Math.floor(newStart);

                if (that._startLine >= that._rowCounts) {
                    that._startLine = that._rowCounts - 1;
                } else if (that._startLine < 0) {
                    that._startLine = 0;
                }

                that.refreshDisplay();

                if (typeof that._events.onScrollChange === "function") {
                    that._events.onScrollChange({
                        startLine: that._startLine,
                        endLine: that._endLine,
                        rowCounts: that._rowCounts
                    });




                }
            };

            this.$scrollbar.on("mousedown touchstart", function (ev) {
                ev.preventDefault();
                scrollActive = true;

                let fctMove = function (ev) {
                    ev.preventDefault();

                    if (scrollActive) {
                        scrollToEV(ev);
                    }
                };

                //that.$scrollbar.on("mousemove touchmove", fctMove);
                $(window).on("mousemove touchmove", fctMove); //This way we can go out of the frame it will still work properly

                let fctMouseUp = function (ev) {
                    ev.preventDefault();
                    if (scrollActive) {
                        scrollToEV(ev);
                    }
                    scrollActive = false;
                    //that.$scrollbar.off("mousemove touchmove");
                    $(window).off("mousemove touchmove", fctMove);
                    //that.$scrollbar.off("mouseup touchend");
                    $(window).off("mouseup touchend", fctMouseUp);
                };
                //this.$scrollbar.on("mouseup touchend", fctMouseUp);
                $(window).on("mouseup touchend", fctMouseUp); //This way we can go out of the frame it will still work properly
            });

        };

        this._initTableHeaders = function () {
            var that = this;
            var $trHead = $("<tr></tr>");

            var currentGroup = "";
            var $trGroup = $("<tr class='group'></tr>");
            var $thGroup = null;
            var addGroup = false;

            var functionCogs = function (ev) {
                that.clickOnColumnOptions(ev, ev.data.index, ev.data.columnDef);
            };

            for (var i = 0; i < this._tableConfig.columns.length; i++) {
                var columnDef = this._tableConfig.columns[i];
                //var $th = $("<th class='single line' style='" + (columnDef.width ? "width:" + columnDef.width + ";" : "") + "'>" + columnDef.header + "</th>");
                var $th = $(
                    "<th class='single line' style='" +
                    (columnDef.width ? "width:" + columnDef.width + ";min-width:" + columnDef.width + ";max-width:" + columnDef.width : "") +
                    (columnDef.css ? ";" + columnDef.css : "") +
                    "'>" +
                    columnDef.header +
                    "</th>"
                );

                $th.addClass(this._tableConfig.style.header);

                $th.attr("column-index", i);
                //var $btnCogs = $("<i class='cogs icon'></i>");
                //var $btnCogs = $("<i class='bars icon params'></i>");
                var $btnCogs = $("<i class='ellipsis horizontal icon params'></i>");
                $btnCogs.on("click", {
                    index: i,
                    columnDef: columnDef
                }, functionCogs);

                $th.append($btnCogs);

                var $divAppliedOpts = $("<div class='appliedOptions'></div>"); //<i class='filter icon'></i> or <i class='sort alphabet up icon'></i> to put inside
                $th.append($divAppliedOpts);

                var $divColumnOptions = $("<div class='displayOptions hidden'></div>");
                $th.append($divColumnOptions);

                $trHead.append($th);
                if (typeof this._tableConfig.headersFunction === "function") {
                    this._tableConfig.headersFunction(i, columnDef, $th.get(0));
                }

                if (columnDef.group) {
                    addGroup = true;
                }
                if (i === 0) {
                    currentGroup = columnDef.group || "";
                    $thGroup = $("<th colspan='1'>" + currentGroup + "</th>");
                    $trGroup.append($thGroup);
                } else {
                    if (currentGroup === (columnDef.group || "")) {
                        var colSpan = parseInt($thGroup.attr("colspan"));
                        $thGroup.attr("colspan", "" + (colSpan + 1));
                    } else {
                        currentGroup = columnDef.group || "";
                        $thGroup = $("<th colspan='1'>" + currentGroup + "</th>");
                        $trGroup.append($thGroup);
                    }
                }
                if (currentGroup === "") {
                    $thGroup.addClass("empty");
                    $thGroup.css("background-color", "white");
                }
            }

            if (addGroup) {
                this.$thead.append($trGroup);
            }
            this.$thead.append($trHead);
        };

        this._initTableDOM();

        if (options.parentId) {
            var $parentHTML = $("#" + options.parentId);
            try {
                $parentHTML.append(this.$table);
            } catch (error) {
                console.error(error);
            }
        }

        this.injectIn = function (parentHTMLElement) {
            $(parentHTMLElement).append(this.$table);
        };

        this.clearRows = function () {
            this.$tbody.empty();
        };

        this.allRows = [];

        this.addRows = function (arrRows, level) {
            if (typeof level === "undefined") level = 0;
            if (level === 0) {
                this.allRows = arrRows;
            }

            //Sort functions
            var sortAlphabetByKey = function (array, key, reverse) {
                return array.sort(function (a, b) {
                    var x = a[key];
                    var y = b[key];

                    if (typeof x == "string") {
                        x = x.toLowerCase();
                    }
                    if (typeof y == "string") {
                        y = y.toLowerCase();
                    }

                    var res = x < y ? -1 : x > y ? 1 : 0;

                    if (res === 0) {
                        //Manage the tie break to have a stable sort
                        //Use the last line number if there to keep the same order as first sort
                        //_sys_lineNumber
                        var aLine = a._sys_lineNumber || 0;
                        var bLine = b._sys_lineNumber || 0;
                        res = aLine < bLine ? -1 : aLine > bLine ? 1 : 0;
                    }

                    if (reverse) {
                        return -1 * res;
                    } else {
                        return res;
                    }
                });
            };
            var sortNumericByKey = function (array, key, reverse) {
                return array.sort(function (a, b) {
                    var x = a[key];
                    var y = b[key];

                    if (typeof x === "string") {
                        try {
                            x = parseFloat(x);
                        } catch (err) {
                            x = 0;
                        }
                    }
                    if (typeof y === "string") {
                        try {
                            y = parseFloat(y);
                        } catch (err) {
                            y = 0;
                        }
                    }

                    var res = x < y ? -1 : x > y ? 1 : 0;

                    if (res === 0) {
                        //Manage the tie break to have a stable sort
                        //Use the last line number if there to keep the same order as first sort
                        //_sys_lineNumber
                        var aLine = a._sys_lineNumber || 0;
                        var bLine = b._sys_lineNumber || 0;
                        res = aLine < bLine ? -1 : aLine > bLine ? 1 : 0;
                    }

                    if (reverse) {
                        return -1 * res;
                    } else {
                        return res;
                    }
                });
            };

            var recursSort = function (arrayToRecurs, sortingKey, sortType) {
                var sortFct = sortAlphabetByKey;
                var reverse = false;
                if (sortType.indexOf("numeric") === 0) {
                    sortFct = sortNumericByKey;
                }
                if (sortType.indexOf("-up") !== -1) {
                    reverse = true;
                }
                arrayToRecurs = sortFct(arrayToRecurs, sortingKey, reverse);
                for (var i = 0; i < arrayToRecurs.length; i++) {
                    if (arrayToRecurs[i].childs) {
                        recursSort(arrayToRecurs[i].childs, sortingKey, sortType);
                    }
                }
            };

            //Put a line number on the objects to be used to have a stable sort by solving the tie break sort issue on Chrome and Opera
            var updateLineNumbers = function (lineCounter, arrayToRecurs) {
                for (var i = 0; i < arrayToRecurs.length; i++) {
                    arrayToRecurs[i]._sys_lineNumber = lineCounter;
                    lineCounter++;
                    if (arrayToRecurs[i].childs) {
                        updateLineNumbers(lineCounter, arrayToRecurs[i].childs);
                    }
                }
            };

            // ---- Sort the data ----
            var i;
            var columnDef;
            var arrIndexColumnsInPriority = [];
            for (i = 0; i < this._tableConfig.columns.length; i++) {
                columnDef = this._tableConfig.columns[i];
                if (typeof columnDef._sortPriority !== "undefined" && columnDef._sorted !== "none") {
                    while (arrIndexColumnsInPriority.length < columnDef._sortPriority) {
                        arrIndexColumnsInPriority.push(-1);
                    }
                    arrIndexColumnsInPriority[columnDef._sortPriority] = i;
                }
            }

            //Sort the data in the inverted order so priority 0 is the last one sorted
            for (i = arrIndexColumnsInPriority.length - 1; i >= 0; i--) {
                var columnIndex = arrIndexColumnsInPriority[i];
                columnDef = this._tableConfig.columns[columnIndex];
                //Sort this column
                recursSort(arrRows, columnDef.key, columnDef._sorted);
                updateLineNumbers(0, arrRows);
            }

            // ---- Display the data ----
            this._rowCounts = 0;
            this._endLine = -1;

            this._buildDisplay(arrRows, level, null);

            //The _rowsCounts is updated here, display a scroll bar...

            if (this._endLine == -1) this._endLine = this._rowCounts;

            var startPercent = 100 * this._startLine / this._rowCounts;
            var stopPercent = 100 * (this._rowCounts - this._endLine) / this._rowCounts;

            this.$scrollIndicator.css("top", startPercent + "%");
            this.$scrollIndicator.css("bottom", stopPercent + "%");

            this.$scrollbar.css("top", this.$thead.height() + "px");

            this.$infoObjs.text(this._rowCounts + " rows");
        };

        this._buildDisplay = function (arrRows, level, parentRow) {
            var that = this;
            var i;
            var columnDef;

            var marginHeight = 10; //Used to adjust scrollbar if a line is partially hidden

            for (i = 0; i < arrRows.length; i++) {
                let rowObject = arrRows[i];

                rowObject.level = level; // So it can be used by cell functions
                rowObject.parentRow = parentRow; // So it can be used by cell functions

                if (this._rowCounts >= this._startLine && this.$table.height() - marginHeight < this.$container.height()) {
                    let $tr = $("<tr></tr>");

                    if (rowObject._sys_selected) {
                        $tr.addClass("selected");
                    }

                    $tr.addClass(this._tableConfig.style.rows);

                    if (typeof this._events.onSelectLine === "function") {
                        $tr.on("click", ev => {
                            that.manageSelection(rowObject, ev);
                        });
                    }

                    if (typeof this._tableConfig.rowsFunction === "function") {
                        this._tableConfig.rowsFunction(rowObject, $tr.get(0));
                    }

                    for (var j = 0; j < this._tableConfig.columns.length; j++) {
                        columnDef = this._tableConfig.columns[j];


                        var $td = $(
                            "<td style='" +
                            (columnDef.width ?
                                "width:" + columnDef.width + ";min-width:" + columnDef.width + ";max-width:" + columnDef.width + ";overflow:hidden;" :
                                "") +
                            (columnDef.css ? ";" + columnDef.css : "") +
                            "'></td>"
                        );
                        //var $td = $("<td></td>");

                        if (typeof columnDef.title === "function") {
                            $td.attr("title", columnDef.title(rowObject, columnDef));
                        } else {
                            $td.attr("title", rowObject[columnDef.key]);
                        }

                        $td.append(columnDef.cell(rowObject, columnDef));
                        if (typeof columnDef.html === "function") {
                            columnDef.html(rowObject, $td.get(0), columnDef);
                        }

                        //Apply color rules
                        if (columnDef._colors && columnDef._colors.length > 0) {
                            for (var c = 0; c < columnDef._colors.length; c++) {
                                var colorRuleObj = columnDef._colors[c];
                                //Code applying the color if needed...
                                var textCell = $td.text();
                                var applyRule = false;
                                if (colorRuleObj.rule === "contains") {
                                    if (textCell.indexOf(colorRuleObj.value) !== -1) {
                                        applyRule = true;
                                    }
                                } else if (colorRuleObj.rule === "equals") {
                                    if (textCell == colorRuleObj.value) {
                                        applyRule = true;
                                    }
                                } else if (
                                    colorRuleObj.rule === "lt" ||
                                    colorRuleObj.rule === "lte" ||
                                    colorRuleObj.rule === "gt" ||
                                    colorRuleObj.rule === "gte"
                                ) {
                                    try {
                                        var floatCell = parseFloat(textCell);
                                        var floatVal = parseFloat(colorRuleObj.value);
                                        switch (colorRuleObj.rule) {
                                            case "lt":
                                                if (floatCell < floatVal) {
                                                    applyRule = true;
                                                }
                                                break;
                                            case "lte":
                                                if (floatCell <= floatVal) {
                                                    applyRule = true;
                                                }
                                                break;
                                            case "gt":
                                                if (floatCell > floatVal) {
                                                    applyRule = true;
                                                }
                                                break;
                                            case "gte":
                                                if (floatCell >= floatVal) {
                                                    applyRule = true;
                                                }
                                                break;
                                            default:
                                                break;
                                        }
                                    } catch (err) {
                                        //Fail silently
                                    }
                                } else {
                                    console.warn("Color rule " + colorRuleObj.rule + " is not managed in SemanticUITable [°O°]");
                                }
                                //Apply the colors if needed to
                                if (applyRule) {
                                    if (colorRuleObj.color && colorRuleObj.color != "") {
                                        $td.css("color", colorRuleObj.color);
                                    }
                                    if (colorRuleObj.background && colorRuleObj.background != "") {
                                        $td.css("background-color", colorRuleObj.background);
                                    }
                                }
                            }
                        }

                        $tr.append($td);
                    }

                    this.$tbody.append($tr);
                }

                if (this.$table.height() - marginHeight >= this.$container.height() && this._endLine == -1) this._endLine = this._rowCounts;

                this._rowCounts++;

                if (
                    rowObject.childs &&
                    rowObject.childs.length > 0 &&
                    (typeof rowObject.expanded === "undefined" || (typeof rowObject.expanded !== "undefined" && rowObject.expanded))
                ) {
                    this._buildDisplay(rowObject.childs, level + 1, rowObject);
                }
            }
        };

        this.refreshDisplay = function () {
            var refreshDone = false;
            if (!this._refreshPending) {
                this._refreshPending = true;
                this.$tbody.empty();
                this.addRows(this.allRows);
                refreshDone = true;
                this._refreshPending = false;
            }
            return refreshDone;
        };

        this.setColumnsConfig = function (newColumns) {
            this._tableConfig.columns = newColumns;
            this.clearRows();
            this.$thead.empty();
            this._initTableHeaders();
        };

        this.triggerColumnDefinitionChange = function () {
            if (typeof this._events.onColumnDefinitionChange === "function") {
                this._events.onColumnDefinitionChange(this._tableConfig.columns);
            }
        };

        this.clickOnColumnOptions = function (ev, index, columnDef) {
            var $divOptions = $("th[column-index=" + index + "] > div.displayOptions");
            if ($divOptions.hasClass("hidden")) {
                this.buildColumnOptions($divOptions, columnDef);
                $divOptions.removeClass("hidden");
                //Reposition if larger than the column and if it's overflowing so much that it's hidding part of the div
                var leftDiv = $divOptions.offset().left;
                if (leftDiv < 0) {
                    $divOptions.css("right", "unset");
                    $divOptions.css("left", "2px");
                }
            } else {
                $divOptions.addClass("hidden");
            }
        };

        this.buildColumnOptions = function ($divOptions, columnDef) {
            var that = this;
            var i;

            $divOptions.empty();

            //Sort rules
            var $iconAlphaDown = $("<i class='icon sort alphabet down'></i>");
            var $iconAlphaUp = $("<i class='icon sort alphabet up'></i>");
            var $iconNumericDown = $("<i class='icon sort numeric down'></i>");
            var $iconNumericUp = $("<i class='icon sort numeric up'></i>");

            var refreshActiveSortButton = function () {
                var currentSort = columnDef._sorted || "none";

                $iconAlphaDown.removeClass("active");
                $iconAlphaUp.removeClass("active");
                $iconNumericDown.removeClass("active");
                $iconNumericUp.removeClass("active");

                if (currentSort === "alphabet-down") {
                    $iconAlphaDown.addClass("active");
                }
                if (currentSort === "alphabet-up") {
                    $iconAlphaUp.addClass("active");
                }
                if (currentSort === "numeric-down") {
                    $iconNumericDown.addClass("active");
                }
                if (currentSort === "numeric-up") {
                    $iconNumericUp.addClass("active");
                }
            };
            refreshActiveSortButton();

            var activateSort = function (mode) {
                //console.log("activateSort, mode=", mode);
                columnDef._sorted = mode;
                if (mode !== "none") {
                    var arrIndexColumnsInPriority = [];
                    //Refresh the sortPriority numbers for all the columns
                    var priorityOffset = 1;
                    var i;
                    for (i = 0; i < that._tableConfig.columns.length; i++) {
                        var columnDefToAdjust = that._tableConfig.columns[i];
                        //use typeof undefined else if _sortPriority exist but is equal to 0, it won't work well
                        if (typeof columnDefToAdjust._sortPriority !== "undefined" && columnDefToAdjust._sorted !== "none" && columnDefToAdjust !== columnDef) {
                            columnDefToAdjust._sortPriority += priorityOffset;
                            while (arrIndexColumnsInPriority.length < columnDefToAdjust._sortPriority) {
                                arrIndexColumnsInPriority.push(-1);
                            }
                            //Test if priority is already used by a column, if the case shift it to the right (priority of this one and next ones ++)
                            if (arrIndexColumnsInPriority[columnDefToAdjust._sortPriority] !== -1) {
                                arrIndexColumnsInPriority.splice(columnDefToAdjust._sortPriority, 0, i);
                                priorityOffset++;
                            } else {
                                arrIndexColumnsInPriority[columnDefToAdjust._sortPriority] = i;
                            }
                        } else if (columnDefToAdjust === columnDef) {
                            arrIndexColumnsInPriority[0] = i;
                        }
                    }
                    if (arrIndexColumnsInPriority.indexOf(-1) !== -1) {
                        //There is blanks in the priorities for sort
                        var indexToRemove;
                        while ((indexToRemove = arrIndexColumnsInPriority.indexOf(-1)) !== -1) {
                            arrIndexColumnsInPriority.splice(indexToRemove, 1);
                        }
                    }
                    //All -1 removed let set the sort priorities correctly
                    for (i = 0; i < arrIndexColumnsInPriority.length; i++) {
                        var columnIndex = arrIndexColumnsInPriority[i];
                        that._tableConfig.columns[columnIndex]._sortPriority = i;
                    }
                }
                refreshActiveSortButton();
                that.refreshDisplay();
                that.triggerColumnDefinitionChange();
            };

            $iconAlphaDown.click(function (ev) {
                activateSort("alphabet-down");
            });
            $iconAlphaUp.click(function (ev) {
                activateSort("alphabet-up");
            });
            $iconNumericDown.click(function (ev) {
                activateSort("numeric-down");
            });
            $iconNumericUp.click(function (ev) {
                activateSort("numeric-up");
            });

            $divOptions.append($iconAlphaDown);
            $divOptions.append($iconAlphaUp);
            $divOptions.append($iconNumericDown);
            $divOptions.append($iconNumericUp);

            //Filter rules
            //var currentFilter = columnDef._filters || []; //array of string (selected values)
            if (!columnDef._filters) {
                columnDef._filters = [];
            }

            //TODO Find the possible filters based on the values in the current column with : columnDef.key and this.allRows
            //TODO then build the display and keep the previously selected filters
            var values4Filters = [];
            var addValue4Filters = function (value) {
                if (typeof value === "undefined" || value === "") {
                    value = "**EMPTY**";
                }
                if (values4Filters.indexOf(value) === -1) {
                    values4Filters.push(value);
                }
            };
            var getValuesRecursively = function (arrObj, key) {
                if (arrObj) {
                    for (var i = 0; i < arrObj.length; i++) {
                        var obj = arrObj[i];
                        var value = obj[key];
                        addValue4Filters(value);
                        getValuesRecursively(obj.childs, key);
                    }
                }
            };
            getValuesRecursively(that.allRows, columnDef.key);
            //All possibles values are now in values4Filters
            values4Filters.sort();

            var toggleFilterValue = function ( /*valueFilter*/ ) {
                return function () {
                    //TODO add or remove from the filters...
                    columnDef._filters;
                };
            };

            var $divFilters = $("<div class='filtersRules'></div>");
            var $divFiltersHead = $("<div class='rulesHeader'>Filter Rules</div>");
            $divFilters.append($divFiltersHead);

            var $tableFilters = $("<table class='minimal'></table>");
            $divFilters.append($tableFilters);

            var $tBodyFilters = $("<tbody></tbody>");
            $tableFilters.append($tBodyFilters);

            for (i = 0; i < values4Filters.length; i++) {
                var valFilter = values4Filters[i];
                var $trFilter = $("<tr></tr>");
                $trFilter.on("click", toggleFilterValue(valFilter));
                $trFilter.append("<td class='tdCheck'><i class='icon checkmark black'></i></td>"); //Checkbox
                $trFilter.append("<td>" + valFilter + "</td>");
                $tBodyFilters.append($trFilter);
            }

            //TODO Adjust Filters before adding them back
            //$divOptions.append($divFilters);
            //FIXME display back the filters when the display panel is reworked correctly

            //Color rules
            if (!columnDef._colors) {
                columnDef._colors = []; //{color:"",background:"",rule:"contains|equal|lt|gt|lte|gte",value:""}
            }
            var rulesValues = ["contains", "equals", "lt", "lte", "gt", "gte"];
            var rulesDisplay = ["contains", "==", "<", "<=", ">", ">="];

            var $divColors = $("<div class='colorRules'></div>");

            var $divColorHead = $("<div class='rulesHeader'>Color rules </div>");
            $divColors.append($divColorHead);

            var $btnApplyColors = $("<button title='Apply' class='applyBtn ui button basic blue hidden icon'><i class='icon checkmark'></i></button>");
            $divColorHead.append($btnApplyColors);

            $btnApplyColors.click(function () {
                $btnApplyColors.addClass("hidden");
                refreshColorRules();
                that.refreshDisplay();
                that.triggerColumnDefinitionChange();
            });

            var getRuleSelect = function (selectedRule) {
                var $selectRule = $("<select></select>");
                for (var r = 0; r < rulesValues.length; r++) {
                    var $opt = $("<option value='" + rulesValues[r] + "'></option>");
                    $opt.text(rulesDisplay[r]);
                    if (rulesValues[r] === selectedRule) {
                        $opt.attr("selected", "true");
                    }
                    $selectRule.append($opt);
                }
                return $selectRule;
            };

            var updateTextColor = function (ev) {
                var newVal = $(this).text();
                columnDef._colors[ev.data.index].color = newVal;
                $(this).css("color", newVal);
                $btnApplyColors.removeClass("hidden");
            };
            var updateBackColor = function (ev) {
                var newVal = $(this).text();
                columnDef._colors[ev.data.index].background = newVal;
                $(this).css("background-color", newVal);
                $btnApplyColors.removeClass("hidden");
            };
            var updateValueRule = function (ev) {
                var newVal = $(this).text();
                columnDef._colors[ev.data.index].value = newVal;
                $btnApplyColors.removeClass("hidden");
            };
            var updateColorRule = function (ev) {
                var newVal = $(this).val();
                columnDef._colors[ev.data.index].rule = newVal;
                $btnApplyColors.removeClass("hidden");
            };

            var newColorRule = function () {
                columnDef._colors.push({
                    color: "red",
                    background: "yellow",
                    rule: "contains",
                    value: "SomeText"
                });





                $btnApplyColors.removeClass("hidden");
                refreshColorRules();
            };
            var deleteColorRule = function (ev) {
                columnDef._colors.splice(ev.data.index, 1);
                refreshColorRules();
            };

            var $tableColorRule = $(
                "<table class='minimal'><thead><tr><th>Text Color</th><th title='Background Color'>Back. Color</th><th title='Condition'>Cond.</th><th>Value</th><th title='action'></th></tr></thead></table>"
            );
            var $tableColorRuleBody = $("<tbody></tbody>");
            $tableColorRule.append($tableColorRuleBody);

            $divColors.append($tableColorRule);

            var refreshColorRules = function () {
                $tableColorRuleBody.empty();

                for (i = 0; i < columnDef._colors.length; i++) {
                    var colorRule = columnDef._colors[i];
                    var $trRule = $("<tr class='colorRule'></tr>");

                    var $tdColor = $("<td style='color:" + colorRule.color + ";' contenteditable>" + colorRule.color + "</td>");
                    var $tdBackColor = $("<td style='background-color:" + colorRule.background + ";' contenteditable>" + colorRule.background + "</td>");
                    var $tdRule = $("<td></td>");
                    var $tdValue = $("<td contenteditable>" + colorRule.value + "</td>");
                    var $tdAction = $("<td class='action'></td>");

                    var $selectRule = getRuleSelect(colorRule.rule);
                    $tdRule.append($selectRule);

                    var $actionDelete = $("<i class='actionDelete icon delete'></i>");
                    $tdAction.append($actionDelete);

                    $tdColor.on("change blur", {
                        index: i
                    }, updateTextColor);


                    $tdBackColor.on("change blur", {
                        index: i
                    }, updateBackColor);


                    $selectRule.on("change", {
                        index: i
                    }, updateColorRule);


                    $tdValue.on("change blur", {
                        index: i
                    }, updateValueRule);


                    $actionDelete.on("click", {
                        index: i
                    }, deleteColorRule);



                    $trRule.append($tdColor);
                    $trRule.append($tdBackColor);
                    $trRule.append($tdRule);
                    $trRule.append($tdValue);
                    $trRule.append($tdAction);

                    $tableColorRuleBody.append($trRule);
                }

                //Add new rule line
                var $trNewRule = $("<tr class='colorRule'></tr>");
                var $tdActionNew = $("<td class='action' colspan='5'></td>");
                $trNewRule.append($tdActionNew);

                var $actionNew = $("<i class='actionAdd icon plus'></i>");
                $tdActionNew.append($actionNew);

                $actionNew.on("click", newColorRule);

                $tableColorRuleBody.append($trNewRule);
            };
            refreshColorRules();

            $divOptions.append($divColors);
        };

        var recursOnDataTree = function (arrData, executeOnObject) {
            if (!arrData) {
                return;
            }
            for (let i = 0; i < arrData.length; i++) {
                const rowObject = arrData[i];
                executeOnObject(rowObject);
                recursOnDataTree(rowObject.childs, executeOnObject);
            }
        };

        this.lastSelectedLine = -1;
        this.manageSelection = function (rowObject, eventObject) {
            var that = this;
            if (eventObject.originalEvent) {
                //jQuery events to regular event
                eventObject = eventObject.originalEvent;
            }

            var wasSelectedBefore = rowObject._sys_selected;

            var selectionMode = "single";
            if (eventObject.ctrlKey) {
                if (wasSelectedBefore) {
                    selectionMode = "remove";
                } else {
                    selectionMode = "add";
                }
            }
            if (eventObject.shiftKey && !wasSelectedBefore && rowObject._sys_lineNumber) {
                selectionMode = "addRange";
            }
            if (selectionMode === "addRange" && that.lastSelectedLine === -1) {
                selectionMode = "add";
            }

            if (selectionMode === "addRange") {
                var minLine = Math.min(that.lastSelectedLine, rowObject._sys_lineNumber);
                var maxLine = Math.max(that.lastSelectedLine, rowObject._sys_lineNumber);
                recursOnDataTree(that.allRows, rowObj => {
                    if (rowObj._sys_lineNumber >= minLine && rowObj._sys_lineNumber <= maxLine) {
                        rowObj._sys_selected = true;
                    }
                });
            } else if (selectionMode === "add" || selectionMode === "remove") {
                rowObject._sys_selected = !rowObject._sys_selected;
            } else {
                //Should be a simple click so unselect all + select or deselect the item clicked
                recursOnDataTree(that.allRows, rowObj => {
                    rowObj._sys_selected = false;
                });
                rowObject._sys_selected = !wasSelectedBefore;
            }

            //TODO Improve to send the list of selected items (in case multi Add or multi Remove)
            let isSelected = rowObject._sys_selected;
            if (that._events && typeof that._events.onSelectLine === "function") {
                that._events.onSelectLine(rowObject, isSelected);
            }
            //Save last line clicked
            that.lastSelectedLine = rowObject._sys_lineNumber || -1;

            //refresh the display
            that.refreshDisplay();
        };
    }
    return SemanticUITable;
});