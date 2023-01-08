<h2 align="center"> dummy-lib </h2>

<p align="center">A vue3 web app wrapped with electron. </p>

### Note

This project is a **semi-finished** course project, also a hands-on attempt with Electron and Vue3.  However, we have handed in our homework, it may not get any further development or maintenance.



### Preview

**Homepage**

![image-20230108221525242](https://gallery-1259614029.cos.ap-chengdu.myqcloud.com/img/image-20230108221525242.png)

**Login**

![shadow](https://gallery-1259614029.cos.ap-chengdu.myqcloud.com/img/shadow.png)

**Admin**

![image-20230108231715316](https://gallery-1259614029.cos.ap-chengdu.myqcloud.com/img/image-20230108231715316.png)

![image-20230108231919774](https://gallery-1259614029.cos.ap-chengdu.myqcloud.com/img/image-20230108231919774.png)



### Develop

#### Tech Stack

Electron + Vue3 + Typescript + T-Design

#### Project Layout

```text
.
├── dist
├── dist-electron
├── electron
├── electron-builder.json
├── index.html
├── LICENSE
├── package.json
├── public
├── README.md
├── release
├── src
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

| filename                       | what                                       |
| :----------------------------- | :----------------------------------------- |
| `dist`                         | build files of web app                     |
| `dist-electron`                | build files of electron app                |
| `electron`                     | source code of electron-related code       |
| `electron-builder.json`        | the config files of elctron-builder makers |
| `index.html`                   | entrypoint of vite server                  |
| `LICENSE`                      | the license we used in this proj           |
| `package.json`                 | npm dep manifest                           |
| `public`                       | static resources                           |
| `README.md`                    | the file you are reading                   |
| `release`                      | output dir of electron-build               |
| `src`                          | source code of vue web app                 |
| `tsconfig.json, tsconfig.json` | ts config files                            |
| `vite.config.json`             | vite config file                           |
| `yarn.lock`                    | pin the version of deps                    |

#### Getting Started

##### Available Scripts

In this project directory, you can run:  
`yarn`  
install dependencies

`yarn prepare`  
install git hooks

`yarn dev`  
open a HMR dev server to reflect the code changes

`yarn build`  
build electron app, output the binaries to `release` folder

`yarn lint`  
show the lint messages

`yarn lint:fix`  
fix the errors and warnings reported by eslint. Typically, you don't need to call this script, as it's configured as a git commit hooks already.

`git commit --no-verify`  
skip `git commit` hooks. In general, Don't do this! If you think one file should not be linted, just ignore it in `.eslintignore`.



### Userful Resources

[Vue3](https://vuejs.org/guide/introduction.html)  
[Pinia](https://pinia.vuejs.org/)  
[Vue Router](https://router.vuejs.org/)  
[electron](https://www.electronjs.org/docs/latest)
