# User Groups

## Server

This project uses a dummy API implemented in `src/pages/api` which creates a simple
interface for managing user groups. It is deliberately simple, and the documentation
can be found at `/swagger`. If you want to make changes to the API, feel free. You
can find instructions for syncing the client API below.

## Client

The client is built using `next`, and utilises css-in-js along with `twin.macro`
for styling. The client api for the server is generated using a tool called 
[`orval`](https://orval.dev/), which can be invoked to synchronize the client code 
with the server openapi definitions after making changes.

```shell
yarn install
yarn api:sync
```

The resulting service definitions (fully typed) are generated into `src/service`,
and available as hooks, using `react-query` for persistence and caching.

Other commands are available in `package.json`

```shell
yarn dev # development server
yarn build # production build
```

> **notice**: When running in development, the first call to the api may reset state.
              This is a side-effect of next's lazy building; when loading new api
              endpoints, the file is-reevaluated, and the state is reset. This may
              manifest as development-only bugs, but _does not happed in production_.
