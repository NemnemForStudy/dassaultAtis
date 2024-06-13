export default function debounce(fn, delay) {
  let timeoutID = null;
  return function (...args) {
    clearTimeout(timeoutID);
    const that = this;
    timeoutID = setTimeout(() => {
      fn.apply(that, args);
    }, delay);
  };
}
