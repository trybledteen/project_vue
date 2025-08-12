<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="text-center mb-4">About the To-do List project</h1>
        
        <div class="card shadow">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fas fa-info-circle text-primary me-2"></i>
              Project description
            </h5>
            <p class="card-text">
              To-do List is a modern web application for task management developed using Vue.js. 
              The application allows users to create, edit, delete, and track the status of their tasks.
            </p>
          </div>
        </div>

        <div class="card shadow mt-4">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fas fa-cogs text-success me-2"></i>
              Technologies
            </h5>
            <ul class="list-unstyled">
              <li><i class="fab fa-vuejs text-success me-2"></i> Vue.js 3</li>
              <li><i class="fas fa-route text-primary me-2"></i> Vue Router</li>
              <li><i class="fab fa-bootstrap text-purple me-2"></i> Bootstrap 5</li>
              <li><i class="fab fa-js-square text-warning me-2"></i> JavaScript ES6+</li>
            </ul>
          </div>
        </div>

        <div class="card shadow mt-4">
          <div class="card-body">
            <h5 class="card-title">
              <i class="fas fa-list-check text-warning me-2"></i>
              Functionality
            </h5>
            <div class="row">
              <div class="col-md-6">
                <ul>
                  <li>Adding new tasks</li>
                  <li>Editing existing tasks</li>
                  <li>Deleting tasks</li>
                </ul>
              </div>
              <div class="col-md-6">
                <ul>
                  <li>Changing task status</li>
                  <li>Visual status indicators</li>
                  <li>Adaptive design</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <router-link to="/todos" class="btn btn-primary">
            <i class="fas fa-arrow-left me-2"></i>
            Back to tasks
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.text-purple {
  color: #6f42c1;
}

.card {
  border: none;
  margin-bottom: 1rem;
}

.card:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
</style>
