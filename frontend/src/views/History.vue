<template>
  <div>
    <div id="dashboard-container" class="container-fluid p-5">
      <div class="row align-items-center g-md-5 py-5">Hi from History!</div>
    </div>
    <nav
      class="
        navbar navbar-light
        bg-light
        container-fluid
        justify-content-center
      "
    >
      <router-link to="/dashboard">
        <button class="btn btn-outline-secondary me-2" type="button">
          Dashboard
        </button>
      </router-link>
      <router-link to="/history">
        <button class="btn btn-success me-2" type="button">History</button>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "History",
};
</script>
