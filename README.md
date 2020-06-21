
This web applications is about indexing Dessert modules and displaying some
static contents (Who Are We, FAQ...).


## Dependencies

Here are the versions this project is developed on:

```
$ node --version
v10.16.3

$ npm -g --version
6.11.3
```

While you are at the root of the repository, install the dependencies with:

```
$ npm i --only=prod
```

*Note: drop the `--only` parameter to also get the dependencies needed for
development.*


## Configuration variables

No matter what method you choose to deploy the project, you will have to
provide a few configuration variables. The variables are:

* `DESSERT_GRAPHQL_URL` is the GraphQL endpoint
* `DESSERT_GHOST_URL` is the Ghost instance URL, **withouth the trailing slash**
* `DESSERT_GHOST_KEY` is the Ghost
  [custom integration](https://ghost.org/integrations/custom-integrations/)
  **content** key

The values of these variables are **read from the environment**. These values
are need both at buildtime, and at runtime.


## Deploy remotely

Everything is managed by [Vercel](https://vercel.com/lucas-santoni/dessert), you have
nothing to do. Please, open an issue if you have any issue.

The `master` branch corresponds to production and is automatically deployed,
then aliased, to [dessert.dev](https://dessert.dev/).

Pull requests against `develop` are assigned unique URLs. Such domains
are then aliased to [develop.dessert.dev](https://develop.dessert.dev/).


## Deploy locally

While coding:

```
npm run dev
```

In that case, you are reponsible for populating the environment with needed
values.

You can also do a local serverless deployment:

```
npx now dev
```

In the case, builtime environment variables are read from `.env.build`, whereas
runtime ones are read from `.env`. These two file are not commited for security
reasons so you would need to create theme manually.


## Overview

This front is based on [Next.js](https://nextjs.org/) so it is a
[React](https://fr.reactjs.org/) application. The code is typed thanks to
[Typescript](https://www.typescriptlang.org/).

The whole point is to query a [GraphQL](https://graphql.org/) endpoint
via [Apollo](https://www.apollographql.com/) and render a user interface
out of the retrieved data.

There is no UI framework used. However, we are using the
[BassCSS](https://basscss.com/) CSS toolkit.
