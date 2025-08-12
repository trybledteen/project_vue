<template>
    <div class="container">
        <h2 class="text-center mt-5">To-do List</h2>
        
        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">{{ editedTask === null ? 'Add Task' : 'Edit Task' }}</h5>
                <div class="mb-3">
                    <input 
                        v-model="task" 
                        type="text" 
                        placeholder="Task name" 
                        class="form-control"
                        :class="{'is-invalid': !isTaskValid && task.length === 0}"
                    >
                    <div class="invalid-feedback">
                        Task name is required
                    </div>
                </div>
                <div class="mb-3">
                    <textarea 
                        v-model="description" 
                        placeholder="Task description" 
                        class="form-control"
                        rows="3"
                    ></textarea>
                </div>
                <div class="d-flex gap-2">
                    <button @click="submitTask" class="btn btn-warning">
                        {{ editedTask === null ? 'ADD' : 'SAVE' }}
                    </button>
                    <button 
                        v-if="editedTask !== null" 
                        @click="cancelEdit" 
                        class="btn btn-secondary"
                    >
                        CANCEL
                    </button>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">Filters</h5>
                <div class="btn-group" role="group">
                    <button 
                        @click="setFilter('all')" 
                        class="btn"
                        :class="activeFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'"
                    >
                        All ({{ tasks.length }})
                    </button>
                    <button 
                        @click="setFilter('to-do')" 
                        class="btn"
                        :class="activeFilter === 'to-do' ? 'btn-danger' : 'btn-outline-danger'"
                    >
                        To Do ({{ getTasksByStatus('to-do').length }})
                    </button>
                    <button 
                        @click="setFilter('in-progress')" 
                        class="btn"
                        :class="activeFilter === 'in-progress' ? 'btn-warning' : 'btn-outline-warning'"
                    >
                        In Progress ({{ getTasksByStatus('in-progress').length }})
                    </button>
                    <button 
                        @click="setFilter('finished')" 
                        class="btn"
                        :class="activeFilter === 'finished' ? 'btn-success' : 'btn-outline-success'"
                    >
                        Finished ({{ getTasksByStatus('finished').length }})
                    </button>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">
                    Tasks List 
                    <span class="badge bg-secondary">{{ filteredTasks.length }}</span>
                </h5>
                
                <div v-if="filteredTasks.length === 0" class="text-center text-muted py-4">
                    <i class="fas fa-inbox fa-3x mb-3"></i>
                    <p>{{ activeFilter === 'all' ? 'No tasks' : `No tasks with "${getFilterTitle()}" status` }}</p>
                </div>

                <div v-else class="table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Status</th>
                                <th scope="col" class="text-center">Details</th>
                                <th scope="col" class="text-center">Edit</th>
                                <th scope="col" class="text-center">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(task, index) in filteredTasks" :key="task.id">
                                <td>
                                    <span :class="{'finished': task.status === 'finished'}">
                                        {{ task.name }}
                                    </span>
                                </td>
                                <td>
                                    <span :class="{'finished': task.status === 'finished'}">
                                        {{ task.description || 'No description' }}
                                    </span>
                                </td>
                                <td style="width: 120px;">
                                    <span 
                                        @click="changeStatus(task.id)" 
                                        class="badge pointer"
                                        :class="{
                                            'bg-danger': task.status === 'to-do',
                                            'bg-warning': task.status === 'in-progress',
                                            'bg-success': task.status === 'finished'
                                        }"
                                    >
                                        {{ firstCharUpper(task.status.replace('-', ' ')) }}
                                    </span>
                                </td>
                                <td>
                                    <div class="text-center">
                                        <router-link 
                                            :to="`/task/${task.id}`"
                                            class="btn btn-sm btn-secondary"
                                        >
                                            <i class="fas fa-eye"></i>
                                        </router-link>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-center">
                                        <button 
                                            @click="editTask(task.id)"
                                            class="btn btn-sm btn-secondary"
                                        >
                                            <i class="fas fa-pen"></i>
                                        </button>
                                    </div>
                                </td>
                                <td>
                                    <div class="text-center">
                                        <button 
                                            @click="deleteTask(task.id)"
                                            class="btn btn-sm btn-secondary"
                                        >
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TodoList',
    props: {
        msg: String,
    },
    
    data() {
        return {
            task: '',
            description: '',
            editedTask: null,
            activeFilter: 'all',
            isTaskValid: true,
            availableStatuses: ['to-do', 'in-progress', 'finished'],
            tasks: [
                {
                    id: 1,
                    name: 'Learn Vue.js',
                    description: 'Study Vue.js framework basics and create first project',
                    status: 'to-do'
                },
                {
                    id: 2,
                    name: 'Setup Project',
                    description: 'Install necessary dependencies and configure development environment',
                    status: 'in-progress'
                },
                {
                    id: 3,
                    name: 'Create Components',
                    description: 'Develop main components for the application',
                    status: 'finished'
                }
            ]
        }
    },

    computed: {
        filteredTasks() {
            if (this.activeFilter === 'all') {
                return this.tasks;
            }
            return this.tasks.filter(task => task.status === this.activeFilter);
        }
    },

    methods: {
        submitTask() {
            if (this.task.length === 0) {
                this.isTaskValid = false;
                return;
            }

            this.isTaskValid = true;

            if (this.editedTask === null) {
                const newId = Math.max(...this.tasks.map(t => t.id), 0) + 1;
                this.tasks.push({
                    id: newId,
                    name: this.task,
                    description: this.description,
                    status: 'to-do'
                });
            } else {
                const taskIndex = this.tasks.findIndex(t => t.id === this.editedTask);
                if (taskIndex !== -1) {
                    this.tasks[taskIndex].name = this.task;
                    this.tasks[taskIndex].description = this.description;
                }
                this.editedTask = null;
            }

            this.task = '';
            this.description = '';
        },

        deleteTask(taskId) {
            if (confirm('Are you sure you want to delete this task?')) {
                const taskIndex = this.tasks.findIndex(t => t.id === taskId);
                if (taskIndex !== -1) {
                    this.tasks.splice(taskIndex, 1);
                }
            }
        },

        editTask(taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                this.task = task.name;
                this.description = task.description || '';
                this.editedTask = taskId;
            }
        },

        cancelEdit() {
            this.task = '';
            this.description = '';
            this.editedTask = null;
        },

        changeStatus(taskId) {
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                let newIndex = this.availableStatuses.indexOf(task.status);
                if (++newIndex > 2) newIndex = 0;
                task.status = this.availableStatuses[newIndex];
            }
        },

        setFilter(filter) {
            this.activeFilter = filter;
        },

        getTasksByStatus(status) {
            return this.tasks.filter(task => task.status === status);
        },

        getFilterTitle() {
            const titles = {
                'to-do': 'To Do',
                'in-progress': 'In Progress',
                'finished': 'Finished'
            };
            return titles[this.activeFilter] || this.activeFilter;
        },

        firstCharUpper(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
    }
}
</script>

<style scoped>
.pointer {
    cursor: pointer;
}

.finished {
    text-decoration: line-through;
    opacity: 0.6;
}

.badge.pointer:hover {
    transform: scale(1.1);
    transition: transform 0.2s ease;
}

.card {
    border: none;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.btn-group .btn {
    border-radius: 0;
}

.btn-group .btn:first-child {
    border-top-left-radius: 0.375rem;
    border-bottom-left-radius: 0.375rem;
}

.btn-group .btn:last-child {
    border-top-right-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
}

.table-responsive {
    border-radius: 0.375rem;
}

.invalid-feedback {
    display: block;
}
</style>