<template>
  <div>
    <div>
      <form
        class="p-4 p-md-5 border rounded-3 bg-light"
        @submit.prevent="onSignin"
      >
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="username"
            v-model="loginObj.username"
            placeholder="opendevs"
          />
          <label for="username">Username</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="loginObj.password"
            placeholder="Password"
          />
          <label for="password">Password</label>
        </div>
        <button class="w-100 btn btn-lg btn-primary" type="submit">
          Sign In
        </button>
        <hr class="my-4" />
        <small class="text-muted"
          >New to Study Tracker? &nbsp;
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Sign Up
          </button></small
        >
      </form>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Sign Up</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              class="p-4 p-md-5 border rounded-3 bg-light"
              @submit.prevent="onSignup"
            >
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="signupName"
                  v-model="singupObj.name"
                  placeholder="opendevs"
                />
                <label for="signupName">Name</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="signupUsername"
                  v-model="singupObj.username"
                  placeholder="opendevs"
                />
                <label for="signupUsername">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="signupEmail"
                  v-model="singupObj.email"
                  placeholder="name@example.com"
                />
                <label for="signupEmail">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="signupPassword"
                  v-model="singupObj.password"
                  placeholder="Password"
                />
                <label for="signupPassword">Password</label>
              </div>
              <button class="w-100 btn btn-lg btn-success" type="submit">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";

export default {
  name: "Auth",

  setup() {
    const token = ref("");
    const loginObj = ref({
      username: "",
      password: "",
    });
    const singupObj = ref({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    console.log(process.env);

    const onSignin = async () => {
      console.log(loginObj.value.username, loginObj.value.password);
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}api/auth/login`,
        loginObj.value
      );
      console.log(response.data);
      loginObj.value.username = "";
      loginObj.value.password = "";
    };

    const onSignup = async () => {
      console.log(
        singupObj.value.name,
        singupObj.value.email,
        singupObj.value.password
      );
      const response = await axios.post(
        `${process.env.VUE_APP_BASE_URL}api/auth/signup`,
        singupObj.value
      );
      console.log(response.data);
      singupObj.value.name = "";
      singupObj.value.username = "";
      singupObj.value.email = "";
      singupObj.value.password = "";
    };

    return {
      token,
      singupObj,
      loginObj,
      onSignin,
      onSignup,
    };
  },
};
</script>
