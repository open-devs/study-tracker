<template>
  <div class="col-md-6">
    <br />
    <table class="table table-hover table-responsive">
      <thead class="table-dark">
        <tr>
          <th scope="col">Subject</th>
          <th scope="col">Planned Hour</th>
          <th scope="col">Elapsed Hour</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.subject">
          <td>{{ item.subject }}</td>
          <td>{{ item.goal }}</td>
          <td>{{ item.elapsed }}</td>
          <td>
            <button
              @click="showLog(item)"
              type="button"
              class="btn btn-success btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Log
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- Log Model -->
    <div>
      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HistoryTable",
  props: ["data"],
  setup() {
    const showLog = (item) => {
      // logic to call API call to showLog and set local Variable
      console.log("startTimer", item);
    };
    return { showLog };
  },
};
</script>
