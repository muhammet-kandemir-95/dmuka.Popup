# dmuka.Popup (JavaScript Library for Web Sites)
Demo : http://www.bilgisayarafisildayanadam.com/dmuka.Popup/

Bu kütüphaneyi kullanarak web siteleriniz üzerinde kolaylıkla **popup** gösterebilirsiniz. Bunlara örnek verecek olursak;
* Evet/Hayır soruları
* Hızlı kaydet formları
* Önemli bildirimler

## Create Instance

### Variables
Name | Type | Default Value | Description
---- | ---- | ------------- | -----------
parent | HTML Element | document.body | Popup parent element.
theme | string:enum | "" | Popup theme name by css.
classes | string:class | "" | Popup main element classes.
autoDisposeOnClose | boolean | true | If this value is true then when popup closed, trigger dispose function as auto.
width | string:css | "50%" | Popup window element width.
height | string:css | "50%" | Popup window element height.
positionX | string:enum, string:css | "center" | Popup window element position X.
positionY | string:enum, string:css | "middle" | Popup window element position Y.
window.classes | string:class | "" | Popup window element classes.
header.classes | string:class | "" | Popup header element classes.
header.text | string | "" | Popup header element innerText.
header.enable | boolean | true | Popup header element enable.
content.classes | string:class | "" | Popup content element classes.
content.htmlOrChild | string:html, HTML Element | "" | Popup content html or element.
footer.classes | string:class | "" | Popup footer element classes
footer.buttons | object[] | [] | Footer button list.
footer.enable | boolean | true | Popup footer element enable
closeButton.classes | string:class | "" | Popup closeButton element classes.

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
onLoad | () | undefined | When reate instance and elements added to body.
onOpen | () | undefined | When execute "open" function.
onClose | () | undefined | When execute "close" or "dispose" function.
onSubmitFooter | (footerButtonId) | undefined | When click to any footer button.

#### Örnek Kullanım
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
* **hidden** = Popup nesnesi gizli durumda.
* **visible** = Popup nesnesi görünür durumda.

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
* **"left"** = Popup nesnesinin left değeri "0px" olarak alınır.
* **"center"** = Popup nesnesi sayfada ortalanıcak şekilde değer alır.
* **"right"** = Popup nesnesinin right değeri "0px" olarak alınır.
* **string** = Normal css verisi ile left değeri "**px**" veya "**%**" olarak girilebilir. Örnek : "100px", "50%", ...

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
* **"top"** = Popup nesnesinin top değeri "0px" olarak alınır.
* **"middle"** = Popup nesnesi sayfada ortalanıcak şekilde değer alır.
* **"bottom"** = Popup nesnesinin right değeri "0px" olarak alınır.
* **string** = Normal css verisi ile top değeri "**px**" veya "**%**" olarak girilebilir. Örnek : "100px", "50%", ...

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
