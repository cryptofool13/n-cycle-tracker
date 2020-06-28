const TANKS_DEV = [
  { gallons: 15, name: "Tank 1" },
  { gallons: 25, name: "Tank 2" },
  // { gallons: 15, name: "Tank 3" },
];

const SERVER_URL = "http://localhost:8080";
let user;
window.onload = () => {
  const main = document.querySelector("main");

  main.addEventListener("click", hideTankList);
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
        // add loading state if tanks arent here yet!!

        // display tank data
        // console.log(tanks);
        const tankList = document.querySelector(".tank-list");
        // using hard coded tanks for DEV
        tanks = TANKS_DEV;
        // store ref to tanks on window
        window["n-cycle-tanks"] = tanks;
        const len = tanks.length;
        // if fewer than 3 tanks, display "add new tank" tile
        tanks.forEach((tank, i) => {
          tankList.appendChild(renderTank(tank, i));
        });
        if (len < 3) {
          tankList.appendChild(newTankTile(len));
        }
      });
  } else {
    // nav to login page
    window.location = "index.html";
  }
};

function hideTankList(e) {
  const tankList = document.querySelector(".tank-list");
  if (e.target.contains(tankList) && e.target !== tankList) {
    tankList.classList.add("hidden");
  }
}

function displayTankOptions() {
  const tankList = document.querySelector(".tank-list");
  tankList.classList.remove("init");
  tankList.classList.toggle("hidden");
}

function renderTank(tank, i) {
  // add click handler
  const wrapper = document.createElement("li");
  wrapper.addEventListener("click", handleTankClick);
  wrapper.classList.add("tank");
  const name = document.createElement("p");
  const gals = document.createElement("p");
  name.innerText = tank.name;
  gals.innerText = tank.gallons + " gal";
  wrapper.appendChild(name);
  wrapper.appendChild(gals);
  wrapper.dataset.index = i;
  return wrapper;
}

function handleTankClick(event) {
  console.log(`tank ${this.dataset.index} clicked`);
  console.log(window["n-cycle-tanks"][this.dataset.index]);
}

function handleNewTankClick(event) {
  console.log("creating new tank");
}

function newTankTile() {
  const wrapper = document.createElement("li");
  wrapper.addEventListener("click", handleNewTankClick);
  wrapper.classList.add("tank");
  wrapper.innerText = "Add new tank";
  return wrapper;
}

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
    tankIds.map((id) => {
      return fetch(`${SERVER_URL}/tank/${id}`, {
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
