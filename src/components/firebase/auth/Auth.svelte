<script lang="ts">
import firebase from "firebase/app";
import "firebase/auth";
import { Button, Modal } from "carbon-components-svelte";

const firebaseConfig = {
  apiKey: "AIzaSyAzeeTM8hDkORTYVX8EFbIJ9xwiYIAHbDw",
  authDomain: "maths-cea13.firebaseapp.com",
  databaseURL: "https://maths-cea13.firebaseio.com",
  projectId: "maths-cea13",
  storageBucket: "maths-cea13.appspot.com",
  messagingSenderId: "649822584631",
  appId: "1:649822584631:web:604309e3936a09282364b2",
  measurementId: "G-NZ68SFYE11",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let user = null;
let useRedirect: boolean = false;
const userMapper = (claims) => ({
  id: claims.user_id,
  name: claims.name,
  email: claims.email,
  picture: claims.picture,
});
const loginWithEmailPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const loginWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();

  if (useRedirect) {
    return auth.signInWithRedirect(provider);
  } else {
    return auth.signInWithPopup(provider);
  }
};
const logout = () => auth.signOut();

auth.onAuthStateChanged(async (fireUser) => {
  if (fireUser) {
    // in here you might want to do some further actions
    // such as loading more data, etc.

    // if you want to set custom claims such as roles on a user
    // this is how to get them because they will be present
    // on the token.claims object
    const token = await fireUser.getIdTokenResult();
    user = userMapper(token.claims);
  } else {
    user = null;
  }
});

$: loggedIn = user !== null;
let open = false;
</script>

{#if loggedIn}
  <Button size="small" kind="danger" on:click="{() => (open = true)}">
    Logout
  </Button>

  <Modal
    bind:open
    modalHeading="Logout"
    primaryButtonText="Logout"
    secondaryButtonText="Cancel"
    on:open
    on:click:button--secondary="{() => (open = false)}"
    on:close="{() => (open = false)}"
    on:submit="{logout}"
  >
    <div class="w-full max-w-xs">
      <div class="text-center">
        <h2>{user.email}</h2>
      </div>
    </div>
  </Modal>
{:else}
  <Button size="small" kind="danger" on:click="{() => (open = true)}">
    Login
  </Button>

  <Modal
    bind:open
    modalHeading="Login"
    primaryButtonText="Login"
    secondaryButtonText="Cancel"
    on:open
    on:click:button--secondary="{() => (open = false)}"
    on:close="{() => (open = false)}"
    on:submit
  >
    <div class="flex items-start justify-between">
      <div>
        <Button type="button" on:click="{loginWithGoogle}">
          Log In with Google
        </Button>
      </div>

      <form>
        <div>
          <label for="email">Email</label>
          <input
            class="input-field"
            id="email"
            type="email"
            placeholder="name@acme.com"
          />
        </div>
        <div>
          <label for="password">Password</label>
          <input
            class="input-field"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
      </form>
    </div>
  </Modal>
{/if}

<style lang="postcss">
label {
  @apply block mb-3 text-sm font-bold;
}
.input-field {
  @apply border w-full py-3 px-4 mb-4;
}
.input-field:focus {
  @apply shadow-outline outline-none;
}
</style>
