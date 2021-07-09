<template>
  <div id="home-container" class="container-fluid p-5 d-flex align-items-center align-self-center justify-content-center">
    <div class="row align-items-center g-md-5">
      <div class="col-md-6 px-5">
        <h1 class="display-4 fw-bold lh-1 mb-3">
          What the heck is <br />
          Study Tracker?
        </h1>
        <p class="col-md-10 fs-4">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
          dicta voluptas unde consequatur, odit iste suscipit explicabo in
          mollitia repudiandae exercitationem. Distinctio labore adipisci
          voluptas placeat, repellat nemo nam amet.
        </p>
      </div>
      <div class="col-md-6 px-5">
        <Auth />
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "../components/Auth.vue";
export default {
  name: "Home",
  components: {
    Auth,
  },
};
</script>
