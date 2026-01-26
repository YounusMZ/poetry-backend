# Poetry

## Description

Backend for [poetry-backend](https://github.com/YounusMZ/poetry-frontend). It exposes APIs to search for poems and to get random poems for the serendipity.

## Features
* Import poem sets from csv and json.
* Retrive random poems.
* Search for poems with keywords.
* Made with Node.js and Express.js.

## Getting Started

### Uses
* Node.js
* Express.js
* Written in Typescript

### Installing
To set up:
* run `npm init`
* run `npm install express papaparse cors`

### Executing program
To run:
* run `npx tsc` to build the js files after you've made changes.
* run `node server ".\fileName.json"` to start the server. Default port is 3000.

### Import JSON Schema
{\
&emsp;"index" : string,\
&emsp;"Title" : string,\
&emsp;"Poem"  : string,\
&emsp;"Poet"  : string,\
&emsp;"Tags"  : string | null,\
}

The dataset used for the project can be found [here](https://www.kaggle.com/datasets/tgdivy/poetry-foundation-poems).



