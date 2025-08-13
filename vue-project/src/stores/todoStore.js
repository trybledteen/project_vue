import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
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
    ],
    activeFilter: 'all',
    availableStatuses: ['to-do', 'in-progress', 'finished']
  }),

  getters: {
    filteredTasks: (state) => {
      if (state.activeFilter === 'all') {
        return state.tasks
      }
      return state.tasks.filter(task => task.status === state.activeFilter)
    },

    getTasksByStatus: (state) => {
      return (status) => state.tasks.filter(task => task.status === status)
    },

    getTaskById: (state) => {
      return (id) => state.tasks.find(task => task.id === parseInt(id))
    },

    tasksCount: (state) => state.tasks.length,

    filterTitle: (state) => {
      const titles = {
        'to-do': 'To Do',
        'in-progress': 'In Progress',
        'finished': 'Finished'
      }
      return titles[state.activeFilter] || state.activeFilter
    }
  },

  actions: {
    addTask(taskData) {
      const newId = Math.max(...this.tasks.map(t => t.id), 0) + 1
      this.tasks.push({
        id: newId,
        name: taskData.name,
        description: taskData.description,
        status: 'to-do'
      })
    },

    updateTask(id, taskData) {
      const taskIndex = this.tasks.findIndex(t => t.id === id)
      if (taskIndex !== -1) {
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          name: taskData.name,
          description: taskData.description
        }
      }
    },

    deleteTask(id) {
      const taskIndex = this.tasks.findIndex(t => t.id === id)
      if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1)
      }
    },

    changeTaskStatus(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task) {
        let newIndex = this.availableStatuses.indexOf(task.status)
        if (++newIndex > 2) newIndex = 0
        task.status = this.availableStatuses[newIndex]
      }
    },

    setNextStatus(id) {
      const task = this.tasks.find(t => t.id === id)
      if (task && task.status !== 'finished') {
        const statusFlow = {
          'to-do': 'in-progress',
          'in-progress': 'finished'
        }
        task.status = statusFlow[task.status]
      }
    },

    setFilter(filter) {
      this.activeFilter = filter
    }
  }
})