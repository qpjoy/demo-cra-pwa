export const _importImage = result => {
  let images = {};

  result.keys().map(item => {
    return (images[item.replace("./", "")] = result(item));
  });

  return images;
};

export const _historyHandler = options => {
  if (!options) {
    return;
  }

  if (options.jump) {
    return options.history.push(options.jump);
  }

  if (options.step === "back") {
    options.history.goBack();
  } else if (options.step === "next") {
    options.history.goForward();
  }
};
