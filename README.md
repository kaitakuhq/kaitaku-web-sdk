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
npm install kaitaku-web-sdk
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

        initMyThing(container, {
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

| Name | Type | Description |
|--|--|--|
| onError | Function | Called when error occurs.  | 
| project | String | project ID |
| token | String | Token for the account | 
| userId | String | Unique user id | 

## Contributing


### Develop


```

# clone this repository
git clone git@github.com:kaitakuhq/kaitaku-web-sdk.git

# Go into the project root
cd kaitaku-web-sdk

# Install (or npm install)
yarn 

# Start an example react app
yarn start

```

If you are updating CSS classnames (based on [Tailwind](https://tailwindcss.com/docs/installation)), you need to run this in parallel:

```
yarn watch:css:build
```

If changes are made to `src/style/generated.css`, you are responsible for committing that back to the repository along side any changes to the `className`s.

The build will be created from `src/lib` folder.

### Build

There are mainly 2 output targets:

1. browser - This creates a already compiled code which can run in a browser. Ideal for running with VanillaJS and jQuery.

2. module - This creates a library so that UI frameworks can import it before compiling. Ideal for running in React, Angular, Vue.js and many more.

```

# clone this repository
git clone git@github.com:kaitakuhq/kaitaku-web-sdk.git

# Go into the project root
cd kaitaku-web-sdk

# Install (or npm install)
yarn 

# Start an example react app
yarn start

```

