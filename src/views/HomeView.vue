<template>
  <div>
    <HeroComponent />
  </div>
</template>

<script>
import HeroComponent from '@/components/HeroComponent.vue';

// @ is an alias to /src

export default {
    name: "HomeView",
    components: { HeroComponent }
}
</script>
