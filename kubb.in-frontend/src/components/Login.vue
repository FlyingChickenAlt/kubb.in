<template>
  <div id="appp">
    <div id="login">
      <div id="description">
        <h1>Kubb.in</h1>
        <p>
          By logging in you agree to the ridiculously long terms that you didn't
          bother to read. If you don't have an account register
          <a href="/register">here</a>
        </p>
      </div>
      <div id="form">
        <form @submit.prevent="handleLogin">
          <label for="username">Username</label>
          <input
            type="text"
            id="username"
            v-model="user.username"
            placeholder="username"
            autocomplete="off"
          />

          <label for="password">Password</label>&nbsp;
          <font-awesome-icon
            :icon="passwordIcon"
            @click="hidePassword = !hidePassword"
          />

          <input
            :type="passwordType"
            id="password"
            v-model="user.password"
            placeholder="**********"
          />

          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
const Auth = namespace("Auth");

@Component
export default class Login extends Vue {
  private user: any = { username: "", password: "" };
  private loading: boolean = false;
  private message: string = "";
  private hidePassword: boolean = true;

  get passwordType():string {
    return this.hidePassword ? "password" : "text";
  }
  get passwordIcon():string {
    return this.hidePassword ? "eye" : "eye-slash";
  }

  @Auth.Getter
  private isLoggedIn!: boolean;

  @Auth.Action
  private login!: (data: any) => Promise<any>;

  created() {
    if (this.isLoggedIn) {
      this.$router.push("/main");
    }
  }
  handleLogin() {
    this.loading = true;
    this.$validator.validateAll().then((isValid) => {
      if (!isValid) {
        this.loading = false;
        return;
      }

      if (this.user.username && this.user.password) {
        this.login(this.user).then(
          (data) => {
            this.$router.push("/main");
          },
          (error) => {
            this.loading = false;
            this.message = error;
          }
        );
      }
    });
  }
}
</script>

<style scoped>
:root {
  --modal-duration: 1s;
  --primary-color: #defcf9;
  --secondary-color: #42dbcc;
}

* {
  box-sizing: border-box;
  font-family: "Nunito", sans-serif;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}

div#appp {
  width: 100%;
  height: 100vh;
}

div#app div#login {
  align-items: center;
  background-color: var(--primary-color);
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

div#app div#login div#description {
  background-color: #ffffff;
  width: 280px;
  padding: 35px;
}

div#app div#login div#description h1,
div#app div#login div#description p {
  margin: 0;
}

div#app div#login div#description p {
  font-size: 0.8em;
  color: #95a5a6;
  margin-top: 10px;
}

div#app div#login div#form {
  background-color: var(--secondary-color);
  border-radius: 5px;
  box-shadow: 0px 0px 30px 0px #666;
  color: #ecf0f1;
  width: 260px;
  padding: 35px;
}

div#app div#login div#form label,
div#app div#login div#form input {
  outline: none;
  width: 100%;
}

div#app div#login div#form label {
  color: #000;
  font-size: 0.8em;
}

div#app div#login div#form input {
  background-color: transparent;
  border: none;
  color: #ecf0f1;
  font-size: 1em;
  margin-bottom: 20px;
}

div#app div#login div#form ::placeholder {
  color: #ecf0f1;
  opacity: 1;
}

div#app div#login div#form button {
  background-color: #ffffff;
  cursor: pointer;
  border: none;
  padding: 10px;
  transition: background-color 0.2s ease-in-out;
  width: 100%;
}

div#app div#login div#form button:hover {
  background-color: #eeeeee;
}

a {
  text-decoration: none;
  color: #95a5a6;
}

a:visited {
  text-decoration: none;
  color: #95a5a6;
}

.error {
  color: var(--primary-color);
  margin: 0;
  display: none;
  transition: 1s ease-in-out;
}

@media screen and (max-width: 600px) {
  div#app div#login {
    align-items: unset;
    background-color: unset;
    display: unset;
    justify-content: unset;
  }

  div#app div#login div#description {
    margin: 0 auto;
    max-width: 350px;
    width: 100%;
  }

  div#app div#login div#form {
    border-radius: unset;
    box-shadow: unset;
    width: 100%;
  }

  div#app div#login div#form form {
    margin: 0 auto;
    max-width: 280px;
    width: 100%;
  }
}
</style>
