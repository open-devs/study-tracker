<template>
  <div id="dashboard-container" class="container-fluid p-5">
    <div class="row align-items-center g-md-5 py-5">
      <SubjectSelection />
      <SubjectTable />
    </div>
  </div>
  <nav class="navbar navbar-light bg-light">
    <form class="container-fluid justify-content-start">
      <button class="btn btn-outline-success me-2" type="button">
        Main button
      </button>
      <button class="btn btn-outline-secondary me-2" type="button">
        Smaller button
      </button>
    </form>
  </nav>
</template>

<script>
import SubjectSelection from "../components/SubjectSelection.vue";
import SubjectTable from "../components/SubjectTable.vue";

export default {
  name: "Dashboard",
  components: {
    SubjectSelection,
    SubjectTable,
  },
};
</script>
