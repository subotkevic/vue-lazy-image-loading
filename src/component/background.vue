<template>
  <component :is="tag" :class="['lazy-background']" v-bind="$attrs">
    <div v-if="cached" :style="wrapperStyle">
      <div class="lazy-background-image" :style="imageStyle"></div>

      <div class="lazy-background-slot">
        <slot name="content" />
      </div>
    </div>

    <span v-else>
      <div v-if="!shouldImageRender">
        <canvas
          width="1"
          height="1"
          class="lazy-background-canvas"
          ref="canvas">
        </canvas>
        
        <img ref="main" :src="image" hidden>
      </div>

      <div :style="wrapperStyle">
        <transition
          enter-class="lazy-background-enter"
          enter-active-class="lazy-background-before">
          <div v-if="shouldImageRender" class="lazy-background-image" :style="imageStyle"></div>
        </transition>

        <div class="lazy-background-slot">
          <slot name="content" :visible="!shouldImageRender" />
        </div>

        <transition
          enter-class="lazy-background-enter"
          enter-active-class="lazy-background-before">
          <div
            v-if="shouldPlaceholderRender"
            class="lazy-background-placeholder"
            :style="placeholderStyle">
          </div>
        </transition>
      </div>
    </span>
  </component>
</template>

<script>
  import image from '../mixin/image'

  export default {
    name: 'lazy-background',

    props: {
      noRatio: {
        type: Boolean,
        required: false
      },
      tag: {
        type: String,
        default: 'div',
      },
      position: {
        type: String,
        default: '0% 0%',
      },
      size: {
        type: String,
        default: 'cover',
      },
      repeat: {
        type: String,
        default: 'no-repeat',
      },
    },

    mixins: [
      image
    ],

    data () {
      return {
        applyRatio: ! this.noRatio,
      }
    },

    computed: {
      imageStyle () {
        return {
          backgroundImage: `url(${this.image})`,
          backgroundPosition: this.position,
          backgroundSize: this.size,
          backgroundRepeat: this.repeat,
        }
      },

      placeholderStyle () {
        return {
          ...this.blurStyle,
          backgroundImage: `url(${this.placeholderImage})`,
          backgroundPosition: this.position,
          backgroundSize: this.size,
          backgroundRepeat: this.repeat,
        }
      }
    }
  }
</script>

<style lang="css">
  .lazy-background {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  .lazy-background-slot {
    position: relative;
    z-index: 1;
  }

  .lazy-background-canvas {
    visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
  }

  .lazy-background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.4s ease-out;
  }

  .lazy-background-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transition: all 0.4s ease-out;
    transform: scale(1.1);
    z-index: 0;
  }

  .lazy-background-before {
    opacity: 1;
  }

  .lazy-background-enter {
    opacity: 0;
  }

  .lazy-background-preloader {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
  }
</style>
