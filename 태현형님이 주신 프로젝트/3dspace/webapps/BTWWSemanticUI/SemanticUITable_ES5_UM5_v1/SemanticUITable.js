/**
 * BT WW Competencies Center - Fast Prototypes Team
 * @author UM5
 *
 * Based on Code from II2
 */

define("BTWWSemanticUI/SemanticUITable_ES5_UM5_v1/SemanticUITable", ["UWA/Drivers/jQuery", "css!BTWWLibrairies/semantic-ui/semantic.min"], function($) {
    /**
     * Semantic UI Table constructor
     *
     * Options are :
     * - config : default configuration for the Table, can be changed later on
     * - id : the html tag id that will be set for the Table
     * - parentId : the id of the html tag to be append into. If not define, no append is done and you can do it manually after by getting $table
     * - style : Style to add to the differents levels of the html Table
     *
     * config format :
     * {
     *  rowsFunction: function(row, trElement){},                                   Optional
     *  headersFunction: function(index, thElement){},                              Optional
     *  columns:[
     *      {
     *          header: "Some String",                                              Mandatory
     *          width: "123px",                                                     Optional
     *          cell: function(rowObject, columnDef){return String||HTMLElement},   Mandatory
     *          html: function(rowObject, tdElement, columnDef){}                   Optional
     *          group: "Some String"                                                Optional
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
     * @param {any} options Options to use to construct the Table
     */
    function SemanticUITable(options) {
        this.$table = null;
        this.$thead = null;
        this.$tbody = null;

        this._id = options.id || "semanticTable-1"; //Set _id for the Table

        this._tableConfig = options.config || { columns: [] }; //Set _tableConfig

        this._tableConfig.style = options.style || {};

        this._initTableDOM = function() {
            this.$table = $("<table id=" + this._id + "></table>")
                .addClass("ui celled table")
                .addClass(this._tableConfig.style.table);
            this.$thead = $("<thead></thead>").appendTo(this.$table);
            this.$tbody = $("<tbody></tbody>").appendTo(this.$table);

            this.$thead.addClass(this._tableConfig.style.header);
            this.$tbody.addClass(this._tableConfig.style.body);

            this._initTableHeaders();
        };

        this._initTableHeaders = function() {
            var $trHead = $("<tr></tr>");

            var currentGroup = "";
            var $trGroup = $("<tr class='group'></tr>");
            var $thGroup = null;
            var addGroup = false;

            for (var i = 0; i < this._tableConfig.columns.length; i++) {
                var columnDef = this._tableConfig.columns[i];
                var $th = $("<th class='single line' style='" + (columnDef.width ? "width:" + columnDef.width + ";" : "") + "'>" + columnDef.header + "</th>");
                $th.addClass(this._tableConfig.style.header);
                $trHead.append($th);
                if (typeof this._tableConfig.headersFunction === "function") {
                    this._tableConfig.headersFunction(i, $th.get(0));
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

        this.injectIn = function(parentHTMLElement) {
            $(parentHTMLElement).append(this.$table);
        };

        this.clearRows = function() {
            this.$tbody.empty();
        };

        this.addRows = function(arrRows, level, parentRow) {
            if (typeof level === "undefined") level = 0;
            for (var i = 0; i < arrRows.length; i++) {
                var rowObject = arrRows[i];

                rowObject.level = level; // So it can be used by cell functions
                rowObject.parentRow = parentRow; // So it can be used by cell functions

                var $tr = $("<tr></tr>");
                $tr.addClass(this._tableConfig.style.rows);

                if (typeof this._tableConfig.onSelectLine === "function") {
                    $tr.on("click", this._tableConfig.onSelectLine);
                }

                if (typeof this._tableConfig.rowsFunction === "function") {
                    this._tableConfig.rowsFunction(rowObject, $tr.get(0));
                }

                for (var j = 0; j < this._tableConfig.columns.length; j++) {
                    var columnDef = this._tableConfig.columns[j];
                    var $td = $("<td></td>");
                    $td.append(columnDef.cell(rowObject, columnDef));
                    if (typeof columnDef.html === "function") {
                        columnDef.html(rowObject, $td.get(0), columnDef);
                    }
                    $tr.append($td);
                }

                this.$tbody.append($tr);

                if (
                    rowObject.childs &&
                    rowObject.childs.length > 0 &&
                    (typeof rowObject.expanded === "undefined" || (typeof rowObject.expanded !== "undefined" && rowObject.expanded))
                ) {
                    this.addRows(rowObject.childs, level + 1, rowObject);
                }
            }
        };

        this.setColumnsConfig = function(newColumns) {
            this._tableConfig.columns = newColumns;
            this.clearRows();
            this.$thead.empty();
            this._initTableHeaders();
        };
    }
    return SemanticUITable;
});
