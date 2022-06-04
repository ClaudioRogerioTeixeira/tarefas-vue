<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/"><b-icon icon="list-task" class="mr-1"></b-icon>TAREFAS</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item to="/" v-b-tooltip.hover="{ variant: 'secondary' }" title="Home"><b-icon icon="house-door-fill"></b-icon></b-nav-item>
            <b-nav-item to="/tarefas" v-b-tooltip.hover="{ variant: 'secondary' }" title="Tarefas"><b-icon icon="list-task"></b-icon></b-nav-item>
            <b-nav-item to="/cadastro" v-b-tooltip.hover="{ variant: 'secondary' }" title="Cadastro de Tarefas"><b-icon icon="clipboard"></b-icon></b-nav-item>
          </b-navbar-nav>       
        </b-collapse>
      </b-navbar>

  </div>
</template>

<script>

  export default {
    name: 'HeaderComponent'
  }

</script>

<style scoped>

</style>