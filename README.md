# Shosetsu Reader

The Shosetsu Reader is a JavaScript class that allows you to read and navigate through novels. It provides a convenient way to load and display novel pages as you scroll through the content.

## Features

- Automatic loading of next pages as you scroll
- Intersection Observer API for efficient page loading
- Configurable options for customization

## Installation

To use the Shosetsu Reader in your project, you can simply include the `shosetsu.js` file in your HTML:

```html
<script src="shosetsu.js"></script>
```

## Usage

To use the Shosetsu Reader, you need to create an instance of the `Shosetsu` class and provide the necessary configuration options:

```javascript
const reader = new Shosetsu({
  // Configuration options here
});
```

Once you have created an instance of the `Shosetsu` class, you can start using its methods to navigate through the novel pages.

## Classes

<dl>
<dt><a href="#Shosetsu">Shosetsu</a></dt>
<dd><p>Shosetsu reader.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Config">Config</a> : <code>object</code></dt>
<dd><p>The configuration object.</p>
</dd>
<dt><a href="#Selector">Selector</a> : <code>object</code></dt>
<dd><p>The selector object containing various CSS selectors.</p>
</dd>
<dt><a href="#Functions">Functions</a> : <code>object</code></dt>
<dd><p>The function object containing various functions.</p>
</dd>
<dt><a href="#getNextPage">getNextPage</a> ⇒ <code>string</code></dt>
<dd></dd>
<dt><a href="#getChapterDetail">getChapterDetail</a> ⇒ <code>HTMLElement</code> | <code>null</code></dt>
<dd></dd>
</dl>

<a name="Shosetsu"></a>

## Shosetsu
Shosetsu reader.

**Kind**: global class  
**Author**: Houtar  

* [Shosetsu](#Shosetsu)
    * [new Shosetsu(config)](#new_Shosetsu_new)
    * _instance_
        * [.config](#Shosetsu+config) ⇒ <code>object</code>
        * [.config](#Shosetsu+config)
        * [.setTitle()](#Shosetsu+setTitle) ⇒ <code>void</code>
        * [.optimizeStyles()](#Shosetsu+optimizeStyles) ⇒ <code>void</code>
        * [.init(isFirstLoaded)](#Shosetsu+init) ⇒ <code>void</code>
        * [.getNextPage()](#Shosetsu+getNextPage) ⇒ <code>Promise.&lt;void&gt;</code>
        * [.forceGetNextPage()](#Shosetsu+forceGetNextPage) ⇒ <code>Promise.&lt;void&gt;</code>
    * _static_
        * [.removeElement(selector)](#Shosetsu.removeElement) ⇒ <code>void</code>
        * [.progress()](#Shosetsu.progress) ⇒ <code>void</code>
        * [.styleTitle(titleElement)](#Shosetsu.styleTitle) ⇒ <code>void</code>

<a name="new_Shosetsu_new"></a>

### new Shosetsu(config)
Constructs a new instance of the Shosetsu class.


| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Config</code>](#Config) | The configuration object. |

<a name="Shosetsu+config"></a>

### shosetsu.config ⇒ <code>object</code>
Gets the configuration object.

**Kind**: instance property of [<code>Shosetsu</code>](#Shosetsu)  
**Returns**: <code>object</code> - The configuration object.  
<a name="Shosetsu+config"></a>

### shosetsu.config
Sets the configuration object.

**Kind**: instance property of [<code>Shosetsu</code>](#Shosetsu)  

| Param | Type | Description |
| --- | --- | --- |
| config | <code>object</code> | The new configuration object. |

<a name="Shosetsu+setTitle"></a>

### shosetsu.setTitle() ⇒ <code>void</code>
Sets the document title based on the provided selector.

**Kind**: instance method of [<code>Shosetsu</code>](#Shosetsu)  
<a name="Shosetsu+optimizeStyles"></a>

### shosetsu.optimizeStyles() ⇒ <code>void</code>
Optimizes the styles of elements based on the provided selector.

**Kind**: instance method of [<code>Shosetsu</code>](#Shosetsu)  
<a name="Shosetsu+init"></a>

### shosetsu.init(isFirstLoaded) ⇒ <code>void</code>
Initializes the reader with the specified configurations.

**Kind**: instance method of [<code>Shosetsu</code>](#Shosetsu)  

| Param | Type | Description |
| --- | --- | --- |
| isFirstLoaded | <code>boolean</code> | Indicates whether it is the first time the reader is loaded. |

<a name="Shosetsu+getNextPage"></a>

### shosetsu.getNextPage() ⇒ <code>Promise.&lt;void&gt;</code>
Fetches and appends the next page of the novel to the DOM.

**Kind**: instance method of [<code>Shosetsu</code>](#Shosetsu)  
**Returns**: <code>Promise.&lt;void&gt;</code> - A promise that resolves when the next page is fetched and appended successfully.  
<a name="Shosetsu+forceGetNextPage"></a>

### shosetsu.forceGetNextPage() ⇒ <code>Promise.&lt;void&gt;</code>
Forces the retrieval of the next page.

**Kind**: instance method of [<code>Shosetsu</code>](#Shosetsu)  
<a name="Shosetsu.removeElement"></a>

### Shosetsu.removeElement(selector) ⇒ <code>void</code>
Removes all elements matching the given selector from the DOM.

**Kind**: static method of [<code>Shosetsu</code>](#Shosetsu)  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The CSS selector used to select the elements to be removed. |

<a name="Shosetsu.progress"></a>

### Shosetsu.progress() ⇒ <code>void</code>
Displays a progress bar indicating the reading progress.

**Kind**: static method of [<code>Shosetsu</code>](#Shosetsu)  
<a name="Shosetsu.styleTitle"></a>

### Shosetsu.styleTitle(titleElement) ⇒ <code>void</code>
Styles the title element.

**Kind**: static method of [<code>Shosetsu</code>](#Shosetsu)  

| Param | Type | Description |
| --- | --- | --- |
| titleElement | <code>HTMLElement</code> | The title element to style. |

<a name="Config"></a>

## Config : <code>object</code>
The configuration object.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| selector | [<code>Selector</code>](#Selector) | The selector object containing various CSS selectors. |
| function | [<code>Functions</code>](#Functions) | The function object containing various functions. |

<a name="Selector"></a>

## Selector : <code>object</code>
The selector object containing various CSS selectors.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| title | <code>string</code> | The CSS selector for the div that contains the title only. |
| readContentSet | <code>string</code> | The CSS selector for the reader background. |
| readDetail | <code>string</code> | The CSS selector for the container that holds the text and title. |
| read_chapterDetail | <code>string</code> | The CSS selector for the container that holds the text. |
| removeList | <code>Array.&lt;string&gt;</code> | An array of CSS selectors for elements to be removed. |
| pageNav | <code>string</code> | The CSS selector for the page navigation container. |
| encoding | <code>string</code> | A specific character encoding, like utf-8, iso-8859-2, koi8, cp1261, gbk, etc. |

<a name="Functions"></a>

## Functions : <code>object</code>
The function object containing various functions.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| function.getNextPage | [<code>getNextPage</code>](#getNextPage) | A function that returns the URL of the next page. |
| function.getChapterDetail | [<code>getChapterDetail</code>](#getChapterDetail) | A function that returns the chapter detail element. |

<a name="getNextPage"></a>

## getNextPage ⇒ <code>string</code>
**Kind**: global typedef  
**Returns**: <code>string</code> - The URL of the next page.  

| Param | Type | Description |
| --- | --- | --- |
| currentPage | <code>string</code> | The URL of the current page. |

<a name="getChapterDetail"></a>

## getChapterDetail ⇒ <code>HTMLElement</code> \| <code>null</code>
**Kind**: global typedef  
**Returns**: <code>HTMLElement</code> - The chapter detail element.<code>null</code> - If the chapter detail element is not found.  

| Param | Type | Description |
| --- | --- | --- |
| nextPageDoc | <code>Document</code> | The document object of the next page. |

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).