# [lipu sinpin](https://lipu-sinpin.fly.dev): (sort of) a facebook clone
[![Website](https://img.shields.io/website?url=https%3A%2F%2Flipu-sinpin.fly.dev%2F)](https://lipu-sinpin.fly.dev)
[![GitHub issues](https://img.shields.io/github/issues/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin/pulls)
[![Website visits](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.pageServes&label=total%20website%20visits)](https://lipu-sinpin.fly.dev)
[![Users](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.users&label=users)](https://lipu-sinpin.fly.dev/users)

(the above badges take a few minutes to update. try reloading the page. I wish i could fix this.)

lipu sinpin!! lipu sinpin is a WIP, under development, full stack facebook clone. all sorts of cool features are in the pipeline, so stay tuned!

try out [lipu sinpin](https://lipu-sinpin.fly.dev) now! go ahead, do it! do it~~

> [!NOTE]
> *lipu sinpin is currently hosted on a small, free-tier compute isntance. please do not spam or ddos it. it is mostly for demonstration. since ruby on rails doesn't allow for distributed hosting afaik, i am forced to use a monolithic backend. if the website goes down, please open an issue. thank you.*

## why is it called lipu sinpin?
someone made up a language called [toki pona](https://en.wikipedia.org/wiki/Toki_Pona), and lipu sinpin is one way to say "facebook" in that language. it's very cool! i can't use the language at all, but it's very cool!

## why is it a thing?
for fun and learning!

## how is it a thing?
lipu sinpin is a full stack single page application. it is built with [ruby on rails](https://rubyonrails.org/) on the backend, and it uses [react](https://react.dev/) with [redux](https://redux.js.org) on the frontend. it's written in [typescript](https://www.typescriptlang.org/), styled with [tailwind](https://tailwindcss.com/), and it uses [react-router](https://reactrouter.com/en/main) for client-side routing. i've currently got it hosted for free using [fly.io](https://fly.io/).

check out the [wiki](https://github.com/KooShnoo/lipu-sinpin/wiki) for more info

## quick start
### prerequisites
make sure you have [ruby](https://www.ruby-lang.org/) and [node](https://github.com/nvm-sh/) installed.
### instructions

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

now, you can navigate to [localhost:3000](http://localhost:3000) and enjoy lipu sinpin! :D

if it complains about config/storage.yml, you will have to setup aws s3. once you've done so, run
```console
$ ./bin/rails credentials:edit
```
if that doesn't open a code editor, you need to configure your `EDITOR` environment variable. google is your friend.

in the code editor that rails opens for you, enter your credentials following this example:
```yml
aws:
  access_key_id: "ABCDEFGHIJK123456789" # from aws
  secret_access_key: "Ab1cdefGhIJK23lmNOp+4Qrr8SDVusFtUvwxy9/z" # also from aws
  region: "us-west-1"
  dev:
    bucket: "my-cool-bucket-dev"
  prod:
    bucket: "my-cool-bucket-prod"


# rails generates the rest of this for you, you can leave it as is.

# Used as the base secret for all MessageVerifiers in Rails, including the one protecting cookies.
secret_key_base: 9q34hf83q7h458q37rh38q47fh3587 

```

## questions?
open an issue!

## contributions
sure, just open a merge request/PR, then watch as i ignore it 😆