var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var TANKS_DEV = [
    { gallons: 15, name: "Tank 1" },
    { gallons: 25, name: "Tank 2" },
];
var SERVER_URL = "http://localhost:8080";
var user;
window.onload = function () {
    var main = document.querySelector("main");
    main.addEventListener("click", hideTankList);
    var token;
    try {
        token = localStorage.getItem("n-cycle-auth");
    }
    catch (e) {
        console.log(e, "window on load error");
    }
    if (token) {
        fetch(SERVER_URL + "/verify", {
            method: "POST",
            headers: {
                authorization: "Bearer " + token
            }
        })
            .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
            .then(function (_a) {
            var valid = _a.valid;
            return __awaiter(_this, void 0, void 0, function () {
                var userData, tanks, tankList, len;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!valid) {
                                clearStorage();
                                return [2];
                            }
                            return [4, getUserData(token)];
                        case 1:
                            userData = _b.sent();
                            if (!userData) {
                                localStorage.removeItem("n-cycle-auth");
                                window.location = __assign(__assign({}, window.location), { href: "index.html" });
                            }
                            if (!userData.tanks.length) {
                                console.log("create a new tank!");
                                return [2];
                            }
                            return [4, getTanks(token, userData.tanks)];
                        case 2:
                            tanks = _b.sent();
                            tankList = document.querySelector(".tank-list");
                            tanks = TANKS_DEV;
                            displayInitalData(tanks);
                            console.log(tanks);
                            window["n-cycle-tanks"] = tanks;
                            len = tanks.length;
                            tanks.forEach(function (tank, i) {
                                tankList.appendChild(renderTank(tank, i));
                            });
                            if (len < 3) {
                                tankList.appendChild(newTankTile());
                            }
                            return [2];
                    }
                });
            });
        });
    }
    else {
        window.location = __assign(__assign({}, window.location), { href: "index.html" });
    }
};
function hideTankList(e) {
    var tankList = document.querySelector(".tank-list");
    var tar = e.target;
    if (tar.contains(tankList) && e.target !== tankList) {
        tankList.classList.add("hidden");
    }
}
function displayTankOptions() {
    var tankList = document.querySelector(".tank-list");
    tankList.classList.remove("init");
    tankList.classList.toggle("hidden");
}
function renderTank(tank, i) {
    var wrapper = document.createElement("li");
    wrapper.addEventListener("click", handleTankClick);
    wrapper.classList.add("tank");
    var name = document.createElement("p");
    var gals = document.createElement("p");
    name.innerText = tank.name;
    gals.innerText = tank.gallons + " gal";
    wrapper.appendChild(name);
    wrapper.appendChild(gals);
    wrapper.dataset.index = "" + i;
    return wrapper;
}
function displayInitalData(tanks) {
    var mainArea = document.querySelector(".main-area");
    if (tanks.length > 1) {
        var tanksHtml = displayTanksInit(tanks);
        var tankArea_1 = document.createElement("div");
        tankArea_1.classList.add("tank-area");
        var prompt_1 = document.createElement("p");
        prompt_1.classList.add("prompt");
        prompt_1.innerHTML = "Select a tank";
        console.log(tanksHtml);
        tanksHtml.forEach(function (el) {
            tankArea_1.appendChild(el);
        });
        mainArea.appendChild(tankArea_1);
        mainArea.appendChild(prompt_1);
    }
    else {
    }
}
function displaySelectedTank(tank) { }
function displayTanksInit(tanks) {
    return tanks.map(function (tank) { return createTankLarge(tank); });
}
function createTankLarge(tank) {
    var tankWrapper = document.createElement("div");
    tankWrapper.classList.add("tank-large");
    var tankName = document.createElement("p");
    tankName.classList.add("tank-name");
    var tankGal = document.createElement("p");
    tankGal.classList.add("tank-gal");
    tankName.innerHTML = tank.name;
    tankGal.innerHTML = tank.gallons + " gals";
    tankWrapper.appendChild(tankName);
    tankWrapper.appendChild(tankGal);
    return tankWrapper;
}
function handleTankClick(event) {
    console.log("tank " + this.dataset.index + " clicked");
    console.log(window["n-cycle-tanks"][this.dataset.index]);
}
function handleNewTankClick(event) {
    console.log("creating new tank");
}
function newTankTile() {
    var wrapper = document.createElement("li");
    wrapper.addEventListener("click", handleNewTankClick);
    wrapper.classList.add("tank");
    wrapper.innerText = "Add new tank";
    return wrapper;
}
function getUserData(token) {
    return __awaiter(this, void 0, void 0, function () {
        var req, res, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fetch(SERVER_URL + "/user", {
                        headers: { authorization: "Bearer " + token }
                    })];
                case 1:
                    req = _a.sent();
                    return [4, req.json()];
                case 2:
                    res = _a.sent();
                    user = res.user;
                    return [2, user];
            }
        });
    });
}
function getTanks(token, tankIds) {
    return new Promise.all(tankIds.map(function (id) {
        return fetch(SERVER_URL + "/tank/" + id, {
            headers: { authorization: "Bearer " + token }
        });
    }))
        .then(function (responses) {
        return Promise.all(responses.map(function (res) {
            return res.json();
        }));
    })
        .then(function (w) {
        return w;
    })["catch"](function (e) {
        console.log("something wrong with Promise.all fetching tanks");
    });
}
function clearStorage() {
    localStorage.removeItem("n-cycle-auth");
    window.location = __assign(__assign({}, window.location), { href: "index.html" });
}
//# sourceMappingURL=home.js.map