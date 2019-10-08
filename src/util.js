const mapObject = (fn, object) =>
  Object.keys(object).reduce((result, key) => {
    result[key] = fn(key, object[key], object);
    return result;
  }, {});

export const findTypes = (labels, args) =>
  mapObject(
    (label, type) =>
      args.find(arg =>
        type === "array" ? arg instanceof Array : typeof arg === type
      ),
    labels
  );

export const loopRange = (min, max, callback) => {
  for (let i = min; i <= max; i++) {
    callback(i);
  }
};
