<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="mb-4">
          <router-link to="/todos" class="btn btn-outline-primary">
            <i class="fas fa-arrow-left me-2"></i>
            Back to task list
          </router-link>
        </div>

        <div v-if="task" class="card shadow">
          <div class="card-header">
            <h3 class="mb-0">
              <i class="fas fa-tasks text-primary me-2"></i>
              Task details
            </h3>
          </div>
          
          <div class="card-body">
            <div class="mb-4">
              <label class="form-label fw-bold">
                <i class="fas fa-heading text-primary me-2"></i>
                Title:
              </label>
              <h4>
                {{ task.name }}
              </h4>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">
                <i class="fas fa-align-left text-info me-2"></i>
                Description:
              </label>
              <div 
                class="p-3 bg-light rounded"
              >
                {{ task.description || 'Description not specified' }}
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">
                <i class="fas fa-info-circle text-warning me-2"></i>
                Status:
              </label>
              <div class="d-flex align-items-center">
                <span 
                  class="badge me-3 fs-6 px-3 py-2"
                  :class="{
                    'bg-danger': task.status === 'to-do',
                    'bg-warning': task.status === 'in-progress',
                    'bg-success': task.status === 'finished'
                  }"
                >
                  {{ getStatusText(task.status) }}
                </span>
              </div>
            </div>

            <div class="mb-4">
              <label class="form-label fw-bold">
                <i class="fas fa-hashtag text-secondary me-2"></i>
                Task ID:
              </label>
              <code class="ms-2">#{{ task.id }}</code>
            </div>
          </div>

          <div class="card-footer bg-transparent">
            <div class="d-flex gap-2 justify-content-between">
              <div>
                <button 
                  @click="changeTaskStatus" 
                  class="btn me-2"
                  :class="{
                    'btn-warning': task.status === 'to-do',
                    'btn-success': task.status === 'in-progress',
                    'btn-outline-secondary': task.status === 'finished'
                  }"
                  :disabled="task.status === 'finished'"
                >
                  <i class="fas fa-arrow-right me-1"></i>
                  {{ getNextStatusAction() }}
                </button>
              </div>
              
              <button @click="deleteTask" class="btn btn-outline-danger">
                <i class="fas fa-trash me-1"></i>
                Delete
              </button>
            </div>
          </div>
        </div>

        <div v-else class="card shadow">
          <div class="card-body text-center py-5">
            <i class="fas fa-exclamation-triangle fa-3x text-warning mb-3"></i>
            <h3>Task not found</h3>
            <p class="text-muted">Task with ID {{ $route.params.id }} does not exist or has been deleted.</p>
            <router-link to="/todos" class="btn btn-primary">
              <i class="fas fa-arrow-left me-2"></i>
              Back to task list
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskDetails',
  
  data() {
    return {
      tasks: [
        {
          id: 1,
          name: 'Learn Vue.js',
          description: 'Learn the basics of the Vue.js framework and create your first project',
          status: 'to-do'
        },
        {
          id: 2,
          name: 'Configure project',
          description: 'Set up the necessary dependencies and configure the development environment',
          status: 'in-progress'
        },
        {
          id: 3,
          name: 'Create components',
          description: 'Develop the main components for the application',
          status: 'finished'
        }
      ]
    }
  },

  computed: {
    task() {
      const taskId = parseInt(this.$route.params.id);
      return this.tasks.find(task => task.id === taskId);
    }
  },

  methods: {
    getStatusText(status) {
      const statusTexts = {
        'to-do': 'Before implementation',
        'in-progress': 'In the process',
        'finished': 'Completed'
      };
      return statusTexts[status] || status;
    },

    getStatusDescription(status) {
      const descriptions = {
        'to-do': 'Task added to list, but work not yet started',
        'in-progress': 'The task is currently being completed.',
        'finished': 'Task successfully completed'
      };
      return descriptions[status] || '';
    },

    getNextStatusAction() {
      const actions = {
        'to-do': 'Start execution',
        'in-progress': 'Complete the task',
        'finished': 'Completed'
      };
      return actions[this.task.status] || '';
    },

    changeTaskStatus() {
      if (!this.task || this.task.status === 'finished') return;

      const statusFlow = {
        'to-do': 'in-progress',
        'in-progress': 'finished'
      };

      this.task.status = statusFlow[this.task.status];
    },

    deleteTask() {
      if (confirm('Are you sure you want to delete this task?')) {
        const taskIndex = this.tasks.findIndex(t => t.id === this.task.id);
        if (taskIndex !== -1) {
          this.tasks.splice(taskIndex, 1);
          this.$router.push('/todos');
        }
      }
    }
  },

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.task) {
        console.warn(`Task with ID ${to.params.id} not found`);
      }
    });
  }
}
</script>

<style scoped>
.card {
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #dee2e6;
}

.badge.fs-6 {
  font-size: 0.9rem !important;
}

code {
  background-color: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.9em;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.text-decoration-line-through {
  text-decoration: line-through !important;
}

.bg-light {
  background-color: #f8f9fa !important;
  border: 1px solid #e9ecef;
}
</style>