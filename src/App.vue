<template>
  <div id="app">
    <HeaderComponent />
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
    <FooterComponent />
  </div>
</template>

<script>
  import HeaderComponent from "./components/HeaderComponent.vue";
  import FooterComponent from "./components/FooterComponent.vue";

  export default {
    components: { HeaderComponent, FooterComponent }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition-duration: 0.4s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  .fade-enter, .fade-leave {
    opacity: 0;
  }
</style>
