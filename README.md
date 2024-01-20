# [lipu sinpin](https://lipu-sinpin.fly.dev): (sort of) a facebook clone
[![Website](https://img.shields.io/website?url=https%3A%2F%2Flipu-sinpin.fly.dev%2F)](https://lipu-sinpin.fly.dev)
[![GitHub issues](https://img.shields.io/github/issues/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin/pulls)
[![Website visits](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.pageServes&label=total%20website%20visits)](https://lipu-sinpin.fly.dev)
[![Users](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.users&label=users)](https://lipu-sinpin.fly.dev/users)

(the above badges take a few minutes to update)

lipu sinpin!! lipu sinpin is a WIP, under development, full stack facebook clone. all sorts of cool features are in the pipeline, so stay tuned!

try out [lipu sinpin](https://lipu-sinpin.fly.dev) now! go ahead, do it! do it~~

## why is it called lipu sinpin?
someone made up a language called [toki pona](https://en.wikipedia.org/wiki/Toki_Pona), and lipu sinpin is one way to say "facebook" in that language. it's very cool! i can't use the language at all, but it's very cool!

## why is it a thing?
for fun and learning! note that it is hosted on a small, unpaid server, so it cannot scale.

## how is it a thing?
lipu sinpin is a full stack single page application built with [ruby on rails](https://rubyonrails.org/) on the backend, and [react](https://react.dev/) with [redux](https://redux.js.org) on the frontend. it's written in [typescript](https://www.typescriptlang.org/), styled with [tailwind](https://tailwindcss.com/), and it uses [react-router](https://reactrouter.com/en/main) for client-side routing. i've currently got it hosted for free using [fly.io](https://fly.io/).

## Quick start
first, you must bundle the frontend.
```console
$ cd frontend
$ npm install
$ npm run build
```
then, you must setup the backend and start the server.
```console
$ cd ../backend
$ bundle install
$ ./bin/rails db:setup
$ ./bin/rails server
```

## Questions?
open an issue!

## Contributions
sure, just open a merge request/PR, then watch as i ignore it 😆