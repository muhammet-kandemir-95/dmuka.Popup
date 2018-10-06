// Create namespace
if (window["dmuka"] === undefined) {
    window["dmuka"] = {};
}

/**
 * Create Popup component
 * @param {*} parameters 
 */
dmuka.Popup = function (parameters) {
    var me = this;

    // Declare Access Modifiers
    var private = {
        variable: {},
        event: {},
        function: {}
    };
    var public = this;

    /* Variables --BEGIN */
    // --------------------

    // Declare parameter variable --BEGIN
    parameters = parameters || {};
    private.variable.parent = parameters.parent || document.body;
    private.variable.theme = parameters.theme || "";
    private.variable.classes = parameters.classes || "";
    private.variable.autoDisposeOnClose = parameters.autoDisposeOnClose === true || parameters.autoDisposeOnClose === undefined;

    private.variable.width = parameters.width || "50%";
    public.width = {
        get: function () {
            return private.variable.width;
        }
        // set will bind on init function
    };
    private.variable.height = parameters.height || "50%";
    public.height = {
        get: function () {
            return private.variable.height;
        }
        // set will bind on init function
    };

    // Values = [ "left", "center", "right", <string> ]
    private.variable.positionX = parameters.positionX || "center";
    public.positionX = {
        get: function () {
            return private.variable.positionX;
        }
        // set will bind on init function
    };
    // Values = [ "top", "middle", "bottom", <string> ]
    private.variable.positionY = parameters.positionY || "middle";
    public.positionY = {
        get: function () {
            return private.variable.positionY;
        }
        // set will bind on init function
    };

    private.variable.window = parameters.window || {};
    private.variable.window.classes = private.variable.window.classes || "";

    private.variable.header = parameters.header || {};
    private.variable.header.classes = private.variable.header.classes || "";
    private.variable.header.text = private.variable.header.text || "";
    private.variable.header.enable = private.variable.header.enable === true || private.variable.header.enable === undefined;

    private.variable.content = parameters.content || {};
    private.variable.content.classes = private.variable.content.classes || "";
    private.variable.content.htmlOrChild = private.variable.content.htmlOrChild || "";

    private.variable.footer = parameters.footer || {};
    private.variable.footer.classes = private.variable.footer.classes || "";
    private.variable.footer.buttons = private.variable.footer.buttons || [
        {
            text: "Submit",
            classes: "",
            id: "submit",
            focus: true
        }
    ];
    private.variable.footer.enable = private.variable.footer.enable === true || private.variable.footer.enable === undefined;

    private.variable.closeButton = parameters.closeButton || {};
    private.variable.closeButton.classes = private.variable.closeButton.classes || "";
    // Declare parameter variable --END

    // Declare DOM elements --BEGIN
    private.variable.DOM = {
        main: document.createElement("div"),
        window: document.createElement("div"),
        header: document.createElement("div"),
        content: document.createElement("div"),
        footer: {
            content: document.createElement("div"),
            buttons: []
        },
        closeButton: document.createElement("button")
    };
    // Fill footer.buttons by private.variable.footer.buttons.length
    for (var footerButtonIndex = 0; footerButtonIndex < private.variable.footer.buttons.length; footerButtonIndex++) {
        private.variable.DOM.footer.buttons.push(document.createElement("button"));
    }
    public.DOM = {
        main: {
            get: function () {
                return private.variable.DOM.main;
            }
        },
        window: {
            get: function () {
                return private.variable.DOM.window;
            }
        },
        header: {
            get: function () {
                return private.variable.DOM.header;
            }
        },
        content: {
            get: function () {
                return private.variable.DOM.content;
            }
        },
        footer: {
            content: {
                get: function () {
                    return private.variable.DOM.footer.content;
                }
            },
            buttons: {
                get: function () {
                    return private.variable.DOM.footer.buttons;
                }
            }
        },
        closeButton: {
            get: function () {
                return private.variable.DOM.closeButton;
            }
        }
    };
    // Declare DOM elements --END

    // Values = [ "hidden", "visible" ]
    private.variable.popupState = "hidden";
    public.popupState = {
        get: function () {
            return private.variable.popupState;
        }
    };

    // --------------------
    /* Variables --END */

    /* Events --BEGIN */
    // --------------------

    // Declare parameters events --BEGIN
    private.event.load = parameters.onLoad || function () { };
    private.event.open = parameters.onOpen || function () { };
    private.event.close = parameters.onClose || function () { };
    private.event.submitFooter = parameters.onSubmitFooter || function (id) { };
    // Declare parameters events --END

    // --------------------
    /* Events --END */

    /* Functions --BEGIN */
    // --------------------

    private.function.open = function () {
        // Only working when popupState is "hidden"
        if (private.variable.popupState === "hidden") {
            private.variable.DOM.main.setAttribute("data-lock", "true");

            setTimeout(() => {
                private.variable.popupState = "visible";
                private.variable.DOM.main.setAttribute("data-state", private.variable.popupState);

                for (var footerButtonIndex = 0; footerButtonIndex < private.variable.footer.buttons.length; footerButtonIndex++) {
                    // If user want focus to button then
                    if (private.variable.footer.buttons[footerButtonIndex].focus === true) {
                        private.variable.DOM.footer.buttons[footerButtonIndex].focus();
                    }

                    private.variable.DOM.footer.buttons.push(document.createElement("button"));
                }

                private.event.open.call(me);
            }, 100);
        }
    };
    public.open = private.function.open;

    private.function.close = function () {
        // Only working when popupState is "visible"
        if (private.variable.popupState === "visible") {
            private.variable.DOM.main.setAttribute("data-lock", "false");

            private.variable.popupState = "hidden";
            private.variable.DOM.main.setAttribute("data-state", private.variable.popupState);
            private.event.close.call(me);

            if (private.variable.autoDisposeOnClose === true) {
                private.function.dispose();
            }
        }
    };
    public.close = private.function.close;

    private.function.dispose = function () {
        for (var propName in public) {
            delete public[propName];
        }
        public.disposed = true;

        private.function.close();
        window.removeEventListener("resize", private.event.windowOnResize);

        setTimeout(() => {
            private.variable.DOM.main.remove();
        }, 500);
    };
    public.dispose = private.function.dispose;

    private.function.calculatePositionAndSize = function () {
        // Clear styles --BEGIN
        private.variable.DOM.window.style.left = null;
        private.variable.DOM.window.style.right = null;
        private.variable.DOM.window.style.top = null;
        private.variable.DOM.window.style.bottom = null;
        private.variable.DOM.window.style.width = null;
        private.variable.DOM.window.style.height = null;
        // Clear styles --END

        // Set positionX --BEGIN
        var widthWithoutCalc = "(" + private.variable.width.replace("calc", "") + ")";

        switch (private.variable.positionX) {
            case "left":
                private.variable.DOM.window.style.left = "20px";
                break;
            case "center":
                private.variable.DOM.window.style.left = "calc(50% - (" + widthWithoutCalc + " / 2))";
                break;
            case "right":
                private.variable.DOM.window.style.right = "20px";
                break;
            default:
                private.variable.DOM.window.style.left = private.variable.positionX;
                break;
        }
        // Set positionX --END

        // Set positionY --BEGIN
        var heightWithoutCalc = "(" + private.variable.height.replace("calc", "") + ")";

        switch (private.variable.positionY) {
            case "top":
                private.variable.DOM.window.style.top = "20px";
                break;
            case "middle":
                private.variable.DOM.window.style.top = "calc(50% - (" + private.variable.height + " / 2)";
                break;
            case "bottom":
                private.variable.DOM.window.style.bottom = "20px";
                break;
            default:
                private.variable.DOM.window.style.top = private.variable.positionY;
                break;
        }
        // Set positionY --END

        // Fixed min left and min top --BEGIN
        var clientRect = private.variable.DOM.window.getBoundingClientRect();
        if (clientRect.left < 0) {
            private.variable.DOM.window.style.left = "0px";
        }
        if (clientRect.top < 0) {
            private.variable.DOM.window.style.top = "0px";
        }
        // Fixed min left and min top --END

        // Set width & height --BEGIN
        private.variable.DOM.window.style.width = private.variable.width;
        private.variable.DOM.window.style.height = private.variable.height;
        // Set width & height --END
    };

    private.function.init = function () {
        // Elements add to main --BEGIN
        private.variable.DOM.main.appendChild(private.variable.DOM.window);
        private.variable.DOM.window.appendChild(private.variable.DOM.header);
        private.variable.DOM.window.appendChild(private.variable.DOM.content);
        private.variable.DOM.window.appendChild(private.variable.DOM.footer.content);
        // Footer buttons add to footer content --BEGIN
        for (var footerButtonIndex = 0; footerButtonIndex < private.variable.DOM.footer.buttons.length; footerButtonIndex++) {
            private.variable.DOM.footer.content.appendChild(private.variable.DOM.footer.buttons[footerButtonIndex]);
        }
        // Footer buttons add to footer content --END
        private.variable.DOM.window.appendChild(private.variable.DOM.closeButton);
        // Elements add to main --END

        // Load footer buttons event --BEGIN
        for (var footerButtonIndex = 0; footerButtonIndex < private.variable.DOM.footer.buttons.length; footerButtonIndex++) {
            (function (footerButtonIndex) {
                var data = private.variable.footer.buttons[footerButtonIndex];
                var element = private.variable.DOM.footer.buttons[footerButtonIndex];

                element.addEventListener("click", function (e) {
                    if (private.variable.popupState === "visible") {
                        private.event.submitFooter.call(me, data.id);
                        private.function.close();
                    }
                });

                // This is for left and right directions between footer buttons
                element.addEventListener("keydown", function (e) {
                    // Left arrow
                    if (e.which === 37) {
                        var previousFooterButtonIndex = footerButtonIndex - 1;
                        if (previousFooterButtonIndex < 0) {
                            previousFooterButtonIndex = private.variable.DOM.footer.buttons.length - 1;
                        }

                        private.variable.DOM.footer.buttons[previousFooterButtonIndex].focus();
                    }
                    // Right arrow
                    else if (e.which === 39) {
                        var nextFooterButtonIndex = footerButtonIndex + 1;
                        if (nextFooterButtonIndex > private.variable.DOM.footer.buttons.length) {
                            nextFooterButtonIndex = 0;
                        }

                        private.variable.DOM.footer.buttons[nextFooterButtonIndex].focus();
                    }
                });
            })(footerButtonIndex);
        }
        // Load footer buttons event --END

        // Load close button event --BEGIN
        private.variable.DOM.closeButton.addEventListener("click", function (e) {
            private.function.close();
        });
        // Load close button event --END

        // Set theme --BEGIN
        private.variable.DOM.main.setAttribute("data-theme", private.variable.theme);
        // Set theme --END

        // Set classes --BEGIN
        private.variable.DOM.main.setAttribute("class", "dmuka-popup " + private.variable.classes);
        private.variable.DOM.window.setAttribute("class", "dmuka-popup-window " + private.variable.window.classes);
        private.variable.DOM.header.setAttribute("class", "dmuka-popup-header " + private.variable.header.classes);
        private.variable.DOM.content.setAttribute("class", "dmuka-popup-content " + private.variable.content.classes);
        private.variable.DOM.footer.content.setAttribute("class", "dmuka-popup-footer " + private.variable.footer.classes);
        // Set footer buttons classes --BEGIN
        for (var footerButtonIndex = 0; footerButtonIndex < private.variable.DOM.footer.buttons.length; footerButtonIndex++) {
            private.variable.DOM.footer.buttons[footerButtonIndex].setAttribute("class", "dmuka-popup-footer-button " + (private.variable.footer.buttons[footerButtonIndex].classes || ""));
        }
        // Set footer buttons classes --END
        private.variable.DOM.closeButton.setAttribute("class", "dmuka-popup-closebutton " + private.variable.closeButton.classes);
        // Set classes --END

        // Set enable states --BEGIN
        private.variable.DOM.main.setAttribute("data-active-header", private.variable.header.enable === true ? "true" : "false");
        private.variable.DOM.main.setAttribute("data-active-footer", private.variable.footer.enable === true ? "true" : "false");
        // Set enable states --END

        // Set element contents --BEGIN
        private.variable.DOM.header.innerText = private.variable.header.text;

        if (typeof private.variable.content.htmlOrChild === "string") {
            private.variable.DOM.content.innerHTML = private.variable.content.htmlOrChild;
        }
        else {
            private.variable.DOM.content.appendChild(private.variable.content.htmlOrChild);
        }

        for (var footerButtonIndex = 0; footerButtonIndex < private.variable.DOM.footer.buttons.length; footerButtonIndex++) {
            private.variable.DOM.footer.buttons[footerButtonIndex].innerText = private.variable.footer.buttons[footerButtonIndex].text || "";
        }
        // Set element contents --END

        // Set defaults --BEGIN
        private.variable.DOM.main.setAttribute("data-state", "hidden");
        // Set defaults --END

        // Add set to properties --BEGIN
        public.width.set = function (value) {
            private.variable.width = value;
            private.function.calculatePositionAndSize();
        }
        public.height.set = function (value) {
            private.variable.height = value;
            private.function.calculatePositionAndSize();
        }
        public.positionX.set = function (value) {
            private.variable.positionX = value;
            private.function.calculatePositionAndSize();
        }
        public.positionY.set = function (value) {
            private.variable.positionY = value;
            private.function.calculatePositionAndSize();
        }
        // Add set to properties --END

        // Add window resize events --BEGIN
        private.event.windowOnResize = function (e) {
            private.function.calculatePositionAndSize();
        };
        window.addEventListener("resize", private.event.windowOnResize);
        // Add window resize events --END

        // Main add to body
        private.variable.parent.appendChild(private.variable.DOM.main);

        private.function.calculatePositionAndSize();

        private.event.load.call(me);
    }

    // --------------------
    /* Functions --END */

    private.function.init();
};