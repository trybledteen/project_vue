<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <i class="fas fa-tasks me-2"></i>
        To-do List
      </router-link>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" active-class="active">
              <i class="fas fa-home me-1"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/todos" active-class="active">
              <i class="fas fa-list me-1"></i>
              Objectives
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about" active-class="active">
              <i class="fas fa-info-circle me-1"></i>
              About the project
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.navbar-brand {
  font-weight: bold;
  font-size: 1.5rem;
}

.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #fff !important;
}

.nav-link.active {
  color: #fff !important;
  font-weight: bold;
}
</style>