<p align="center">
    <a href="https://www.npmjs.com/package/vue-lazy-image-loading"><img src="https://img.shields.io/npm/dt/vue-lazy-image-loading.svg" alt="Downloads"></a>
    <a href="https://www.npmjs.com/package/vue-lazy-image-loading"><img src="https://img.shields.io/npm/v/vue-lazy-image-loading.svg" alt="Version"></a>
    <a href="https://www.npmjs.com/package/vue-lazy-image-loading"><img src="https://img.shields.io/npm/l/vue-lazy-image-loading.svg" alt="License"></a>
</p>

# Vue Lazy Image Loading

Vue progressive image and background loading plugin.

## Installation

```bash
npm install vue-lazy-image-loading
```

## Usage

```js
import Vue from 'vue'
import VueLazyImageLoading from 'vue-lazy-image-loading'

Vue.use(VueLazyImageLoading)
```

#### Lazy image

Instead of using the normal `img` tag to load images

```html
<img src="https://unsplash.it/1920/1080?image=10" />
```

use the `lazy-img` component already globally available after the plugin installation

```html
<lazy-img src="https://unsplash.it/1920/1080?image=10" />
```

#### Lazy background

It is also possible to apply lazy images as backgrounds and it will have the same props as the lazy-img component

```html
<lazy-background src="https://unsplash.it/1920/1080?image=10" />
```

## Global properties

There is all properties you can use for both `lazy-img` and `lazy-background` components.

### Placeholder 
To be able to immediately show some feedback to the user, it is possible to pass a placeholder image, which could be also 1% the size of the main image: it will be blurred so you can go crazy with optimizations here.

In this example I actually use the same image, but you have the idea here

```html
<lazy-img
  src="https://unsplash.it/1920/1080?image=10"
  placeholder="https://unsplash.it/1920/1080?image=10"
/>
```

### Blur

It is possible to adjust the level of blur applied to the placeholder image

```html
<lazy-img
  src="https://unsplash.it/1920/1080?image=10"
  placeholder="https://unsplash.it/1920/1080?image=10"
  :blur="30"
/>
```

### Ratio

It is possible to remove the padding that adds the aspect ratio to the container.


```html
<lazy-img
  src="https://unsplash.it/1920/1080?image=10"
  no-ratio
/>
```

It is also possible to manually specify the image aspact ratio when you know it. It allows the placeholder to be displayed in the correct aspect ratio. The ratio is calculated as `height / width`.

```html
<lazy-img
  src="https://unsplash.it/1920/1080?image=10"
  aspect-ratio="1.5"
/>
```

## `lazy-background` properties

There is all properties you can use for the `lazy-background` component only.

### Background position

Allows you to set the value of the `background-position` CSS property.

The default value is `0% 0%`.

```html
<lazy-background
  src="https://unsplash.it/1920/1080?image=10"
  position="center"
/>
```

### Background size

Allows you to set the value of the `background-size` CSS property.

The default value is `cover`.

```html
<lazy-background
  src="https://unsplash.it/1920/1080?image=10"
  size="contain"
/>
```

### Background repeat

Allows you to set the value of the `background-repeat` CSS property.

The default value is `no-repeat`.

```html
<lazy-background
  src="https://unsplash.it/1920/1080?image=10"
  repeat="repeat-x"
/>
```

### The slot

The lazy-background has a "content" slot, which can hold content that needs to be rendered over the background image and also can hold a preloader.
This slot has one property called "visible" that tells you when, for example, a preloader needs to be visible or not.

```html
<lazy-background src="https://unsplash.it/1920/1080?image=10">
  <div slot="content" slot-scope="{ visible }">
    <p>I am some content to display over the image</p>
    <div v-show="visible">I am the preloader</div>
  </div>
</lazy-background>
```

## Image fallback

In case of a loading error of the main image, it is possible to add a fallback image which can display an error image or just another image.

```html
<lazy-img
  src="https://this_url_should_cause_an_error"
  fallback="https://unsplash.it/1920/1080?image=10"
/>
```

## Events

Each component emits an event whenever an image is loaded.

Because we usually load two images, a main image and a placeholder, two events are dispatched `onLoad` and `onLoadPlaceholder`

in your js file

```js
export default {
  methods: {
    onLoad () {
      // main image is loaded
    },
    onLoadPlaceholder () {
      // placeholder image is loaded
    },
    onError (error) {
      // main image error
    },
    onErrorPlaceholder (error) {
      // placeholder image error
    }
  }
}
```

in the html just add the events you need to listen to

```html
<lazy-img
  @onLoad="onLoad"
  @onLoadPlaceholder="onLoadPlaceholder"
  @onError="onError"
  @onErrorPlaceholder="onErrorPlaceholder"
  src="https://unsplash.it/1920/1080?image=10"
  placeholder="https://unsplash.it/1920/1080?image=10"
/>
```


## Options

During the installation process it is possible to pass some default global options

#### Cached images
*	type: Boolean
*	default: true

Cached images are checked by default. This check kills the animation if the image was already loaded once.
If you would like to show the animation every time, even when is not needed, you can simply use the plugin options like so:

```js
Vue.use(VueLazyImageLoading, {
  cache: false
})
```

#### placeholder
*	type: String
*	required: false

```js
Vue.use(VueLazyImageLoading, {
  placeholder: 'https://unsplash.it/1920/1080?image=20'
})
```

#### blur
*	type: Number
*	required: false
*	default: 5

```js
Vue.use(VueLazyImageLoading, {
  blur: 30
})
```

#### delay
*	type: Number
*	default: 0

This options is for debug only. It lets you have an easy look at the placeholder before the main image is fully loaded.

```js
Vue.use(VueLazyImageLoading, {
  delay: 2000 // 2 seconds before the image is displayed
})
```

#### position
*	type: String
*	default: '0% 0%'

Allows you to set the value of the `background-position` CSS property.
Will only work `lazy-background` component.

```js
Vue.use(VueLazyImageLoading, {
  position: 'center'
})
```

#### size
*	type: String
*	default: 'cover'

Allows you to set the value of the `background-size` CSS property.
Will only work `lazy-background` component.

```js
Vue.use(VueLazyImageLoading, {
  size: 'contain'
})
```

#### repeat
*	type: String
*	default: 'no-repeat'

Allows you to set the value of the `background-repeat` CSS property.
Will only work `lazy-background` component.

```js
Vue.use(VueLazyImageLoading, {
  repeat: 'repeat-x'
})
```

**Global options like `placeholder` and `blur` will be applied only to components that don't specify their own options**
