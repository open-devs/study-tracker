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
            data-bs-target="#signupModel"
          >
            Sign Up
          </button></small
        >
      </form>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="signupModel"
      tabindex="-1"
      aria-labelledby="signupModelLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signupModelLabel">Sign Up</h5>
            <button
              ref="modalClose"
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
import { ref, onMounted } from "vue";
import AuthService from "../services/auth";
import AlertService from "../services/alert";
import router from "../router";

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
    const modalClose = ref(null);

    onMounted(() => {
      if (localStorage.getItem("bearer")) {
        router.push("/dashboard");
      }
    });

    const onSignin = async () => {
      const response = await AuthService.login(loginObj.value);
      response?.data?.token &&
        localStorage.setItem("bearer", response.data.token);
      router.push("/dashboard");
      loginObj.value.username = "";
      loginObj.value.password = "";
    };

    const onSignup = async () => {
      await AuthService.signup(singupObj.value);
      modalClose.value.click();
      AlertService.displayAlert(
        "Successful!",
        `Signup successfull, login to proceed!`,
        "success"
      );
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
      modalClose,
    };
  },
};
</script>
