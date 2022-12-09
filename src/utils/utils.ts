const getRawType = (val: object) => {
  return Object.prototype.toString.call(val).slice(8, -1)
}

export function isFunction(fn: any): boolean {
  return typeof fn === 'function'
}

export function isString(s: any): boolean {
  return typeof s === 'string'
}

export function isObject(o: any): boolean {
  return getRawType(o) === 'Object'
}

export function isObjectOrArray(o: any): boolean {
  return isObject(o) || Array.isArray(o)
}

export const merge = <T extends { [key: string]: any }>(object: T, ...sources: T[]): T => {
  for (const source of sources) {
    for (const key in source) {
      if (source[key] === undefined && key in object)
        continue

      if (isObjectOrArray(source[key])) {
        if (isObjectOrArray(object[key]) && getRawType(object[key]) === getRawType(source[key])) {
          if (isObject(object[key]))
            merge(object[key], source[key])
          else
            object[key] = object[key].concat(source[key])
        }
        else {
          object[key] = source[key]
        }
      }
      else {
        object[key] = source[key]
      }
    }
  }
  return object
}

export function cloneDeep<T>(obj: T): T
export function cloneDeep(obj: any): any {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Date) {
    const copy = new Date()
    copy.setTime(obj.getTime())
    return copy
  }

  if (Array.isArray(obj)) {
    const copy = []
    for (let i = 0, len = obj.length; i < len; i++)
      copy[i] = cloneDeep(obj[i])
    return copy
  }

  if (obj instanceof Object) {
    const copy: Record<any, any> = {}
    for (const attr in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, attr)) // obj.hasOwnProperty(attr)
        copy[attr] = cloneDeep(obj[attr])
    }
    return copy
  }

  return obj
}
