# Voting Dojo

React App that lets users vote on polls.

## Deploy

Environment Variables should be kept in `.env` at root

```
DB_LINK = # mongodb link
PORT = # port for api should match with NGINX
NODE_ENV = # develop or production

```

```
npm i
```

Post install script takes care of React dependencies and `react build`

## Develop

Start the api on PORT and React on port 3000.

```
npm run dev
```
