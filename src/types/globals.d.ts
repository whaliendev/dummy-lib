/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare type Recordable<T = any> = Record<string, T>

declare type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] }

declare type TabEnum = 'user' | 'admin'
declare type FormRules<D> = {
  [field in keyof D]: Array<FormRule>
}
