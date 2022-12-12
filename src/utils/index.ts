export function throttle(func: Function, timeout = 300) {
  let ready = true
  return (...args: any[]) => {
    if (!ready)
      return

    ready = false
    func(...args)
    setTimeout(() => {
      ready = true
    }, timeout)
  }
}

export function debounce(func: Function, timeout = 500) {
  let timer: NodeJS.Timeout
  return (...args: any) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func(...args)
    }, timeout)
  }
}
