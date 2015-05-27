# Tink national number Angular directive

v1.0.0

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


----------


## How to use

### tink-national-number

### Component

```html
<tink-national-number required="required" name="nationalNoField" data-ng-model="nationalNoModel"></tink-national-number>
```

###Example

###### Possible validation code: ######

```html
<div class="container" data-ng-controller="nationalNoCtrl">
  <form name="nationalNoForm" novalidate="">
    <div class="row form-group" data-ng-class="{'has-error':(nationalNoForm.nationalNoField.$dirty || nationalNoForm.submitted) && nationalNoForm.nationalNoField.$invalid,'has-success': (nationalNoForm.nationalNoField.$dirty || nationalNoForm.submitted) && nationalNoForm.nationalNoField.$valid}">
      <div class="col-xs-12">
        <label for="tink-username-example">National number</label>
      </div>
      <div class="col-xs-12 col-sm-6">
        <div class="validation">
          <tink-national-number required="required" name="nationalNoField" data-ng-model="nationalNoModel"></tink-national-number>
        </div>
      </div>
      <div class="col-xs-12 col-sm-4 col-sm-offset-2">
        <div class="messages" data-ng-messages="nationalNoForm.nationalNoField.$error" data-ng-if="(nationalNoForm.nationalNoField.$dirty || nationalNoForm.submitted)">
          <div class="text-danger" data-ng-message="required">Fill in your national number.</div>
          <div class="text-danger" data-ng-message="format">Fill in a valid national number.</div>
        </div>
      </div>
    </div>
    <div class="row form-group">
      <div class="col-xs-12">
        <button data-ng-click="validateNationalNo()" type="button" class="btn-primary">Validate</button>
      </div>
    </div>
  </form>
</div>
```

### Options

Attr | Type | Default | Details
--- | --- | --- | ---
data-ng-model (required) | `[object]` | `[]` | This variable holds the preformatted text.

## Contribution guidelines

* If you're not sure, drop us a note
* Fork this repo
* Do your thing
* Create a pull request

## Who do I talk to?

* Jasper Van Proeyen - jasper.vanproeyen@digipolis.be - Lead front-end
* Tom Wuyts - tom.wuyts@digipolis.be - Lead UX
* [The hand](https://www.youtube.com/watch?v=_O-QqC9yM28)

## License

The MIT License (MIT)

Copyright (c) 2014 Stad Antwerpen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
