<template>
  <div>
    <div id="dashboard-container" class="container-fluid p-5">
      <div class="d-flex align-items-end flex-column">
        <button class="btn btn-sm btn-warning mt-auto p-2" @click="logout">
          Logout
        </button>
      </div>
      <div class="row g-md-5 py-5">
        <SubjectSelection />
        <SubjectTable />
      </div>
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
        <button class="btn btn-success me-2" type="button">Dashboard</button>
      </router-link>
      <router-link to="/history">
        <button class="btn btn-outline-secondary me-2" type="button">
          History
        </button>
      </router-link>
    </nav>
  </div>
</template>

<script>
import SubjectSelection from "../components/SubjectSelection.vue";
import SubjectTable from "../components/SubjectTable.vue";
import router from "../router";

export default {
  name: "Dashboard",
  components: {
    SubjectSelection,
    SubjectTable,
  },
  setup() {
    const logout = () => {
      localStorage.clear("bearer");
      router.push("/");
    };
    return { logout };
  },
};
</script>
