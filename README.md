# Test-IT Request System (Front-end)

## Documents

- [API Documentation](https://www.notion.so/API-Documentation-0b80d9faaa5943319805d00ce4cc8568?pvs=4)

- [Table Specification](https://www.notion.so/Table-Specification-69ebdfe8fb1f473b8206394cb5d5b50c?pvs=4)

- [Todolist](https://www.notion.so/To-do-list-79f648f978e54b1ca1adbd97341dff7f?pvs=4)

## Build Setup

```bash
# clone this project
git clone https://github.com/yhakana/it-req-fe.git

# enter into this project directory
cd it-req-fe

# install pnpm globally if you haven't done it
npm -g i pnpm@7.9.0

# install dependency
pnpm i

# start to develop with dev environment
pnpm run dev
```

using the browser to open [http://localhost:7070/](http://localhost:7070/)

## Build

```bash
# build for test environment
pnpm run build-test

# build for production environment
pnpm run build
```

## Others

```bash
# preview the release environment effect
pnpm run preview

# code format check
pnpm run lint
```

## Browsers support

Note: Vue3 is **not** supported the **Internet Explorer**
