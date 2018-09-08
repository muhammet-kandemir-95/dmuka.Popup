# dmuka.Popup (JavaScript Library for Web Sites)
Bu kütüphaneyi kullanarak web siteleriniz üzerinde kolaylıkla **popup** gösterebilirsiniz. Bunlara örnek verecek olursak;
* Evet/Hayır soruları
* Hızlı kaydet formları
* Önemli bildirimler

## Create Instance
```javascript
var popup = new dmuka.Popup({
            /* Variables --BEGIN */
            // --------------------

            /* Popup parent element */
            // Default : document.body
            parent: document.body,
            /* Popup theme name by css */
            // Default : ""
            theme: "",
            /* Popup main element classes */
            // Default : ""
            classes: "my-main-class",
            /* If this value is true then when popup closed, trigger dispose function as auto and you can't use this popup */
            // Default : true
            autoDisposeOnClose: false,
            /* Popup window element width */
            // Default : "50%"
            width: "200px",
            /* Popup window element height */
            // Default : "50%"
            height: "100px",
            /* Popup window element positionX */
            // Default : "center"
            // Values = [ "left", "center", "right", <string> ]
            positionX: "center",
            /* Popup window element positionY */
            // Default : "middle"
            // Values = [ "top", "middle", "bottom", <string> ]
            positionY: "middle",
            window: {
                /* Popup window element classes */
                // Default : ""
                classes: "my-window-class"
            },
            header: {
                /* Popup header element classes */
                // Default : ""
                classes: "my-header-class",
                /* Popup header element innerText */
                // Default : ""
                text: "My New Popup",
                /* Popup header element enable */
                // Default : true
                enable: true
            },
            content: {
                /* Popup content element classes */
                // Default : ""
                classes: "my-content-class",
                /* Popup content element innerText */
                // Default : ""
                // Values = [ <string>, <element> ]
                htmlOrChild: "Do you want continue?"
            },
            footer: {
                /* Popup footer element classes */
                // Default : ""
                classes: "my-footer-class",
                /* Popup footer element innerText */
                // Default : 
                /*
                    [
                        {
                            text: "Submit",
                            classes: "",
                            id: "submit",
                            focus: true,
                            key: 13
                        }
                    ]
                */
                // Values = 
                /*
                [ 
                    {
                        // Default : ""
                        text: <string>,
                        // Default : ""
                        classes: <string>,
                        // Must fill!
                        id: <string>,
                        // Default : false
                        focus: <boolean>,
                        // Default : undefined
                        key: <int>
                    },
                    ...
                ]
                */
                buttons:
                    [
                        {
                            text: "Yes",
                            classes: "my-footer-button-yes-class",
                            id: "yes",
                            focus: true
                        },
                        {
                            text: "No",
                            classes: "my-footer-button-no-class",
                            id: "no",
                            // Escape
                            key: 27
                        }
                    ],

                /* Popup footer element enable */
                // Default : true
                enable: true
            },
            closeButton: {
                /* Popup closeButton element classes */
                // Default : ""
                classes: "my-close-button-class"
            },

            // --------------------
            /* Variables --END */

            /* Events --BEGIN */
            // --------------------

            // This event working when popup add to body as first
            onLoad: function () {
                // this = popup

                var popupContent = this.DOM.content.get();
                console.log(popupContent, "My Content - onLoad");
            },
            // This event working when run "open" function
            onOpen: function () {
                // this = popup

                var popupContent = this.DOM.content.get();
                console.log(popupContent, "My Content - onOpen");
                console.log("Trigger open event");
            },
            // This event working when run "close" function
            onClose: function () {
                // this = popup

                var popupContent = this.DOM.content.get();
                console.log(popupContent, "My Content - onClose");
                console.log("Trigger close event");
            },
            // This event working when click to any footer button
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
_**Değişkenler hakkında bilmemiz gereken ana kural, değerlerin "get" fonksiyonu ile alındığı ve değerlerin "set" fonksiyonu ile güncellendiğidir!**_

### popup.DOM
Bu değişken içerisinde component'ın içerisinde DOM(Document Object Model. Örneğin : body, head, div, ...) verilerini taşımaktadır. Şablonu aşağıdaki gibidir;

```javascript
popup.DOM = {
  main: {
    get: <function():DOM> //Main Content
  },
  window: {
    get: <function():DOM> //Main Content - Window
  },
  header: {
    get: <function():DOM> //Main Content - Window - Header
  },
  content: {
    get: <function():DOM> //Main Content - Window - Content
  },
  footer: {
      content: {
        get: <function():DOM> //Main Content - Window - Footer
      },
      buttons: {
        get: <function():DOM[]> //[ Main Content - Window - Footer Button1, Main Content - Window - Footer Button2, ... ]
      },
  },
  closeButton: {
    get: <function():DOM> //Main Content - Window - Close Button
  }
}
```

#### Örnek Kullanım
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
Bu değişken içerisinde "popup" nesnesinin durum bilgisini taşımaktadır. Şablonu aşağıdaki gibidir;
```javascript
popup.popupState = {
  get: <function():string>
}
```
#### Döndüreceği değerler
##### hidden
Popup nesnesi gizli durumda.
##### visible
Popup nesnesi görünür durumda.

#### Örnek Kullanım
```javascript
var popupState = popup.popupState.get();
```

### popup.width
_**Burada önemli detay popup genişliği asla sayfanın genişliğini geçemez!**_

Bu değişken içerisinde "popup" nesnesinin genişlik bilgisini taşımaktadır. Şablonu aşağıdaki gibidir;
```javascript
popup.width = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Örnek Kullanım
```javascript
var popupWidth = popup.width.get();
popup.width.set('300px');
```

### popup.height
_**Burada önemli detay popup yüksekliği asla sayfanın yüksekliğini geçemez!**_

Bu değişken içerisinde "popup" nesnesinin yükseklik bilgisini taşımaktadır. Şablonu aşağıdaki gibidir;
```javascript
popup.height = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Örnek Kullanım
```javascript
var popupHeight = popup.height.get();
popup.height.set('300px');
```

### popup.positionX
_**Burada önemli detay popup left verisi asla 0 dan küçük olamaz!**_

Bu değişken içerisinde "popup" nesnesinin left bilgisini taşımaktadır. Şablonu aşağıdaki gibidir;
```javascript
popup.left = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Alacağı Hazır Değeler
##### "left"
Popup nesnesinin left değeri "0px" olarak alınır.
##### "center"
Popup nesnesi sayfada ortalanıcak şekilde değer alır.
##### "right"
Popup nesnesinin right değeri "0px" olarak alınır.
##### <:string>
Normal css verisi ile left değeri "**px**" veya "**%**" olarak girilebilir. Örnek : "100px", "50%", ...

#### Örnek Kullanım
```javascript
var popupPositionX = popup.positionX.get();
popup.positionX.set('100px');
popup.positionX.set('30%');
popup.positionX.set('center');
```

### popup.positionX
_**Burada önemli detay popup top verisi asla 0 dan küçük olamaz!**_

Bu değişken içerisinde "popup" nesnesinin top bilgisini taşımaktadır. Şablonu aşağıdaki gibidir;
```javascript
popup.top = {
  get: <function():string>,
  set: <function(string):string>
}
```

#### Alacağı Hazır Değeler
##### "top"
Popup nesnesinin top değeri "0px" olarak alınır.
##### "middle"
Popup nesnesi sayfada ortalanıcak şekilde değer alır.
##### "bottom"
Popup nesnesinin right değeri "0px" olarak alınır.
##### <:string>
Normal css verisi ile top değeri "**px**" veya "**%**" olarak girilebilir. Örnek : "100px", "50%", ...

#### Örnek Kullanım
```javascript
var popupPositionY = popup.positionY.get();
popup.positionY.set('100px');
popup.positionY.set('30%');
popup.positionY.set('middle');
```

## Public Functions

### popup.open
Bu fonksiyon popup nesnesini görünür hale getirir. Şablonu aşağıdaki gibidir;
```javascript
function popup.open() {
  // codes
  
  return undefined;
}
```

#### Örnek Kullanım
```javascript
popup.open();
```

### popup.close
Bu fonksiyon popup nesnesini gizli hale getirir. Şablonu aşağıdaki gibidir;
```javascript
function popup.close() {
  // codes
  
  return undefined;
}
```

#### Örnek Kullanım
```javascript
popup.close();
```

### popup.dispose
Bu fonksiyon popup nesnenisin tarayıcı üzerindeki tüm verilerini temizler ve artık kullanılamaz hale getirir. **Bunu işlemi bitmiş olan popuplar için kullanmakta fayda var**. Şablonu aşağıdaki gibidir;
```javascript
function popup.dispose() {
  // codes
  
  return undefined;
}
```

#### Örnek Kullanım
```javascript
popup.dispose();
```
