# React training

A pet project to learn React. Intended for local development and experimentation.

## What's the app about

Determine how similar your music taste is compared to another user's, using [Spotify][spotify] accounts.

### Features

- Authorise two Spotify users via OAuth (current implementation stores the access token in `localStorage` for development convenience; avoid persisting raw tokens in production)
- Compare their top tracks and show:
  - Compatibility percentage
  - Up to 5 matching tracks as embedded Spotify players

## Getting started

### Tools

- [react] - UI framework
- [npm] - Package manager
- [vite] - Build tool
- [chakra] - Component library
- [react-router-dom] - Client-side routing
- [vitest] - Unit / component test runner
- [playwright] - End-to-end test runner

### Install

Install [Node.js](https://nodejs.org/) (v18+), then install dependencies:

```bash
npm install
```

### Run project

#### Dev

```bash
npm run dev
```

### Run tests

Unit and component tests:

```bash
npm test
```

End-to-end tests:

```bash
npm run test:e2e
```

[chakra]: https://chakra-ui.com/
[npm]: https://www.npmjs.com/
[playwright]: https://playwright.dev/
[react]: https://react.dev/
[react-router-dom]: https://reactrouter.com/
[spotify]: https://developer.spotify.com/documentation/web-api
[vite]: https://vitejs.dev/
[vitest]: https://vitest.dev/
