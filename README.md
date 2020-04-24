<img src="https://github.com/alowa-apps/kwizz/blob/master/public/nerd.png" width="100">

## Kwizz.guru

#### Become thé Kwizz Guru amongst colleagues, friends and family.

We have build a serverless kwizz which is hosted on www.kwizz.guru Everyone can use this app for free to build online quizes to play with colleagues, friends and family. Our goal is to deliver fun for free.

## Alowa Apps

Alowa Apps is a small company who deliver (web)apps with a clear purpose, great usability and awesome technology. We focus on e-health but we don't stay away from a little sidesteps like our online quiz tool (kwizz.guru) or a starter for apps built on AWS amplify & expo. We are big believers of the open source community and try to make contributions to that where ever we can.

## Open source

We would like to open source this app so everyone can contribute. It would be great to improve UX, the quality of code, add automated tests and add new features.

## Technology

This app is completely build in javascript with https://reactjs.org/ for the Front End and [AWS Amplify](https://docs.amplify.aws/) for the Back End. We are using [AWS Amplify datastore](https://docs.amplify.aws/lib/datastore/getting-started/q/platform/js) to sync data between clients and AWS.

## Known issues

- All the data is downloaded locally. AWS Amplify is not supporting multitenant yet:
  https://github.com/aws-amplify/amplify-js/issues/5119

- We see some performance issues only on the first init of the site on Safari. This also is related to the first issue:
  https://github.com/aws-amplify/amplify-js/issues/5434

## Getting Started

```
* Clone the app
* Set up an AWS account
```

### Set up AWS Amplify

AWS Amplify CLI needs to be installed. The Amplify CLI is a command line tool that allows you to create & deploy various AWS services.

To install the CLI, we'll run the following command:

```
$ npm install -g @aws-amplify/cli

```

Next, configure the CLI with a user from the AWS account:

```
$ amplify configure

```

> For a video walkthrough of the process of configuring the CLI, [click](https://www.youtube.com/watch?v=fWbM5DLh25U)

Now we can initialise a new Amplify project:

```
$ amplify init
```

Here we'll be guided through a series of steps:

- Enter a name for the project: **<YOUR NAME>** (or your preferred project name)
- Enter a name for the environment: **dev** (use this name, because we will reference to it)
- Choose your default editor: **Visual Studio Code** (or your text editor)
- Choose the type of app that you're building: **javascript**
- What javascript framework are you using: **react**
- Source Directory Path: **src**
- Distribution Directory Path: **build**
- Build Command: **npm run-script build**
- Start Command: **npm run-script start**
- Do you want to use an AWS profile? **Y**
- Please choose the profile you want to use: **YOUR_USER_PROFILE**

Now, our Amplify project has been created & we can move on to the next steps.

### Push your backend

`amplify push`

### yarn start

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
