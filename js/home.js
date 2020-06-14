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
      .then(async ({ valid }) => {
        if (!valid) {
          clearStorage();
          return;
        }
        const userData = await getUserData(token);
        if (!userData) {
          localStorage.removeItem("n-cycle-auth");
          window.location = "index.html";
        }
        if (!userData.tanks.length) {
          // prompt user to create a new tank
          // show popup form to fill in name and gallons of tank
          console.log("create a new tank!");
          return;
        }
        // fetch data for all tanks
        let tanks = await getTanks(token, userData.tanks);
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

function getTanks(token, tankIds) {
  return Promise.all(
    tankIds.map(({ _id }) => {
      return fetch(`${SERVER_URL}/tank/${_id}`, {
        headers: { authorization: "Bearer " + token },
      });
    })
  )
    .then((responses) => {
      return Promise.all(
        responses.map((res) => {
          return res.json();
        })
      );
    })
    .then((w) => {
      return w;
    })
    .catch((e) => {
      console.log("something wrong with Promise.all fetching tanks");
    });
}

function clearStorage() {
  localStorage.removeItem("n-cycle-auth");
  window.location = "index.html";
}
