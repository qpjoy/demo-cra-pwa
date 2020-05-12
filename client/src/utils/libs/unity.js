let userAgent = navigator.userAgent || navigator.vendor || window.opera;

function isIOS() {
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return true;
  }

  return false;
}

function isAndroid() {
  return /android/i.test(userAgent);
}

export function unityJSON(action, json) {
  const strJSON = JSON.stringify(json);
  let jsonArr = [json];
  let jsonArrJSON = JSON.stringify(jsonArr);

  if (isAndroid() || isIOS()) {
    // sendMessageToUnity(`${action}, ["${strJSON}"]`);
    console.log(action, json, " - - - -!!!");

    window.sendMessageToUnity(`${action}, ${jsonArrJSON}`);
  } else {
    console.log(action, window[action]);

    if (!window._zfb_event) {
      alert("ZFBrowser event is not bounded!");

      return;
    }

    if (!window[action]) {
      if (action === "userLogin") {
        window[action] = function() {
          window._zfb_event(
            1,
            JSON.stringify(Array.prototype.slice.call(arguments)),
          );
        };
      } else if (action === "setAutoLogin") {
        window[action] = function() {
          window._zfb_event(
            9,
            JSON.stringify(Array.prototype.slice.call(arguments)),
          );
        };
      } else if (action === "showAvatar") {
        window[action] = function() {
          window._zfb_event(
            17,
            JSON.stringify(Array.prototype.slice.call(arguments)),
          );
        };
      } else if (action === "googleAuth") {
        window[action] = function() {
          window._zfb_event(
            21,
            JSON.stringify(Array.prototype.slice.call(arguments)),
          );
        };
      } else if (action === "showFloatWeb") {
        window[action] = function() {
          window._zfb_event(
            11,
            JSON.stringify(Array.prototype.slice.call(arguments)),
          );
        };
      } else {
        return;
      }
    }

    // console.log(window['_zfb_event'], window[action], ' - - - -window???1');
    window[action](strJSON, `${action}, ${jsonArrJSON}`);
  }
}

export function zfbNotBind(action) {
  if (action === "userLogin") {
    window[action] = function() {
      window._zfb_event &&
        window._zfb_event(
          1,
          JSON.stringify(Array.prototype.slice.call(arguments)),
        );
    };
  }
}

export function unityListen(action, cb) {
  window[action] = cb;
}

export function unityUnlisten(action) {
  window[action] = function() {};
}

export function unityListenAspect(action, { listen, before, after }) {
  window[action] = listen;
  let native = window[action];

  window[action] = function() {
    before && before(action);
    native.apply(window, arguments);
    after && after(action);
  };
}
