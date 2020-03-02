<template>

  <nav class="navbar navbar-expand-sm navbar-light bg-info text-white">
  <a class="navbar-brand text-white" href="#">Accueil</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="nav-link text-white dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Menu 1
        </a>
        <div class="dropdown-menu bg-info" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#"> <i class="fas fa-chevron-right"></i> Option 1</a>
          <a class="dropdown-item" href="#"> <i class="fas fa-chevron-right"></i> Option 2</a>
          <a class="dropdown-item" href="#"> <i class="fas fa-chevron-right"></i> Option 3</a>
        </div>
      </li>
    </ul>
  </div>
</nav>

</template>

<script>


</script>

<style scoped>

a{
  color:white;
  
}
</style>