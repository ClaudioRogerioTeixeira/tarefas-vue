export default {
  methods: {
    showToast(titulo, descricao, cor) {
      this.$root.$bvToast.toast(descricao, {
        title: titulo,
        autoHideDelay: 5000,
        variant: cor,
        solid: true
      })   
    }      
  }
}