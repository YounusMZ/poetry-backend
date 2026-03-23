# Poetry

Backend for [poetry-frontend](https://github.com/YounusMZ/poetry-frontend). Built for poets and poem enthusiasts, Poetry allows you to view random poems for the serendipity, search for poems and bookmark your favourites. Poetry provides a minimalist UI and allows migrating poems from a local JSON or CSV file. 

## Demo

- Live Site: https://poetry-backend-wv7w.onrender.com (Note: Render free-tier does not have persistent disk, so no changes are stored on sleep. It takes about a min to start up as well.)
- Run `docker pull ghcr.io/younusmz/poetry-backend:latest` to pull the docker image. Make a container and run. That's a quick way to spin it up.


## Description

## Features
* Migrate poems from CSV and JSON to local SQLITE database
* View random poems to find the ones you may have missed
* Search for poems by title
* Boomark your favourite poems
* Responsive UI - Use it on your phone!

## Tech Stack

**Frontend**
- React
- TypeScript
- React Bootstrap

**Backend**
- Node.js
- Express

**Database**
- SQLITE

**Deployment**
- Render

## How It Works

This is a full-stack web application with a React frontend that communicates with a REST API built with Express.

- The frontend handles UI and routing
- The backend exposes RESTful API endpoints
- Data is stored in the local SQLITE database

## Database Schema

- **poems**
  - id
  - title
  - poem
  - poet
  - tags
  - isBookmarked
  
## Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org)
*   [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com)
*   [Git](https://git-scm.com)
*  Or [Docker](https://docs.docker.com/desktop/setup/install/windows-install/) if you're running from the image
  
### Installation
To set up:
* clone the repository:
  `git clone https://github.com/YounusMZ/poetry-backend.git`
* move to the project directory: `cd poetry-backend`
* Install the dependencies: run `npm install` 

### Executing program
To run:
* Run `npx tsc` to transpile ts to js.
* Run `node server ".\fileName.json"` to start the server.
* "fileName.json" will be used as a source to migrate data to the database.
* If env.PORT is not set, default port 3000 will be used.
* The build files for poetry-frontend are provided with this repo. You do not need to clone the frontend unless you wish to work on it or run it separately.

 Or alternatively,
 * run `npm start`
 * looks for "PoetryData.csv" file in the root directory of the project.

### Import JSON\CSV Schema
{\
&emsp;"id" : string,\
&emsp;"Title" : string,\
&emsp;"Poem" : string,\
&emsp;"Poet" : string,\
&emsp;"Tags" : string | null,\
&emsp;isBookmarked : boolean \
}

### API Endpoints

- Poem
  - `GET api/poem/:id`
  - `GET api/bookmark/:id`
  - `PUT api/bookmark/:id`
  - `GET api/search?poem=poemName&page=pageNumber`
  - `GET api/random`
  - `GET api/favourites?page=pageNumber`
  - `GET api/poems?ids=poemids`

### What I've learned
  - Worked with react bootstrap and gained more confidence in working with bootstrap. Learned to employ responsive design with bootstrap. 
  - Released the docker image of the app on GHCR.

### Screenshots
- Screenshots: 
<img width="1920" height="1200" alt="Screenshot (36)" src="https://github.com/user-attachments/assets/3f986763-65fa-4e32-9503-107378c0a807" />
<img width="1920" height="1200" alt="Screenshot (37)" src="https://github.com/user-attachments/assets/89751b15-013f-4786-872d-a77d66eea79d" />
<img width="1920" height="1200" alt="Screenshot (38)" src="https://github.com/user-attachments/assets/ea720a90-fcc8-4974-a08a-8924f20b8b37" />

## License
  MIT

## Author
  * GitHub: https://github.com/YounusMZ
  * Linked: https://linkedin.com/in/younus-m-9bb64a255

The dataset used for the project can be found [here](https://www.kaggle.com/datasets/tgdivy/poetry-foundation-poems).

