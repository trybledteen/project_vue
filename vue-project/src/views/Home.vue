<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8 text-center">
        <h1 class="display-4 mb-4">
          <i class="fas fa-tasks text-primary me-3"></i>
          Welcome to To-do List
        </h1>
        <p class="lead mb-4">
          Manage your tasks efficiently and easily
        </p>
        
        <div class="row mt-5">
          <div class="col-md-4 mb-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="fas fa-plus-circle fa-3x text-success mb-3"></i>
                <h5 class="card-title">Create</h5>
                <p class="card-text">Add new tasks quickly and easily</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="fas fa-edit fa-3x text-warning mb-3"></i>
                <h5 class="card-title">Edit</h5>
                <p class="card-text">Change the status and content of tasks</p>
              </div>
            </div>
          </div>
          
          <div class="col-md-4 mb-3">
            <div class="card h-100 shadow-sm">
              <div class="card-body">
                <i class="fas fa-check-circle fa-3x text-primary mb-3"></i>
                <h5 class="card-title">Track</h5>
                <p class="card-text">Monitor progress</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-5">
          <router-link to="/todos" class="btn btn-primary btn-lg">
            <i class="fas fa-arrow-right me-2"></i>
            Get started
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.btn-lg {
  padding: 12px 30px;
  font-size: 1.1rem;
}
</style>