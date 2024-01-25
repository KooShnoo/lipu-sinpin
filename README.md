[![lipu sinpin](./frontend/public/lipu-sinpin.svg)](https://lipu-sinpin.fly.dev)


# [lipu sinpin](https://lipu-sinpin.fly.dev): a fakebook (clone of facebook)

[![Code Size](https://img.shields.io/github/languages/code-size/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin)
[![LoC](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.codetabs.com%2Fv1%2Floc%2F%3Fgithub%3DKooShnoo%2Flipu-sinpin&query=%24%5B%3F(%40.language%3D%3D%22Total%22)%5D.linesOfCode&label=lines%20of%20code)](https://github.com/KooShnoo/lipu-sinpin)

[![License](https://img.shields.io/github/license/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/KooShnoo/lipu-sinpin)](https://github.com/KooShnoo/lipu-sinpin/pulls)

[![Website](https://img.shields.io/website?url=https%3A%2F%2Flipu-sinpin.fly.dev%2F)](https://lipu-sinpin.fly.dev)
[![Website visits](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.pageServes&label=total%20website%20visits)](https://lipu-sinpin.fly.dev)
[![Users](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.users&label=total%20registered%20users)](https://lipu-sinpin.fly.dev/users)

[![React](https://img.shields.io/github/package-json/dependency-version/KooShnoo/lipu-sinpin/react?filename=frontend%2Fpackage.json)](https://react.dev/)
[![Redux](https://img.shields.io/github/package-json/dependency-version/KooShnoo/lipu-sinpin/@reduxjs/toolkit?filename=frontend%2Fpackage.json)](https://redux.js.org)
[![React Router](https://img.shields.io/github/package-json/dependency-version/KooShnoo/lipu-sinpin/react-router-dom?filename=frontend%2Fpackage.json)](https://reactrouter.com/en/main)

lipu sinpin!! lipu sinpin is a full stack fakebook (clone of facebook). all sorts of cool features are in the pipeline, so stay tuned!

try out [lipu sinpin](https://lipu-sinpin.fly.dev) now! go ahead, do it! do it~~

> [!NOTE]
> *lipu sinpin is currently hosted on a small free compute instance. please do not spam or ddos it. if the website goes down, please open an issue. thank you.*

## features
users can do many but not all of the things they expect on a social media site. 

### post!
write amazing posts to keep the lipu sinpin userbase informed of all the great wisdom you have to share. include an image with your post to add a visual component. edit or delete posts that didn't quite meet your standards.

### share!
if you like a post, click the like button to share your appreciation for that post with the lipu sinpin community. [![size of lipu sinpin community](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.users&label=current%20size%20of%20lipu%20sinpin%20community%3A)](https://lipu-sinpin.fly.dev/users) share the link to your post with users on other social media platforms so they can see how amazing lipu sinpin is!

### be yourself!
cuztomize your profile page to help you stand out on lipu sinpin. add a bio to let the world [![size of lipu sinpin world](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Flipu-sinpin.fly.dev%2Fapi%2Fanalytics&query=%24.users&label=current%20size%20of%20lipu%20sinpin%20world%3A)](https://lipu-sinpin.fly.dev/users) see who you are, and add a status to let the world what you're up to. set your profile picture and cover photo to give your profile a splash of color and some extra personality.

### wait!
discover how limited the functionality of lipu sinpin is by using it for more than a few minutes, and then wait for me to add more features.

## why is it called lipu sinpin?
someone made up a language called [toki pona](https://en.wikipedia.org/wiki/Toki_Pona), and lipu sinpin is one way to say "facebook" in that language. it's very cool! i can't use the language at all, but it's very cool!

## why is it a thing?
for fun and learning!

## how is it a thing?
lipu sinpin is a full stack single page application. it is built with a monolithic [ruby on rails](https://rubyonrails.org/) backend, and it uses [react](https://react.dev/) with [redux](https://redux.js.org) on the frontend. it's written in [typescript](https://www.typescriptlang.org/), styled with [tailwind](https://tailwindcss.com/), and it uses [react-router](https://reactrouter.com/en/main) for client-side routing. photos are stored in an [aws s3 bucket](https://aws.amazon.com/s3/), and i've currently got it hosted for free using [fly.io](https://fly.io/).

check out the [wiki](https://github.com/KooShnoo/lipu-sinpin/wiki) for more info!

## self-hosting
lipu sinpin is 100% open source, so you can host an instance yourself.
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

if it complains about `config/storage.yml`, you will have to setup aws s3. once you've done so, run
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