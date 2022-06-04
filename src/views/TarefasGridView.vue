<template>
  <div class="container">
    <!-- busca -->
    <div  v-if="!isLoading">
      <b-form inline class="mt-2 mb-2 d-flex justify-content-center"> <!-- v-if="!isTasksEmpty" -->
        <b-icon icon="filter" class="h2 m-1"></b-icon>
        <b-form-input v-model="filter.titulo" id="titulo" placeholder="Ex.: Lavar carro" autocomplete="off" class="m-1"></b-form-input>
        <b-form-select v-model="filter.status" id="status" :options="optionsData" class="m-1"></b-form-select>
        <b-button variant="outline-success" v-on:click="filterTasks" class="m-1" >Buscar</b-button> <!-- :disabled="isEmpty()" -->
        <b-button variant="outline-info" v-on:click="clearFilter" class="m-1" >Limpar Busca</b-button>
      </b-form>
    </div>

    <template v-if="isLoading">
      <div class="loading-spin">
        <b-spinner variant="info" style="width: 5em; height: 5em;"></b-spinner>
      </div>
    </template>

    <template v-if="isTasksEmpty && !isLoading">
      <!-- titulo - sem tarefas-->
      <div class="d-flex justify-content-center flex-column mt-5">
        <b-alert variant="danger" show>Nenhuma tarefa cadastrada</b-alert>
      </div>
    </template>
    <template  v-if="!isTasksEmpty && !isLoading">
      <div class="d-flex justify-content-center">
        <div class="container mt-2"> <!-- col-8  -->
          <div class="d-flex justify-content-end">
            <b-button variant="outline-success" class="mb-2" v-b-tooltip.hover="{ variant: 'secondary' }" title="Incluir Tarefa" v-on:click="addTask"><b-icon icon="plus" class="mr-1"></b-icon></b-button> <!-- Incluir -->
          </div>
          <!-- card -->
          <div v-for="task, index in tasks" :key="index">
            <b-card class="mb-2" :class="{'finished-task': isFinished(task)}"> <!-- :title="task.titulo" -->
              <div class="d-flex align-items-center justify-content-between">
                <b-card-title>{{task.titulo}}</b-card-title>
                <span><b-badge :variant="variantOverdue(task.dateOverdue, task.status)">{{ overduePresenter(task.dateOverdue) }}</b-badge></span>
              </div>
              <b-card-text>{{task.descricao}}</b-card-text>
                <b-button variant="outline-warning" v-b-tooltip.hover="{ variant: 'secondary' }" title="Concluir Tarefa" v-on:click="updateStatus(task, status.FINISHED)" class="m-1"><b-icon icon="check-square" class="mr-1"></b-icon></b-button> <!-- Concluído -->
                <b-button variant="outline-info" v-b-tooltip.hover="{ variant: 'secondary' }" title="Arquivar Tarefa" v-on:click="updateStatus(task, status.ARCHIVED)" class="m-1"><b-icon icon="archive-fill" class="mr-1"></b-icon></b-button> <!-- Arquivar -->
                <b-button variant="outline-danger" v-b-tooltip.hover="{ variant: 'secondary' }" title="Excluir Tarefa" v-on:click="deleteTask(task)" class="m-1"><b-icon icon="trash-fill" class="mr-1"></b-icon></b-button> <!-- Excluir -->
                <b-button variant="outline-success" v-b-tooltip.hover="{ variant: 'secondary' }" title="Editar Tarefa" v-on:click="updateTask(task.id)" class="m-1"><b-icon icon="pencil" class="mr-1"></b-icon></b-button> <!-- Editar -->  
            </b-card>
          </div>
        </div>
      </div>
    </template>

    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block text-left">
        Deseja realmente excluir a tarefa: {{ taskSelected.titulo }}
      </div>
      <div class="d-flex justify-content-end mt-3">
        <b-button variant="outline-ligth" @click="hideModal">Cancelar</b-button>
        <b-button class="ml-2" variant="outline-danger" @click="confirmRemoveTask">Excluir</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import TasksServices from '@/services/tasksServices'
  import ToastMixin from '@/mixins/toastMixin'
  import Status from '@/valueObjects/status'

  export default {
    name: 'TarefasGridView',
    mixins: [ToastMixin],
    data() {
      return {
        tasks:[],
        taskSelected: [],
        status: Status,
        filter: {
          titulo: null,
          status: null
        },
        optionsData: [
          { value: null, text: 'Selecione algum status' },
          { value: Status.OPEN, text: 'Aberto' },
          { value: Status.FINISHED, text: 'Concluído' },
          { value: Status.ARCHIVED, text: 'Arquivado' }
        ],
        isLoading: false            
      }
    },
    created() {
      this.getTasks();
    },
    methods: {
      getTasks() {
        // this.isLoading = true        
        TasksServices.getTasks().then( response => {
          this.tasks = response.data
          // this.tasks = response.data.filter(dataFilter => dataFilter.status != 3 )
          console.log('this.tasks', this.tasks)
          // this.isLoading = false           
        }).catch(error => {
          console.log('error', error)
        })
      },
      addTask() {
        this.$router.push({ name: 'cadastro' })
      },
      updateTask(idTask) {
        this.$router.push({ name: 'cadastro', params: { id: idTask} })
      },
      updateStatus(task, status) {
        task.status = status
        TasksServices.putTask(task).then( () => {
          this.showToast('Sucesso', 'Status alterada com sucesso', 'success')
           this.getTasks();         
        })
      },       
      deleteTask(task) {
        this.taskSelected = task
        this.$refs.modalRemove.show()
      },
      confirmRemoveTask() {
        TasksServices.deleteTask(this.taskSelected.id).then( () => { 
          this.showToast('Sucesso', 'Tarefa Excluida com sucesso', 'success')
          this.taskSelectd = ''
          this.hideModal()
          this.getTasks()
        }).catch(error => {
          console.log('error', error)
        })
      },
      hideModal() {
        this.$refs.modalRemove.hide()
      },
      isFinished(task) {
        return task.status === this.status.FINISHED
        // if (task.status === this.status.FINISHED) {
        //   return true
        // }
      },
      filterTasks() {
      let dataFilter = {... this.filter}
      dataFilter = this.clean(dataFilter)
      this.tasks = this.tasks.filter(dataTasks => dataTasks.titulo == dataFilter.titulo || dataTasks.status == dataFilter.status  )
      },
      clearFilter() {
        this.filter = { titulo: null, status: null }
        this.getTasks()
      },
      clean(obj) {
        for(var propName in obj) {
          if(obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            delete obj[propName]
          }          
        }
        return obj
      },
      isNull() {
        return this.filter.titulo == null && this.filter.status == null
      },
      isEmpty() {
        return this.filter.titulo == '' && this.filter.status == ''
      },
      // inverte a data para formato BR
      overduePresenter(dateOverdue) {
        if(!dateOverdue) return
        return dateOverdue.split('-').reverse().join('/')
      },
      // muda a cor variant da data
      variantOverdue(dateOverdue, taskStatus) {
        if(!dateOverdue) return 'light'
        if(taskStatus === this.status.FINISHED) return 'success'
        // retorna dd/mm/yyyy
        let dateNow = new Date().toISOString().split("T")[0]
        if(dateOverdue === dateNow) return 'warning'
        if(dateOverdue < dateNow) return 'danger'
        return 'light'
      }
    },
    computed: {
      isTasksEmpty() {
        return this.tasks.length === 0
      }
    }
  }
</script>

<style scoped>
  .container {
    margin-bottom: 70px;
  }
  .empty-data-image {
    width: 300px;
    height: auto;
    margin-bottom: 30px;
  }

  .finished-task {
    opacity: 0.7;
  }

  .finished-task > .card-body > h4, .finished-task > .card-body > p {
    text-decoration: line-through;
  }

  .loading-spin {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80vh;
  }

  b-spinner {
    width: 5em;
    height: 5em;
  }
</style>