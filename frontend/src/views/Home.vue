<template>
  <section class="home">
    <div class="container col-xl-10 col-xxl-8 px-4 py-5">
      <div class="row align-items-center g-lg-5 py-5">
        <div class="col-lg-7 text-center text-lg-start">
          <h1 class="display-4 fw-bold lh-1 mb-3">
            What the heck is <br />
            Study Tracker?
          </h1>
          <p class="col-lg-10 fs-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo,
            dicta voluptas unde consequatur, odit iste suscipit explicabo in
            mollitia repudiandae exercitationem. Distinctio labore adipisci
            voluptas placeat, repellat nemo nam amet.
          </p>
        </div>
        <div class="col-md-10 mx-auto col-lg-5">
          <Auth />
        </div>
      </div>
    </div>
  </section>
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
