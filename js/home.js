const SERVER_URL = "http://localhost:8080";
let user;
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
        const userData = getUserData(token);
        if(!userData.tanks) {
          // prompt user to create a new tank
          
        }
        // display tank data
      });
  } else {
    window.location = "index.html";
  }
};

async function getUserData(token) {
  let req = await fetch(`${SERVER_URL}/user`, {
    headers: { authorization: "Bearer " + token },
  });
  let res = await req.json();
  let { user } = res;
  return user;
}
// what happens after token is valid and user is loaded in browser?
// if no tanks, prompt user to craete new tank
// else display tanks on page
