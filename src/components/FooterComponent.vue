<template>
  <footer class="text-center text-lg-start">
    <div class="text-center p-3">
      © 2022 Copyright -
      <a href="https://claudiorogerioteixeira.github.io/portfolio/" target="blank">Claudio Teixeira</a>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'FooterComponent'
  }
</script>

<style scoped>
  footer {
    background-color: #17a2b8;
    color: #fff;
    width: 100%;
    min-height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
  }

  footer a {
     text-decoration: none;
     color: white;
  }
</style>