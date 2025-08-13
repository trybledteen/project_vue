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
                        @click="todoStore.setFilter('all')" 
                        class="btn"
                        :class="todoStore.activeFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'"
                    >
                        All ({{ todoStore.tasksCount }})
                    </button>
                    <button 
                        @click="todoStore.setFilter('to-do')" 
                        class="btn"
                        :class="todoStore.activeFilter === 'to-do' ? 'btn-danger' : 'btn-outline-danger'"
                    >
                        To Do ({{ todoStore.getTasksByStatus('to-do').length }})
                    </button>
                    <button 
                        @click="todoStore.setFilter('in-progress')" 
                        class="btn"
                        :class="todoStore.activeFilter === 'in-progress' ? 'btn-warning' : 'btn-outline-warning'"
                    >
                        In Progress ({{ todoStore.getTasksByStatus('in-progress').length }})
                    </button>
                    <button 
                        @click="todoStore.setFilter('finished')" 
                        class="btn"
                        :class="todoStore.activeFilter === 'finished' ? 'btn-success' : 'btn-outline-success'"
                    >
                        Finished ({{ todoStore.getTasksByStatus('finished').length }})
                    </button>
                </div>
            </div>
        </div>

        <div class="card mt-4">
            <div class="card-body">
                <h5 class="card-title">
                    Tasks List 
                    <span class="badge bg-secondary">{{ todoStore.filteredTasks.length }}</span>
                </h5>
                
                <div v-if="todoStore.filteredTasks.length === 0" class="text-center text-muted py-4">
                    <i class="fas fa-inbox fa-3x mb-3"></i>
                    <p>{{ todoStore.activeFilter === 'all' ? 'No tasks' : `No tasks with "${todoStore.filterTitle}" status` }}</p>
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
                            <tr v-for="(task, index) in todoStore.filteredTasks" :key="task.id">
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
                                        @click="todoStore.changeTaskStatus(task.id)" 
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
import { useTodoStore } from '@/stores/todoStore'

export default {
    name: 'TodoList',
    props: {
        msg: String,
    },
    
    setup() {
        const todoStore = useTodoStore()
        return { todoStore }
    },
    
    data() {
        return {
            task: '',
            description: '',
            editedTask: null,
            isTaskValid: true
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
                this.todoStore.addTask({
                    name: this.task,
                    description: this.description
                });
            } else {
                this.todoStore.updateTask(this.editedTask, {
                    name: this.task,
                    description: this.description
                });
                this.editedTask = null;
            }

            this.task = '';
            this.description = '';
        },

        deleteTask(taskId) {
            if (confirm('Are you sure you want to delete this task?')) {
                this.todoStore.deleteTask(taskId);
            }
        },

        editTask(taskId) {
            const task = this.todoStore.getTaskById(taskId);
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