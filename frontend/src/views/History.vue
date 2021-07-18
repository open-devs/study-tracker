<template>
  <div>
    <div id="dashboard-container" class="container-fluid p-5">
      <div v-if="historyData.length">
        <div v-for="data in historyData" :key="data.date">
          <span class="badge bg-dark">{{ data.date }}</span>
          <HistoryTable
            :data="data.choices"
          />
        </div>
      </div>
      <h2 v-else>No history data available Yet!</h2>
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
      <button class="btn btn-sm btn-warning ml-5 p-2 logout-btn" @click="logout">
        Logout
      </button>
    </nav>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import HistoryTable from "../components/HistoryTable.vue";
import util from '../common/util'

export default {
  name: "History",
  components: {
    HistoryTable,
  },
  setup() {
    const store = useStore();
    const historyData = computed(() => store.getters["choices/getHistory"]);

    onMounted(() => {
      store.dispatch("choices/getHistory", { start: util.getDateNow(), end: util.getSevenDaysAgo() });
    });

    return { historyData };
  },
};
</script>
