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

-   `babel-jest`
    > Babel Core required to setup babel for jest
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
