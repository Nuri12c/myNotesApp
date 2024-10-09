<template>
  <footer class="footer">
    <div
      class="honeycomb"
      :class="{ 'active-combs': showCombsApp }"
      @click="$emit('icon-click', 'combs')"
    ></div>
    <div
      class="cards"
      :class="{ 'active-cards': showSliderApp }"
      @click="$emit('icon-click', 'container')"
    ></div>
    <div  :class="{ 'active-cards': showBurger }"
    @click="$emit('icon-click', 'burger')" class="burger"></div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
  props: {
    showSliderApp: {
      type: Boolean,
      default: true,
    },
    showCombsApp: {
      type: Boolean,
      default: false,
    },
    showBurger: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style>

</style>
