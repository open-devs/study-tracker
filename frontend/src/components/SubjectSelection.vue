<template>
  <div class="col-md-6">
    <h1 class="display-4 fw-bold lh-1 mb-3">
      Subjects you're planning to study today:
    </h1>
    <Multiselect
      mode="tags"
      :searchable="true"
      :createTag="true"
      :options="options"
      placeholder="select or type custom subjects"
      @change="dropdownValueChange"
    />
    <form class="row align-items-center g-md-5 py-5">
      <div class="col-md-12 mx-auto">
        <h2>Selected subjects for today:</h2>
        <ul class="list-group">
          {{
            !selectedVal.length ? `Nothing Selected Yet` : null
          }}
          <li
            class="
              list-group-item
              d-flex
              justify-content-between
              align-items-center
              goal-list
            "
            v-for="value of selectedVal"
            :key="value.title"
          >
            <span
              >{{ value.title }}
              <small class="text-muted">
                for {{ displayHoursMins(value.goal) || `0 mins` }}</small
              ></span
            >
            <input
              :class="`input-${value.title}`"
              type="time"
              v-model="value.goal"
              max="10:00:00"
              :aria-label="`Set Goal for ${value.title}`"
            />
          </li>
        </ul>
      </div>
      <div class="col-md-12 mx-auto" v-if="totalTime > 0">
        <div :class="`alert alert-${alert.class}`" role="alert">
          {{ alert.text }}
        </div>
      </div>
      <div class="col-md-12 mx-auto d-grid justify-content-md-end">
        <button
          type="submit"
          class="btn btn-primary"
          data-bs-toggle="submit"
          :disabled="totalTime === 0"
          @click="submitData"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Multiselect from "@vueform/multiselect";
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "SubjectSelection",
  components: {
    Multiselect,
  },
  setup() {
    const store = useStore();
    const options = computed(() => store.getters["subjects/get"]);
    const selectedVal = ref([]);
    const totalTime = computed(() =>
      selectedVal.value.reduce(
        (acc, el) => acc + (el.goal ? parseInt(el.goal.split(":")[0]) : 0),
        0
      )
    );
    const alert = computed(() =>
      totalTime.value >= 10
        ? {
            class: "danger",
            text: "Target seems a bit too much, proceed with caution!",
          }
        : totalTime.value >= 7
        ? {
            class: "warning",
            text: "Achievable but still very challenging, proceed with caution!",
          }
        : { class: "success", text: "Good goals, Let's get started!" }
    );

    onMounted(() => {
      store.dispatch("subjects/get");
    });

    const dropdownValueChange = (value) => {
      value.forEach((el) => el.toLowerCase());
      store.dispatch("subjects/save", value);
      selectedVal.value = value.map((el) => ({
        title: el,
        goal: `00:00`,
      }));
    };

    const displayHoursMins = (value) => {
      if (value && value.length) {
        let [hours, mins] = value.split(":").map((el) => parseInt(el));
        return `${hours} hours & ${mins} mins`;
      }
    };

    const submitData = ($event) => {
      $event.preventDefault();
      console.log(selectedVal.value);
    };

    return {
      options,
      dropdownValueChange,
      selectedVal,
      displayHoursMins,
      totalTime,
      alert,
      submitData,
    };
  },
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
