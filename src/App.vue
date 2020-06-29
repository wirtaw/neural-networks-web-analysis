<template>
  <div
    id="app"
    class="app"
  >
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}

</script>

<style lang="scss">
  @import 'bulma/bulma.sass';
  @import './styles/extensions/steps/bulma-steps.sass';
  @import "./styles/extensions/switch/bulma-switch.sass";
.app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    a, figure {
        display: inline-block;
    }
      figcaption {
        margin: 10px 0 0 0;
        font-family: Avenir, Helvetica, Arial, sans-serif;
    }
      figure {
        padding: 5px;
    }
      img:hover {
        transform: scale(1.1);
        -ms-transform: scale(1.1);
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
    }
      img {
        transition: transform 0.2s;
        -webkit-transition: -webkit-transform 0.2s;
        -moz-transition: -moz-transform 0.2s;
        -o-transition: -o-transform 0.2s;
    }
}
</style>
