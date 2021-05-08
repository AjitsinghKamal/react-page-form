## Development

The project uses `vite` for development which is an `esm` based tooling system.

To setup;

```
> clone repo

> yarn OR npm i

> yarn dev OR npm run dev
```

Project will be up and running on `localhost`

## Testing

Tests are setup with `jest` and `testing-library`. Since the project is written with TypeScript, `ts-jest` is used to setup tests along with `jest`. Instead of major release version for both `jest` and `ts-jest`, the `next:release` version is used to support es modules while testing.

To run tests;

```
> yarn test OR

> yarn test:watch
```

## Storybook

All components are built around a very simple design language and includes a story for easily viewing them on a storybook.

To run storybook;

```
> yarn storybook
```

## Structure

```
├── src
│   ├── app
│   │    ├── apis
│   │    ├── components
│	│	 ├── features
│	│	 ├── hooks
│	│	 ├── layouts
│	│	 ├── pages
│	│	 ├── utilities
│	│    └── index.tsx
│   ├── assets
│   │     ├── illustrations
│   │     └── svgs
│   ├── styles
│   │     └── **/*.scss
│   └── types
│        └── **/*.d.ts
│
├── dist (or build)
├── node_modules
├── __mocks__
├── .storybook
├── index.html
├── .env
├── vite.config.ts
├── jest.config.js
├── README.md
├── package.json
├── tsconfig.json
└── .gitignore
```

### Dependencies

**App**

-   `react`,
-   `react-dom`,
-   `typescript`,
-   `vite`,
-   `sass`,
-   `react-helmet`,
-   `classnames`

<br />

**Testing**

> TS compiler for JEST

-   `ts-jest`

<br />

> Required to deal with ESM in jest test

-   `@babel/core`
-   `@babel/preset-env`

<br />

> Required to handle import.meta.env

-   `babel-preset-vite`

<br />

> Safely ignores css modules from our test and prevents style to break our tests.

-   `identity-obj-proxy`

<br />

> Integration testing library

-   `@testing-library/react`
-   `@testing-library/jest-dom`

<br />

**Storybook**

> Default storybook deps

-   `@storybook/addon-actions`,
-   `@storybook/addon-essentials`,
-   `@storybook/addon-links`,
-   `@storybook/preset-scss`,
-   `@storybook/react`,

<br />

> Handles Sass preprocessing. Required only for storybook since we are bundling our app with Vite which doesn't rely on loaders. Storybook on the other hand uses webpack internally.

-   `sass-loader`
-   `css-loader`
-   `style-loader`

<br/>

**Tooling**

> Prettier for eslint

-   `eslint-config-prettier`

<br/>

> Enable fast refresh for Vite

-   `@vitejs/plugin-react-refresh`
