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
var SERVER_URL = "http://localhost:8080";
var authVisible = false;
document.addEventListener("click", hideAuthField);
window.onload = function () {
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
            console.log(valid);
            if (!valid) {
                localStorage.removeItem("n-cycle-auth");
                return;
            }
            window.location = __assign(__assign({}, window.location), { href: "home.html" });
        });
    }
};
function hideAuthField(event) {
    var authBtns = document.querySelector(".auth");
    var authFields = document.querySelectorAll(".auth-fields");
    var inputs = document.querySelectorAll("input");
    if (authBtns.contains(event.target)) {
        return;
    }
    authFields.forEach(function (field) {
        var element = event.target;
        if (!field.contains(event.target) || element.tagName) {
            if (field.style.animation.indexOf("slideUp") !== -1) {
                field.style.animation = "slideDown .5s ease forwards";
                setTimeout(function () {
                    field.style.display = "none";
                    field.classList.remove("warn", "error");
                    inputs.forEach(function (input) {
                        input.value = "";
                    });
                }, 500);
                authVisible = false;
                warning("");
            }
        }
    });
}
function revealLogin() {
    authVisible = true;
    var login = document.querySelector(".login");
    var uname = document.querySelector("#username-login");
    login.style.display = "flex";
    login.style.animation = "slideUp .5s ease forwards";
    setTimeout(function () {
        uname.focus();
    }, 500);
}
function revealSignup() {
    authVisible = true;
    var signup = document.querySelector(".signup");
    var uname = document.querySelector("#username-signup");
    signup.style.display = "flex";
    signup.style.animation = "slideUp .5s ease forwards";
    setTimeout(function () {
        uname.focus();
    }, 500);
}
function signup() {
    var username = document.querySelector("#username-signup");
    var pword = document.querySelector("#password-signup");
    var pword2 = document.querySelector("#password2-signup");
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
    fetch(SERVER_URL + "/signup", {
        method: "POST",
        body: JSON.stringify({ name: username.value, password: pword.value })
    })
        .then(function (res) {
        if (res.ok)
            return res.json();
        console.log("something happened in first then ", res);
    })
        .then(function (response) {
        if (response.error) {
            console.log("an error", response.error);
            warning("User already exists");
            warnElement(null, "signup");
        }
        else {
            localStorage.setItem("n-cycle-auth", response.token);
            window.location = __assign(__assign({}, window.location), { href: "home.html" });
        }
    })["catch"](function (e) {
        console.log("catching error: ", e);
        warning("Failed to contact server");
        warnElement(null, "signup");
    });
}
function login() {
    var username = document.querySelector("#username-login");
    var pword = document.querySelector("#password-login");
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
    fetch(SERVER_URL + "/login", {
        method: "POST",
        body: JSON.stringify({ name: username.value, password: pword.value })
    })
        .then(function (res) {
        if (res.ok) {
            return res.json();
        }
        else {
            console.log(res);
        }
    })
        .then(function (response) {
        if (response.error) {
            warning("Incorrect username or password");
            warnElement(null, "login");
        }
        else {
            localStorage.setItem("n-cycle-auth", response.token);
            window.location = __assign(__assign({}, window.location), { href: "home.html" });
        }
    })["catch"](function (e) {
        console.log("catching error: ", e);
        warning("Failed to contact server");
        warnElement(null, "login");
    });
}
function warnElement(el, useCase) {
    var authFieldS = document.querySelector(".signup");
    var authFieldL = document.querySelector(".login");
    if (el !== null) {
        el.style.animation = "shake ease .2s";
        var t1_1 = setTimeout(function () {
            el.style.animation = "";
            clearTimeout(t1_1);
        }, 200);
    }
    var t2;
    if (useCase === "signup") {
        authFieldS.classList.add("warn");
        t2 = setTimeout(function () {
            authFieldS.classList.remove("warn");
            clearTimeout(t2);
        }, 2000);
    }
    else {
        authFieldL.classList.add("warn");
        t2 = setTimeout(function () {
            authFieldL.classList.remove("warn");
            clearTimeout(t2);
        }, 2000);
    }
}
function warning(text) {
    var warnTexts = document.querySelectorAll(".warn-text");
    warnTexts.forEach(function (warnText) {
        warnText.innerHTML = text;
        warnText.style.opacity = "1";
        var t1 = setTimeout(function () {
            warnText.innerHTML = "";
            warnText.style.opacity = "0";
            clearTimeout(t1);
        }, 5000);
    });
}
//# sourceMappingURL=auth.js.map