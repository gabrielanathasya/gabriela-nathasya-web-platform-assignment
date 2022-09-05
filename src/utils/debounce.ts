export const debounce = (fn: any, delay: number = 800) => {
  let timeoutID: any
  return function (...args: any) {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
