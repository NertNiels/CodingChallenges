var mathf = function(obj) {
  if (obj instanceof mathf ) return obj;
  if (!(this instanceof mathf )) return new mathf(obj);
};

mathf.inverseLerp = function (a, b, v) {
  return (v - a) / (b - a);
}
