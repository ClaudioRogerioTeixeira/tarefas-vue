<template>
  <div class="container">
    <div class="inner-container">
      <b-form class="mt-2">
        <b-col class="col-md-8 offset-md-2">
          <b-alert show>{{form.id ? 'Alteração de Tarefas' : 'Inclusão de Tarefas'}}</b-alert>
          <!-- id -->
          <b-form-group
            label="Id"
            label-for="id"
            v-if="form.id"
          >
            <b-form-input
              id="id"
              v-model="form.id"
              type="text"
              disabled
            ></b-form-input>
          </b-form-group>
          <!-- titulo -->
          <b-form-group
            label="Título"
            label-for="titulo"
          >
            <b-form-input
              id="titulo"
              v-model.trim="$v.form.titulo.$model"
              type="text"
              required
              placeholder="Ex: Fazer compras"
              autocomplete="off"
              :state="getValidation"
              aria-describedby="titulo-feedback"
            ></b-form-input>
            <b-form-invalid-feedback id="titulo-feedback">Campo obrigatório (mínimo 5 caracteres)</b-form-invalid-feedback>
          </b-form-group>
          <!-- descricao -->
          <b-form-group
            label="Descrição"
            label-for="descricao"
          >
            <b-form-textarea
              id="descricao"
              v-model="form.descricao"
              type="text"
              required
              placeholder="Ex: Comprar itens básicos"
              autocomplete="off"
            ></b-form-textarea>
          </b-form-group>
          <!-- status -->
          <b-form-group
            label="Status"
            label-for="status"
          >
            <b-form-select
              id="status"
              v-model="form.status"
              :options="optionsData"
            ></b-form-select>
          </b-form-group>
          <!-- data vencimento -->
          <b-form-group
            label="Data de Vencimento"
            label-for="dateOverdue"
            >
            <b-form-datepicker
              id="dateOverdue"
              v-model="form.dateOverdue"
              locale="pt-BR"              
              label-no-date-selected="Selecione uma data"
              :min="getToday()"
            ></b-form-datepicker>
          </b-form-group>  
        </b-col>
        <b-col class="col-md-8 offset-md-2 d-flex justify-content-end">
          <b-button type="reset" variant="outline-danger" v-b-tooltip.hover="{ variant: 'secondary' }" title="Cancelar Tarefa" class="mr-1" v-on:click="cancelTask"><b-icon icon="box-arrow-up-left" class="mr-1"></b-icon>Cancelar</b-button>
          <b-button type="button" variant="outline-success" v-b-tooltip.hover="{ variant: 'secondary' }" title="Salvar Tarefa" v-on:click="saveTask" v-if="!form.id" :disabled="!getValidation"><b-icon icon="save" class="mr-1"></b-icon>Salvar</b-button>
          <b-button type="button" variant="outline-warning" v-b-tooltip.hover="{ variant: 'secondary' }" title="Alterar Tarefa"  v-on:click="updateTask(form)" v-if="form.id"><b-icon icon="arrow-clockwise" class="mr-1"></b-icon>Alterar</b-button> <!-- :disabled="!getValidation" -->
        </b-col>
      </b-form>
    </div>
  </div>
</template>

<script>
  import TasksServices from '@/services/tasksServices'
  import ToastMixin from '@/mixins/toastMixin.js'
  import { required, minLength } from 'vuelidate/lib/validators'
  import Status from '@/valueObjects/status'
  
  export default {
    name: 'TarefaCadastroView',
    mixins: [ToastMixin],
    data() {
      return {
        form: {
          id: '',
          titulo: '',
          descricao: '',
          status: Status.OPEN,
          dateOverdue: ''
        },
        optionsData: [
          { value: Status.OPEN, text: 'Aberto' },
          { value: Status.FINISHED, text: 'Concluído' },
          { value: Status.ARCHIVED, text: 'Arquivado' }
        ]     
      }
    },
    validations: {
      form: {
        titulo: {
          required,
          minLength: minLength(5)
        }
      }
    },
    created() {
      this.form.id = this.$route.params.id
      if (this.form.id) {
        TasksServices.getTask(this.form.id).then( response => {
          this.form = response.data
        })
      }
    },    
    methods: {
      saveTask() {
        this.$v.$touch()
        if(this.$v.$error) return

        TasksServices.postTasks(this.form).then( () => {
          this.clearForm()
          this.showToast('Sucesso', 'Tarefa salva com sucesso', 'success')
          this.$router.push({ name: 'tarefas' })
        })        
      },
      updateTask(form) {
        TasksServices.putTask(form).then( () => {
          this.showToast('Sucesso', 'Tarefa alterada com sucesso', 'success')
          this.$router.push({ name: 'tarefas' })          
        })
      },      
      cancelTask() {
        this.clearForm()          
        this.$router.push({ name: 'tarefas' })
      },
      clearForm() {
        this.form = {
          titulo: null,
          descricao: null
        }
      },
      getToday() {
        return new Date().toISOString().split("T")[0]
      }
    },
    computed: {
      getValidation() {
        if(this.$v.form.titulo.$dirty === false) {
          return null;
        }
        return !this.$v.form.titulo.$error;
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-bottom: 70px;
  }

  @media only screen and (max-width: 600px) {
    
  }
</style>