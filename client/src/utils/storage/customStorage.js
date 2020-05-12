export const getLocalItem = key => {
  const item = window.localStorage.getItem(key);

  if (item) {
    try {
      return JSON.parse(item);
    } catch (e) {
      return undefined;
    }
  }

  return undefined;
};

export const setLocalItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const getSessionItem = key => {
  const item = window.localStorage.getItem(key);

  if (item) {
    return JSON.parse(item);
  }

  return undefined;
};

export const setSessionItem = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

export const setCacheWithChain = (key, value, isToLocal = true) => {
  if (key.indexOf(".") > -1) {
    const keys = key.split(".");
    const wraperKey = keys[0];
    const wrapperObj = isToLocal
      ? getLocalItem(wraperKey) || {}
      : getSessionItem(wraperKey) || {};

    keys.shift();
    setValueObj(wrapperObj, keys, value);

    isToLocal
      ? setLocalItem(wraperKey, wrapperObj)
      : setSessionItem(wraperKey, wrapperObj);

    return;
  }

  isToLocal ? setLocalItem(key, value) : setSessionItem(key, value);
};

const setValueObj = (obj, keys, value) => {
  if (!obj) {
    obj = {};
  }

  if (keys.length === 1) {
    obj[keys[0]] = value;

    return obj;
  }

  const wrapKey = keys[0];

  if (!Object.keys(obj).includes(wrapKey)) {
    obj[wrapKey] = {};
  }

  keys.shift();
  obj[wrapKey] = setValueObj(obj[wrapKey], keys, value);

  return obj;
};

export const getCacheWithChain = (key, isFromLocal = true) => {
  if (key.indexOf(".") > -1) {
    const keys = key.split(".");

    const wrapperObj = isFromLocal
      ? getLocalItem(keys[0])
      : getSessionItem(keys[0]);

    keys.shift();

    return getValueObj(wrapperObj, keys);
  }

  return getLocalItem(key);
};

export const getValueObj = (obj, keys) => {
  if (!obj) {
    return undefined;
  }

  const wrapObj = obj[keys[0]];
  const isObject =
    Object.prototype.toString.call(wrapObj) === "[object Object]";
  const hasNext = keys.length > 1 && Object.keys(wrapObj).includes(keys[1]);

  if (isObject && hasNext) {
    keys.shift();

    return getValueObj(wrapObj, keys);
  }

  return obj[keys[0]];
};
