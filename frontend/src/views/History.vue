<template>
  <div>
    <div id="dashboard-container" class="container-fluid p-5">
      <div v-for="date in datesArray" :key="date">
        <span class="badge bg-dark">{{ date }}</span>
        <HistoryTable
          :data="selectedSubject.filter((data) => data.createdAt === date)"
        />
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
import HistoryTable from "../components/HistoryTable.vue";
import { ref } from "vue";

export default {
  name: "History",
  components: {
    HistoryTable,
  },
  setup() {
    const datesArray = ref(["16/07/2021", "15/07/2021"]);
    const selectedSubject = ref([
      {
        createdAt: "16/07/2021",
        subject: "JavaScript",
        goal: "2 Hrs",
        elapsed: "1 Hr",
      },
      {
        createdAt: "16/07/2021",
        subject: "Typescript",
        goal: "2 Hrs",
        elapsed: "1 Hr",
      },
      {
        createdAt: "15/07/2021",
        subject: "DSA",
        goal: "1 Hrs",
        elapsed: "0 Hr",
      },
      {
        createdAt: "15/07/2021",
        subject: "Java",
        goal: "2 Hrs",
        elapsed: "1 Hr",
      },
    ]);

    return { selectedSubject, datesArray };
  },
};
</script>
