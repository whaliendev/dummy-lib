import type { AxiosRequestConfig, Canceler } from 'axios'
import axios from 'axios'
import { isFunction } from '../utils'

// map to store <request, cancel_token> entries
let pendingMap = new Map<string, Canceler>()

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&')

export class AxiosCanceler {
  // add requests to list
  addPending(config: AxiosRequestConfig) {
    this.removePending(config)
    const url = getPendingUrl(config)
    config.cancelToken = config.cancelToken
      || new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // add this request to the map if it doesn't exist
          pendingMap.set(url, cancel)
        }
      })
  }

  // clear all requests
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      if (cancel && isFunction(cancel))
        cancel()
    })
    pendingMap.clear()
  }

  // delete specific request
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config)

    if (pendingMap.has(url)) {
      // If there is a current request identifier in pending,
      // the current request needs to be cancelled and removed
      const cancel = pendingMap.get(url)
      if (cancel)
        cancel(url)
      pendingMap.delete(url)
    }
  }

  reset() {
    pendingMap = new Map<string, Canceler>()
  }
}
