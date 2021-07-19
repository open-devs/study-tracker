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
            @change="validation(loginObj, loginObjErr, 'username')"
            v-model="loginObj.username"
            placeholder="opendevs"
          />
          <label for="username">Username</label>
          <small class="text-danger" v-if="loginObjErr.username.length">{{
            loginObjErr.username
          }}</small>
        </div>
        <div class="form-floating mb-3">
          <input
            type="password"
            class="form-control"
            id="password"
            @change="validation(loginObj, loginObjErr, 'password')"
            v-model="loginObj.password"
            placeholder="Password"
          />
          <label for="password">Password</label>
          <small class="text-danger" v-if="loginObjErr.password.length">{{
            loginObjErr.password
          }}</small>
        </div>
        <button
          class="w-100 btn btn-lg btn-primary"
          type="submit"
          :disabled="loginFormInvalid"
        >
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
      data-bs-backdrop="static"
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
            <form class="p-4 p-md-5" @submit.prevent="onSignup">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="signupName"
                  @change="validation(signupObj, signupObjErr, 'name')"
                  v-model="signupObj.name"
                  placeholder="opendevs"
                />
                <label for="signupName">Name</label>
                <small class="text-danger" v-if="signupObjErr.name.length">{{
                  signupObjErr.name
                }}</small>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="signupUsername"
                  @change="validation(signupObj, signupObjErr, 'username')"
                  v-model="signupObj.username"
                  placeholder="opendevs"
                />
                <label for="signupUsername">Username</label>
                <small
                  class="text-danger"
                  v-if="signupObjErr.username.length"
                  >{{ signupObjErr.username }}</small
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="signupEmail"
                  @change="validation(signupObj, signupObjErr, 'email')"
                  v-model="signupObj.email"
                  placeholder="name@example.com"
                />
                <label for="signupEmail">Email address</label>
                <small class="text-danger" v-if="signupObjErr.email.length">{{
                  signupObjErr.email
                }}</small>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="signupPassword"
                  @change="validation(signupObj, signupObjErr, 'password')"
                  v-model="signupObj.password"
                  placeholder="Password"
                />
                <label for="signupPassword">Password</label>
                <small
                  class="text-danger"
                  v-if="signupObjErr.password.length"
                  >{{ signupObjErr.password }}</small
                >
              </div>
              <button
                class="w-100 btn btn-lg btn-success"
                type="submit"
                :disabled="signupFormInvalid"
              >
                Sign Up
              </button>
              <!--NOTE: ToDo: Add button validation -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import AuthService from "../services/auth";
import AlertService from "../services/alert";
import router from "../router";
import isAlpha from "validator/es/lib/isAlpha";
import isEmail from "validator/es/lib/isEmail";

const validationObj = {
  name: (value) =>
    value.length < 4 || value.length > 30
      ? "Name length should be in between 4 and 30"
      : isAlpha(value)
      ? "Please Enter a valid Name"
      : "",
  username: (value) =>
    value.length < 4 || value.length > 12
      ? "Username must be between 4 and 12 characters"
      : "",
  password: (value) =>
    value.length < 8 || value.length > 25
      ? "Password must be between 8 and 25 characters"
      : "",
  email: (value) => (isEmail(value) ? "" : "Please Enter a valid Email"),
};

export default {
  name: "Auth",

  setup() {
    const token = ref("");
    const loginObj = ref({
      username: "",
      password: "",
    });
    const loginObjErr = ref({
      username: "",
      password: "",
    });
    const signupObj = ref({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    const signupObjErr = ref({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    const modalClose = ref(null);
    const loginFormInvalid = computed(
      () =>
        Object.keys(loginObj.value).some(
          (el) => loginObj.value[el].length === 0
        ) ||
        Object.keys(loginObjErr.value).some(
          (el) => loginObjErr.value[el].length
        )
    );
    const signupFormInvalid = computed(
      () =>
        Object.keys(signupObj.value).some(
          (el) => signupObj.value[el].length === 0
        ) ||
        Object.keys(signupObjErr.value).some(
          (el) => signupObjErr.value[el].length
        )
    );

    onMounted(() => {
      if (localStorage.getItem("bearer")) {
        router.push("/dashboard");
      }
    });

    const onSignin = async () => {
      const response = await AuthService.login(loginObj.value);
      if (response?.data?.token) {
        localStorage.setItem("bearer", response.data.token);
        router.push("/dashboard");
        loginObj.value.username = "";
        loginObj.value.password = "";
      }
    };

    const onSignup = async () => {
      const response = await AuthService.signup(signupObj.value);
      if (response.data) {
        modalClose.value.click();
        AlertService.displayAlert(
          "Successful!",
          `Signup successful, login to proceed!`,
          "success"
        );
        signupObj.value.name = "";
        signupObj.value.username = "";
        signupObj.value.email = "";
        signupObj.value.password = "";
      }
    };

    const validation = (obj, errorObj, fieldName) => {
      errorObj[fieldName] = validationObj[fieldName](obj[fieldName]);
    };

    return {
      token,
      signupObj,
      loginObj,
      onSignin,
      onSignup,
      modalClose,
      loginObjErr,
      signupObjErr,
      validation,
      loginFormInvalid,
      signupFormInvalid,
    };
  },
};
</script>
