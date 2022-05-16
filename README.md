# Kaitaku Web SDK

[![CircleCI](https://circleci.com/gh/kaitakuhq/kaitaku-web-sdk/tree/main.svg?style=svg&circle-token=f9dcf93ba15bc1cb98e17345e39a9fbcce2c3f10)](https://circleci.com/gh/kaitakuhq/kaitaku-web-sdk/tree/main)

[![codecov](https://codecov.io/gh/kaitakuhq/kaitaku-web-sdk/branch/main/graph/badge.svg?token=90U0CUACM1)](https://codecov.io/gh/kaitakuhq/kaitaku-web-sdk)

## Install

## Getting Started

You can integrate this into your application as a module or a global varibale.

<!-- ## Examples -->

<!-- ### Use in ReactJS -->


### Install as a module in UI framework

To implement this as a module, run:

```sh
npm install @kaitaku/kaitaku-web-sdk 
```

### Setup a container

The SDK will render in a HTML element. This container must have a specified height and width to show the elements properly. We recommend a minimum height of 400px and minimum width of 400px.

<details>
 <summary>VanillaJS</summary>

```
<!doctype html>
<html>

<head>
    <script type="text/javascript" src="./../build/browser/main.js"></script>

    <title>Vanilla JS Example</title>
    <style>
        #feedback-container {
            position: absolute;
            top: 50px;
            left: 50px;
            height: 400px;
            width: 400px;
        }
    </style>
</head>

<body>
    <div id="feedback-container"></div>
    <button id="app-button" type="button">Show Feedback </button>
</body>

<script>
    const container = document.getElementById('feedback-container')
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWmdOS0NBalVIbERoak85bms1bW4iLCJjcmVhdGVkX2F0IjoiMjAyMi0wNC0xN1QxODo1MTo1Ni41OTI2OCswOTowMCJ9.lL2kmWdoAhCfZOe1r7yl-7k4n-5EVdcwj6QhuB-tEek'
    const projectId = 'mVhuSeRl9UXjJevV0sTy'
    const user1 = 'user1'

    document.getElementById('app-button').onclick = function () {
        //click me function!
        console.log("app-button clicked")

        new Kaitaku(container, {
            onError: (err) => {
                console.error(err)
            },
            projectId: projectId,
            token: token,
            userId: user1,
        })
    }
</script>

</html>
```

</details>
<!-- ### Load this SDK as a global variable on a browser -->


<!-- ## Multiple Frameworks -->

<!-- Run in React // TODO -->

<!-- Run in Angular // TODO -->

## API Options

| Name | Required | Type | Description | Default Value |
|--|--|--|--|--|
| onError | Yes | Function | Called when error occurs.  |  |
| project | Yes | String | project ID | |
| token | Yes | String | Token for the account |  |
| userId | Yes | String | Unique user id | |
| showFeedbackButton | No | Boolean | Whether to show the default feedback button | true |
| showFeedbackUI | No | Boolean | Whether to show the default feedback UI | false |

## Contributing


### Develop


To run this library and make it viewable, it must integrate into an example application.

```
# 1. clone this repository
git clone git@github.com:kaitakuhq/kaitaku-web-sdk.git

# 2. Go into the project root
cd kaitaku-web-sdk

# 3. Install dependencies
yarn

# 4. To watch and generate CSS builds (if updating Tailwind CSS classes)
yarn run css:build:watch

# 5. To watch and generate a UMD build
yarn run build:watch

# 6a. To watch and serve the UMD build to the application
./node_modules/.bin/serve dist

# alternatively,
yarn add global serve
serve dist

# 7a. To run an example app in ReactJS
cd example/reactjs
yarn
yarn start

# 7b. To run an example app in Vanilla JS
cd example/vanillajs
open index.html

```

When Tailwind CSS is generated, it creates `src/style/generated.css`, which is required to be committed to this repository along with the appropriate changed files.

The build will be created from `src/lib` folder.

### Build

Running `yarn build` generates a UMD file and typings in the `dist` folder.

### Deploy

This will be deployed as a NPM package when a tag is created, and not when merged to main. Please view the Circle CI configuration under `publish` job for details.
