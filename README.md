# dmuka.Popup (JavaScript Library for Web Sites)
Demo : https://muhammet-kandemir-95.github.io/dmuka.Popup/

By using this library, you can easily display popup on your websites. For instance;
* Yes/ No questions
* Quick save forms
* Important notifications

## Create Instance

### Variables
Name | Type | Default Value | Description
---- | ---- | ------------- | -----------
**parent** | _HTML Element_ | document.body | Popup parent element.
**theme** | _[string:enum](#theme-values)_ | "" | Popup theme name by css.
**classes** | _string:class_ | "" | Popup main element classes.
**autoDisposeOnClose** | _boolean_ | true | If this value is true then when popup closed, trigger dispose function as auto.
**width** | _string:css_ | "50%" | Popup window element width.
**height** | _string:css_ | "50%" | Popup window element height.
**positionX** | _[string:enum](#positionx-values)_, _string:css_ | "center" | Popup window element position X.
**positionY** | _[string:enum](#positiony-values)_, _string:css_ | "middle" | Popup window element position Y.
**window.classes** | _string:class_ | "" | Popup window element classes.
**header.classes** | _string:class_ | "" | Popup header element classes.
**header.text** | _string_ | "" | Popup header element innerText.
**header.enable** | _boolean_ | true | Popup header element enable.
**content.classes** | _string:class_ | "" | Popup content element classes.
**content.htmlOrChild** | _string:html_, _HTML Element_ | "" | Popup content html or element.
**footer.classes** | _string:class_ | "" | Popup footer element classes
**footer.buttons** | _[object](#footerbuttons-schema)_[ ] | [ ] | Footer button list.
**footer.enable** | _boolean_ | true | Popup footer element enable
**closeButton.classes** | string:class | "" | Popup closeButton element classes.

#### theme Values
* **""** = Default white theme.
* **"blue"** = Blue color theme.
* **"green"** = Green color theme.
* **"yellow"** = Yellow color theme.
* **"red"** = Red color theme.
* **"gray"** = Gray color theme.
* **"dark"** = Dark color theme.

#### positionX Values
* **"left"** = Left is "20px".
* **"center"** = Position always is center.
* **"right"** = Right is "20px".
* **string** = Left position as css.

#### positionY Values
* **"top"** = Top is "20px".
* **"middle"** = Position always is middle.
* **"bottom"** = Bottom is "20px".
* **string** = Top position as css.

#### footer.buttons Schema
```javascript
{
  // Default : ""
  text: <string>,
  // Default : ""
  classes: <string>,
  // Must fill!
  id: <string>,
  // Default : false
  focus: <boolean>
}
```

### Events
Name | Parameters | Return Type | Run Time
---- | ---- | ------------- | -----------
**onLoad** | _()_ | undefined | When create instance and elements added to body.
**onOpen** | _()_ | undefined | When execute "[open](#popupopen)" function.
**onClose** | _()_ | undefined | When execute "[close](#popupclose)" or "[dispose](#popupdispose)"(But when "[popupState](#popuppopupstate)" is "visible") function.
**onSubmitFooter** | _(footerButtonId)_ | undefined | When click to any footer button.

#### Example Usage
```javascript
var popup = new dmuka.Popup({
            /* Variables --BEGIN */
            // --------------------
            
            parent: document.body,
            theme: "",
            classes: "my-main-class",
            autoDisposeOnClose: false,
            width: "200px",
            height: "100px",
            positionX: "center",
            positionY: "middle",
            window: {
                classes: "my-window-class"
            },
            header: {
                classes: "my-header-class",
                text: "My New Popup",
                enable: true
            },
            content: {
                classes: "my-content-class",
                htmlOrChild: "Do you want continue?"
            },
            footer: {
                classes: "my-footer-class",
                buttons:
                    [
                        {
                            text: "Yes",
                            classes: "my-footer-button-yes-class",
                            id: "yes"
                        },
                        {
                            text: "No",
                            classes: "my-footer-button-no-class",
                            id: "no"
                        }
                    ],
                enable: true
            },
            closeButton: {
                classes: "my-close-button-class"
            },

            // --------------------
            /* Variables --END */

            /* Events --BEGIN */
            // --------------------
            
            onLoad: function () {
                // this = popup

                var popupContent = this.DOM.content.get();
                console.log(popupContent, "My Content - onLoad");
            },
            onOpen: function () {
                // this = popup

                var popupContent = this.DOM.content.get();
                console.log(popupContent, "My Content - onOpen");
                console.log("Trigger open event");
            },
            onClose: function () {
                // this = popup

                var popupContent = this.DOM.content.get();
                console.log(popupContent, "My Content - onClose");
                console.log("Trigger close event");
            },
            onSubmitFooter: function (id) {
                // this = popup

                var popupContent = this.DOM.content.get();
                console.log(popupContent, "My Content - onSubmitFooter");

                var footerButtonId = id;
                console.log("Clicked : " + footerButtonId + " ID Button");
            }

            // --------------------
            /* Events --END */
        });
```

## Public Variables
_**The basic rule you need to know about Variables is that, they are received with “get” function and updated with “set” function!**_

### popup.DOM
This variable includes DOM (Document Object Model; ex; body, head, div…) data within component. Template is represented below;

```javascript
popup.DOM = {
  //Main Content
  main: {
    get: <function():DOM>
  },
  //Main Content - Window
  window: {
    get: <function():DOM>
  },
  //Main Content - Window - Header
  header: {
    get: <function():DOM>
  },
  //Main Content - Window - Content
  content: {
    get: <function():DOM>
  },
  footer: {
      //Main Content - Window - Footer
      content: {
        get: <function():DOM> 
      },
      //[ Main Content - Window - Footer Button1, Main Content - Window - Footer Button2, ... ]
      buttons: {
        get: <function():DOM[]>
      },
  },
  //Main Content - Window - Close Button
  closeButton: {
    get: <function():DOM>
  }
}
```

#### Example Usage
```javascript
var mainElement = popup.DOM.main.get();
var windowElement = popup.DOM.window.get();
var headerElement = popup.DOM.header.get();
var contentElement = popup.DOM.content.get();
var footerContentElement = popup.DOM.footer.content.get();
var footerButtonsElement = popup.DOM.footer.buttons.get();
var closeButtonElement = popup.DOM.closeButton.get();
```

### popup.popupState
This variable obtains the status information of “popup” item. Template is represented below;
```javascript
popup.popupState = {
  get: <function():string>
}
```
#### Return Values
* **hidden** = Popup item is hidden.
* **visible** = Popup item is visible.

#### Example Usage
```javascript
var popupState = popup.popupState.get();
```

### popup.width
_**The important fact here is that, popup width cannot outgrow the width of page!**_

This variable includes the width data of “popup” item. Template is represented below;
```javascript
popup.width = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Example Usage
```javascript
var popupWidth = popup.width.get();
popup.width.set('300px');
```

### popup.height
_**The important fact here is that, the height of popup cannot outgrow the height of page!**_

This variable obtains the height data of “popup” item. Template is represented below;
```javascript
popup.height = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Example Usage
```javascript
var popupHeight = popup.height.get();
popup.height.set('300px');
```

### popup.positionX
_**The important fact here is that, popup data can never be less that 0!**_

This variable includes the left data of “popup” item. Template is represented below;
```javascript
popup.left = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Default values
* **"left"** = The left value of popup item is assigned as “0px”
* **"center"** = Popup item is rated to be positioned in the centre of the page.
* **"right"** = The right value of popup item is assigned as “0px”
* **string** = Normal css data and left value can be entered as “px” or “%” Example: "100px", "50%", ...

#### Example Usage
```javascript
var popupPositionX = popup.positionX.get();
popup.positionX.set('100px');
popup.positionX.set('30%');
popup.positionX.set('center');
```

### popup.positionY
_**The important fact here is that, the top popup data can never be less than 0!**_

This variable obtains the top data of “popup” item. Template is represented below;
```javascript
popup.top = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Default Values
* **"top"** = The top value of popup item is assigned as “0px”
* **"middle"** = Popup item is rated to be positioned in the middle of the page.
* **"bottom"** = The bottom value of popup item is assigned as “0px”
* **string** = Normal css data and top value can be entered as "px" or "%" Example: "100px", "50%"...

#### Example Usage
```javascript
var popupPositionY = popup.positionY.get();
popup.positionY.set('100px');
popup.positionY.set('30%');
popup.positionY.set('middle');
```

## Public Functions

### popup.open
This function makes popup item visible. Template is represented below;
```javascript
function popup.open() {
  // codes
  
  return undefined;
}
```

#### Example Usage
```javascript
popup.open();
```

### popup.close
This function hides popup item. Template is represented below;
```javascript
function popup.close() {
  // codes
  
  return undefined;
}
```

#### Example Usage
```javascript
popup.close();
```

### popup.dispose
This function cleans all the data on browser and makes it unavailable. **It is better to use this process on finished popups.** Template is represented below;
```javascript
function popup.dispose() {
  // codes
  
  return undefined;
}
```

#### Example Usage
```javascript
popup.dispose();
```
