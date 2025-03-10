import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCsY1X-dFMumMntR74GF86Otx-VEYKZzIE",
  authDomain: "pace-52f35.firebaseapp.com",
  projectId: "pace-52f35",
  storageBucket: "pace-52f35.appspot.com",
  messagingSenderId: "630887135858",
  appId: "1:630887135858:web:317de71e655d58276e60eb",
  measurementId: "G-G4QFKJZFRB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = "it";
const provider = new GoogleAuthProvider();

// page toggling
const loginDiv = document.getElementById("loginDiv");
const signupDiv = document.getElementById("signUpDiv");
const signupLink = document.getElementById("signUpLink");

let isLogged = false;

signupLink.addEventListener("click", () => {
  loginDiv.classList.add("hidden");
  signupDiv.classList.remove("hidden");
});

const loginBtn = document.getElementById("loginBtn");
const loginMsg = document.getElementById("loginMessage");

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (
      document.activeElement == document.getElementById("email") ||
      document.activeElement == document.getElementById("pass")
    ) {
      loginBtn.click();
    }
  }
});
const rememberMeCheckbox = document.getElementById("checkBox");
loginBtn.addEventListener("click", () => {
  console.log("login clicked");
  const loginEmail = document.getElementById("email").value;
  const loginPassword = document.getElementById("pass").value;

  // signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  //   .then((userCredential) => {
  //     const user = userCredential.user;
  //     loginMsg.classList.add("text-green-600");
  //     loginMsg.innerHTML = "login successful";

  //     setTimeout(() => {
  //       window.location.href = "modules.html";
  //     }, 500);
  //   })
  //   .catch((error) => {
  //     const errorMessage = error.message;
  //     loginMsg.classList.add("text-red-400");
  //     loginMsg.innerHTML = "login unsuccessful";
  //   });

  const persistence = rememberMeCheckbox.checked
    ? browserLocalPersistence // Remember the session across tabs and browser restarts
    : browserSessionPersistence; // Only keep the session in the current tab

  setPersistence(auth, persistence)
    .then(() => {
      // Proceed with login
      return signInWithEmailAndPassword(auth, loginEmail, loginPassword);
    })
    .then((userCredential) => {
      const user = userCredential.user;
      loginMsg.classList.add("text-green-600");
      loginMsg.innerHTML = "Login successful";
      setTimeout(() => {
        window.location.href = "modules.html"; // Redirect after successful login
      }, 500);
    })
    .catch((error) => {
      loginMsg.classList.add("text-red-400");
      loginMsg.innerHTML = "Login unsuccessful";
    });
});

const registerBtn = document.getElementById("register");
const registerMsg = document.getElementById("registerMessage");

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    if (
      document.activeElement == document.getElementById("signupEmail") ||
      document.activeElement == document.getElementById("signupPass")
    ) {
      registerBtn.click();
    }
  }
});

registerBtn.addEventListener("click", () => {
  const registerEmail = document.getElementById("signupEmail").value;
  const registerPassword = document.getElementById("signupPass").value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      registerMsg.classList.add("text-green-600");
      registerMsg.innerHTML = "SignUp successful";

      setTimeout(() => {
        window.location.href = "modules.html";
      }, 500);
    })
    .catch((error) => {
      const errorMessage = error.message;
      registerMsg.classList.add("text-red-400");
      registerMsg.innerHTML = "SignUp unsuccessful";
    });
});

const googleBtn = document.getElementById("googleBtn");
googleBtn.addEventListener("click", () => {
  console.log("google");
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      loginMsg.classList.add("text-green-600");
      loginMsg.innerHTML = "login successful";
      window.location.href = "modules.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
});
