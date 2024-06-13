/**
 * BT WW Competencies Center - Fast Prototypes Team
 * @author UM5
 */

define(
    "BTWWSemanticUI/SemanticUIMessage_ES5_UM5_v1/SemanticUIMessage",
    ["UWA/Drivers/jQuery", "css!BTWWLibrairies/semantic-ui/semantic.min", "css!BTWWSemanticUI/SemanticUIMessage_ES5_UM5_v1/SemanticUIMessage"],
    function($) {
        var SemanticUIMessage = {
            mapContainer: {},
            initContainer: function(options) {
                var nameCont = options.name || "main";
                var parentContainer = options.parent;
                var zIdx = options.zIndex || 1000;

                var $divMessagesContainer = $("<div class='topRightMessages'></div>");
                $divMessagesContainer.css("z-index", zIdx);
                $(parentContainer).append($divMessagesContainer);

                SemanticUIMessage.mapContainer[nameCont] = $($divMessagesContainer);
            },
            addNotif: function(options) {
                /* options :
                level: "error",
                title: "Error in WebService Response",
                message: JSON.stringify(dataResp),
                sticky: false,
                timeout: 2500
                */

                var containerName = options.container || "main";

                var classMessage = options.level || "info";
                var $divMessage = $("<div class='ui " + classMessage + " floating message'></div>");

                var $iconClose = $("<i class='close icon'></i>");
                $iconClose.on("click", function(ev) {
                    $(this)
                        .closest(".message")
                        .fadeOut(200, function() {
                            $(this).remove();
                        });
                });
                $divMessage.append($iconClose);

                var strHeader = options.title || false;
                if (strHeader) {
                    var $divHeader = $("<div class='header'>" + strHeader + "</div>");
                    $divMessage.append($divHeader);
                }

                $divMessage.append(options.message || "");

                SemanticUIMessage.mapContainer[containerName].append($divMessage);

                var timeout = options.timeout || 2500;
                if (!options.sticky) {
                    var timeoutCallID = setTimeout(
                        function($divToRemove) {
                            $divToRemove.fadeOut(300, function() {
                                $(this).remove();
                            });
                        },
                        timeout,
                        $divMessage
                    );

                    var $divProgressSticky = $("<div class='progressSticky'></div>");
                    $divProgressSticky.css("width", "100%");
                    $divMessage.append($divProgressSticky);

                    setTimeout(function() {
                        $divProgressSticky.css("transition", "width " + timeout + "ms linear");
                        $divProgressSticky.css("width", "0%");
                    }, 10);

                    $divMessage.on("mouseenter", function() {
                        clearTimeout(timeoutCallID);
                        $divProgressSticky.remove();
                        $(this).off("mouseenter");
                    });
                }
            }
        };

        return SemanticUIMessage;
    }
);
