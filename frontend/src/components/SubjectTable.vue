<template>
  <div class="col-md-6">
    <h2>Plan for Today:</h2>
    <table class="table table-hover table-responsive">
      <thead class="table-dark">
        <tr>
          <th scope="col">Subject</th>
          <th scope="col">Goal</th>
          <th scope="col">Elapsed</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in subjectsSaved" :key="item.subject">
          <td>{{ item.subject.title }}</td>
          <td>{{ util.convertMinsToHrsMins(item.goal) }}</td>
          <td>{{ util.convertMinsToHrsMins(item.elapsed / 60000) }}</td>
          <td>
            <button
              @click="logEvent(item._id, 'start')"
              type="button"
              class="btn btn-success btn-sm"
            >
              Start
            </button>
            |
            <button
              @click="logEvent(item._id, 'stop')"
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
import choice from '../services/choice'

export default {
  name: "SubjectTable",
  setup() {
    const store = useStore();
    const subjectsSaved = computed(() => store.getters["choices/getChoicesSaved"]);

    const logEvent = async (id, eventType) => {
      try {
        const data = {
          id,
          eventType
        }
        await choice.patch(data)
        await store.dispatch('getChoicesSaved', { start: util.getDateNow() })
      } catch (error) {
        console.error(error);
      }
    };
    return { subjectsSaved, logEvent, util };
  },
};
</script>
