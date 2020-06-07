const SERVER_URL = "http://localhost:8080";
let user
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
        if (!valid) {
          localStorage.removeItem("n-cycle-auth");
          window.location = "index.html";
          return;
        }
        fetch(`${SERVER_URL}/user`, {
          headers: { authorization: "Bearer " + token },
        })
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((response) => {
            user = response.user
            console.log(user);
          });
      });
  } else {
    window.location = "index.html";
  }
};

// what happens after token is valid and user is loaded in browser?
// if no tanks, prompt user to craete new tank
// else display tanks on page
