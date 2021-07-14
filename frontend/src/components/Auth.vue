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
            @change="validation('username')"
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
            @change="validation('password')"
            v-model="loginObj.password"
            placeholder="Password"
          />
          <label for="password">Password</label>
          <small class="text-danger" v-if="loginObjErr.password.length">{{
            loginObjErr.password
          }}</small>
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
                  @change="validation('signupName')"
                  v-model="singupObj.name"
                  placeholder="opendevs"
                />
                <label for="signupName">Name</label>
                <small class="text-danger" v-if="singupObjErr.name.length">{{
                  singupObjErr.name
                }}</small>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="signupUsername"
                  @change="validation('signupUsername')"
                  v-model="singupObj.username"
                  placeholder="opendevs"
                />
                <label for="signupUsername">Username</label>
                <small
                  class="text-danger"
                  v-if="singupObjErr.username.length"
                  >{{ singupObjErr.username }}</small
                >
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="signupEmail"
                  @change="validation('signupEmail')"
                  v-model="singupObj.email"
                  placeholder="name@example.com"
                />
                <label for="signupEmail">Email address</label>
                <small class="text-danger" v-if="singupObjErr.email.length">{{
                  singupObjErr.email
                }}</small>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="signupPassword"
                  @change="validation('signupPassword')"
                  v-model="singupObj.password"
                  placeholder="Password"
                />
                <label for="signupPassword">Password</label>
                <small
                  class="text-danger"
                  v-if="singupObjErr.password.length"
                  >{{ singupObjErr.password }}</small
                >
              </div>
              <button class="w-100 btn btn-lg btn-success" type="submit">
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
import { ref, onMounted } from "vue";
import AuthService from "../services/auth";
import AlertService from "../services/alert";
import router from "../router";
import isAlpha from "validator/es/lib/isAlpha";
import isEmail from "validator/es/lib/isEmail";

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
    const singupObj = ref({
      name: "",
      username: "",
      email: "",
      password: "",
    });
    const singupObjErr = ref({
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
        `Signup successful, login to proceed!`,
        "success"
      );
      singupObj.value.name = "";
      singupObj.value.username = "";
      singupObj.value.email = "";
      singupObj.value.password = "";
    };

    const validation = (fieldName) => {
      if (fieldName === "username") {
        if (
          loginObj.value.username.length < 4 ||
          loginObj.value.username.length > 12
        ) {
          loginObjErr.value.username =
            "Username length should be in between 4 and 12";
        } else {
          loginObjErr.value.username = "";
        }
      }
      if (fieldName === "password") {
        if (
          loginObj.value.password.length < 8 ||
          loginObj.value.password.length > 25
        ) {
          loginObjErr.value.password =
            "Password length should be in between 8 and 25";
        } else {
          loginObjErr.value.password = "";
        }
      }
      if (fieldName === "signupName") {
        if (
          singupObj.value.name.length < 4 ||
          singupObj.value.name.length > 30
        ) {
          singupObjErr.value.name = "Name length should be in between 4 and 30";
        } else {
          singupObjErr.value.name = "";
        }
        if (isAlpha(singupObj.value.name)) {
          singupObjErr.value.name = "Please Enter a valid Name";
        } else {
          singupObjErr.value.name = "";
        }
      }
      if (fieldName === "signupPassword") {
        if (
          singupObj.value.password.length < 8 ||
          singupObj.value.password.length > 25
        ) {
          singupObjErr.value.password =
            "Password length should be in between 8 and 25";
        } else {
          singupObjErr.value.password = "";
        }
      }
      if (fieldName === "signupEmail") {
        if (!isEmail(singupObj.value.email)) {
          singupObjErr.value.email = "Please Enter a valid Email";
        } else {
          singupObjErr.value.email = "";
        }
      }
      if (fieldName === "signupUsername") {
        if (
          singupObj.value.username.length < 4 ||
          singupObj.value.username.length > 12
        ) {
          singupObjErr.value.username =
            "Username length should be in between 4 and 12";
        } else {
          singupObjErr.value.username = "";
        }
      }
    };

    return {
      token,
      singupObj,
      loginObj,
      onSignin,
      onSignup,
      modalClose,
      loginObjErr,
      singupObjErr,
      validation,
    };
  },
};
</script>
