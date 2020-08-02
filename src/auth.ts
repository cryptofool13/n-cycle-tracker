const SERVER_URL = "http://localhost:8080";
let authVisible = false;

document.addEventListener("click", hideAuthField);

window.onload = () => {
  // check local storage for saved token
  let token;
  try {
    token = localStorage.getItem("n-cycle-auth");
  } catch (e) {
    console.log(e, "window on load error");
  }
  if (token) {
    fetch(`${SERVER_URL}/verify`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(({ valid }) => {
        console.log(valid);
        if (!valid) {
          localStorage.removeItem("n-cycle-auth");
          return;
        }
        window.location = { ...window.location, href: "home.html" };
      });
  }
};

function hideAuthField(event: MouseEvent) {
  const authBtns = document.querySelector(".auth");
  const authFields = document.querySelectorAll(".auth-fields");
  const inputs = document.querySelectorAll("input");

  if (authBtns.contains(event.target as HTMLElement)) {
    return;
  }

  authFields.forEach((field: HTMLElement) => {
    let element = event.target as HTMLElement;
    if (!field.contains(event.target as HTMLElement) || element.tagName) {
      if (field.style.animation.indexOf("slideUp") !== -1) {
        field.style.animation = `slideDown .5s ease forwards`;
        setTimeout(() => {
          field.style.display = "none";
          field.classList.remove("warn", "error");
          inputs.forEach((input) => {
            input.value = "";
          });
        }, 500);
        authVisible = false;
        // clear warning text
        warning("");
      }
    }
  });
}

function revealLogin() {
  authVisible = true;
  const login: HTMLElement = document.querySelector(".login");
  const uname: HTMLElement = document.querySelector("#username-login");
  login.style.display = "flex";
  login.style.animation = `slideUp .5s ease forwards`;
  setTimeout(() => {
    uname.focus();
  }, 500);
}

function revealSignup() {
  authVisible = true;
  const signup: HTMLElement = document.querySelector(".signup");
  const uname: HTMLElement = document.querySelector("#username-signup");
  signup.style.display = "flex";
  signup.style.animation = `slideUp .5s ease forwards`;
  setTimeout(() => {
    uname.focus();
  }, 500);
}

function signup() {
  const username: HTMLInputElement = document.querySelector("#username-signup");
  const pword: HTMLInputElement = document.querySelector("#password-signup");
  const pword2: HTMLInputElement = document.querySelector("#password2-signup");

  if (!username.value.length) {
    warnElement(username, "signup");
    warning("Please enter a username");
    return;
  }
  if (!pword.value.length) {
    warnElement(pword, "signup");
    warning("Please enter a password");
    return;
  }
  if (!pword2.value.length) {
    warnElement(pword2, "signup");
    warning("Please retype your password");
    return;
  }

  if (pword.value !== pword2.value) {
    warnElement(pword2, "signup");
    warning("Passwords do not match");
    return;
  }

  fetch(`${SERVER_URL}/signup`, {
    method: "POST",
    body: JSON.stringify({ name: username.value, password: pword.value }),
  })
    .then((res) => {
      if (res.ok) return res.json();
      console.log("something happened in first then ", res);
    })
    .then((response) => {
      if (response.error) {
        console.log("an error", response.error);
        warning("User already exists");
        warnElement(null, "signup");
      } else {
        // save token in localstorage and nav to next page
        localStorage.setItem("n-cycle-auth", response.token);
        // nav to next page
        window.location = "home.html";
      }
    })
    .catch((e) => {
      console.log("catching error: ", e);
      warning("Failed to contact server");
      warnElement(null, "signup");
    });
}

function login() {
  const username: HTMLInputElement = document.querySelector("#username-login");
  const pword: HTMLInputElement = document.querySelector("#password-login");
  if (!username.value.length) {
    warnElement(username, "login");
    warning("Please enter a username");
    return;
  }
  if (!pword.value.length) {
    warnElement(pword, "login");
    warning("Please enter a password");
    return;
  }

  fetch(`${SERVER_URL}/login`, {
    method: "POST",
    body: JSON.stringify({ name: username.value, password: pword.value }),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        console.log(res);
      }
    })
    .then((response) => {
      if (response.error) {
        warning("Incorrect username or password");
        warnElement(null, "login");
      } else {
        localStorage.setItem("n-cycle-auth", response.token);
        // nav to next page
        window.location = "home.html";
      }
    })
    .catch((e) => {
      console.log("catching error: ", e);
      warning("Failed to contact server");
      warnElement(null, "login");
    });
}

function warnElement(el, where) {
  const authFieldS = document.querySelector(".signup");
  const authFieldL = document.querySelector(".login");

  if (el !== null) {
    el.style.animation = `shake ease .2s`;
    let t1 = setTimeout(() => {
      el.style.animation = ``;
      clearTimeout(t1);
    }, 200);
  }
  let t2;
  if (where === "signup") {
    authFieldS.classList.add("warn");
    t2 = setTimeout(() => {
      authFieldS.classList.remove("warn");
      clearTimeout(t2);
    }, 2000);
  } else {
    authFieldL.classList.add("warn");
    t2 = setTimeout(() => {
      authFieldL.classList.remove("warn");
      clearTimeout(t2);
    }, 2000);
  }
}

function warning(text) {
  const warnTexts = document.querySelectorAll(".warn-text");
  warnTexts.forEach((warnText) => {
    warnText.innerHTML = text;
    warnText.style.opacity = 1;
    let t1 = setTimeout(() => {
      warnText.innerHTML = "";
      warnText.opacity = 0;
      clearTimeout(t1);
    }, 5000);
  });
}
