<script lang="ts">
import firebase from "firebase/app";
import "firebase/auth";
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
</script>

{#if loggedIn}
  <div class="w-full max-w-xs">
    <div class="text-center">
      <h2>{user.email}</h2>
      <button type="button" class="mt-3" on:click="{logout}">Logout</button>
    </div>
  </div>
{:else}
  <div class="w-full max-w-xs">
    <form class="px-8 pt-6 pb-8 bg-white shadow-md">
      <div class="mb-4">
        <label for="email">Email</label>
        <input
          class="input-field"
          id="email"
          type="email"
          placeholder="name@acme.com"
        />
      </div>
      <div class="mb-6">
        <label for="password">Password</label>
        <input
          class="input-field"
          id="password"
          type="password"
          placeholder="******************"
        />
      </div>
      <div><button type="submit">Sign In</button></div>
      <div class="mt-3">
        <button type="button" on:click|preventDefault="{loginWithGoogle}">
          Sign In with Google
        </button>
      </div>
    </form>
  </div>
{/if}
