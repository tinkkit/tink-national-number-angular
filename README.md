# Tink national number Angular directive

v1.0.2

## What is this repository for?

The Tink Angular national number directive provides you with an input field preformatted for Belgian national numbers.

Tink is an in-house developed easy-to-use front-end framework for quick prototyping and simple deployment of all kinds of websites and apps, keeping a uniform and consistent look and feel.

## Setup

### Prerequisites

* nodeJS [http://nodejs.org/download/](http://nodejs.org/download/)
* bower: `npm install -g bower`

### Install

1. Go to the root of your project and type the following command in your terminal:

   `bower install tink-national-number-angular --save`

2. Add the following files to your project:

   `<link rel="stylesheet" href="bower_components/tink-core/dist/tink.css" />` (or one of the Tink themes)

   `<script src="bower_components/tink-national-number-angular/dist/tink-national-number-angular.js"></script>`

   `<script src="bower_components/tink-helper-format-angular/dist/tink-helper-format-angular.js"></script>`

   `<script src="bower_components/tink-helper-safe-apply-angular/dist/tink-helper-safe-apply-angular.js"></script>`

3. Add `tink.nationalnumber` to your app module's dependency.

   `angular.module('myApp', ['tink.nationalnumber']);`



----------



## How to use

### tink-national-number

```html
<tink-national-number required="required" name="nationalNoField" data-ng-model="nationalNoModel"></tink-national-number>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-ng-model (required) | `[object]` | `[]` | This variable holds the preformatted text.

### Example

A working example can be found in [the Tink documentation](http://tink.digipolis.be/#/docs/directives/national-number#example).

## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)
