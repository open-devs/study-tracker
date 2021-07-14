<template>
  <div class="col-md-6">
    <h2>Plan for Today:</h2>
    <table class="table table-hover table-responsive">
      <caption>
        You can add more subjects in the plan!
      </caption>
      <thead class="table-dark">
        <tr>
          <th scope="col">Subject</th>
          <th scope="col">Planned Hour</th>
          <th scope="col">Elapsed Hour</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in selectedSubject" :key="item.subject">
          <td>{{ item.subject }}</td>
          <td>{{ item.plannedHour }}</td>
          <td>{{ item.elapsed }}</td>
          <td>
            <button
              @click="startTimer(item)"
              type="button"
              class="btn btn-success btn-sm"
            >
              Start
            </button>
            |
            <button
              @click="stopTimer(item)"
              type="button"
              class="btn btn-danger btn-sm"
            >
              Stop
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SubjectTable",
  setup() {
    // Load subjects on onMount
    const selectedSubject = ref([
      {
        subject: "JavaScript",
        plannedHour: "2 Hrs",
        elapsed: "1 Hr",
      },
      {
        subject: "DSA",
        plannedHour: "1 Hrs",
        elapsed: "0 Hr",
      },
      {
        subject: "ReactJS",
        plannedHour: "2 Hrs",
        elapsed: "0 Hr",
      },
    ]);

    const startTimer = (item) => {
      // logic to call API call to startTimer
      console.log("startTimer", item);
    };
    const stopTimer = (item) => {
      // logic to call API call to stopTimer
      console.log("stopTimer", item);
    };
    return { selectedSubject, startTimer, stopTimer };
  },
};
</script>
