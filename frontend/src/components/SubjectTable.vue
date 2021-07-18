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
          <th scope="col">Goal</th>
          <th scope="col">Elapsed Hour</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in subjectsSaved" :key="item.subject">
          <td>{{ item.subject.title }}</td>
          <td>{{ util.convertMinsToHrsMins(item.goal) }}</td>
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
import { computed } from "vue";
import { useStore } from 'vuex'
import util from '../common/util'

export default {
  name: "SubjectTable",
  setup() {
    const store = useStore();
    const subjectsSaved = computed(() => store.getters["choices/getChoicesSaved"]);

    const startTimer = (item) => {
      // logic to call API call to startTimer
      console.log("startTimer", item);
    };
    const stopTimer = (item) => {
      // logic to call API call to stopTimer
      console.log("stopTimer", item);
    };
    return { subjectsSaved, startTimer, stopTimer, util };
  },
};
</script>
