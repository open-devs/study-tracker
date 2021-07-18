<template>
  <div>
    <div id="dashboard-container" class="container-fluid p-5">
      <div class="row g-md-5 py-5">
        <SubjectSelection :class="subjectsSaved.length && 'plan-set'"/>
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
      <button class="btn btn-sm btn-warning ml-5 p-2 logout-btn" @click="logout">
        Logout
      </button>
    </nav>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import SubjectSelection from "../components/SubjectSelection.vue";
import SubjectTable from "../components/SubjectTable.vue";
import router from "../router";
import { useStore } from "vuex";
import util from '../common/util';

export default {
  name: "Dashboard",
  components: {
    SubjectSelection,
    SubjectTable,
  },
  setup() {
    const store = useStore();
    const subjectsSaved = computed(() => store.getters["choices/getChoicesSaved"]);
    const logout = () => {
      localStorage.clear("bearer");
      router.push("/");
    };

    onMounted(() => {
      store.dispatch("choices/getChoicesSaved", { start: util.getDateNow() });
    });

    return { logout, subjectsSaved };
  },
};
</script>

<style scoped>
.plan-set {
  opacity: 0.7;
  pointer-events: none;
}
</style>
