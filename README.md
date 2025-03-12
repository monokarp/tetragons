# tetragons
A test task for an interview

Server stores data in local filesystem with an attached volume

To run in containers:
`.env` in the workspace root is already checked-in for convenience
`docker compose up`

To run dev versions locally:
`npm i` to install dependencies
`npx nx serve server` - backend
`npx nx serve tetragons` - frontend
`npx nx e2e tetragons-e2e` - run e2e headless (requires both services to run)