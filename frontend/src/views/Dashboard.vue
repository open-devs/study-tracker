<template>
  <div id="dashboard-container" class="container-fluid p-5">
    <div class="row align-items-center g-md-5 py-5">
      <div class="col-md-6 mx-auto">
        <h1 class="display-4 fw-bold lh-1 mb-3">
          Subjects you're planning to study today:
        </h1>
        <Multiselect
          v-model="value"
          mode="tags"
          :searchable="true"
          :createTag="true"
          :options="options"
          placeholder="select or type custom subjects"
          @change="dropdownValueChange"
        />

        <div class="row align-items-center g-md-5 py-5">
          <div class="col-md-12 mx-auto">
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(value) of selectedVal" :key="value">
                {{ value }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-6 mx-auto">
        Table here
      </div>
    </div>
  </div>
</template>

<script>
import Multiselect from '@vueform/multiselect'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  name: "Dashboard",
  components: {
    Multiselect,
  },
  setup() {
    const store = useStore();
    const options = computed(() => store.getters['subjects/get']);
    const selectedVal = computed(() => store.getters['subjects/getSelected']);

    onMounted(() => {
      store.dispatch('subjects/get')
    })

    const dropdownValueChange = (value) => {
      value.forEach(el => el.toLowerCase());
      store.dispatch('subjects/save', value);
      store.dispatch('subjects/saveSelected', value);
    }

    return {
      options,
      dropdownValueChange,
      selectedVal
    }
  }
};
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
