# decorator-bug

This repo is a minimal reproducible example of an issue with `@babel/plugin-proposal-decorators`. It showcases that the async keyword will be stripped of a class' method if the class has a decorator. The erroneous behavior is not reproduced while the plugin is active if the class is not decorated.

## How to test

You'll need Git, Node.js and NPM. Clone this repository.

```bash
npm ci
npm run no-problem
npm run problem
```

Inspect the files in the newly created `./out` directory.

## Text version of the issue

```javascript
function Decorator ({ property } = {}) {
  return function ClassDecorator (classDescriptor) {
    console.log(property)
    return classDescriptor
  }
}

@Decorator({
  property: true
})
class GenericClass {
  async method () {
    await Promise.resolve()

    return true
  }
}
```

This code will then become (when stripped of babel internal functions):

```javascript
function Decorator({
  property
} = {}) {
  return function ClassDecorator(classDescriptor) {
    console.log(property);
    return classDescriptor;
  };
}

let GenericClass = _decorate([Decorator({
  property: true
})], function (_initialize) {
  class GenericClass {
    constructor() {
      _initialize(this);
    }

  }

  return {
    F: GenericClass,
    d: [{
      kind: "method",
      key: "method",

      value() {
        await Promise.resolve();
        return true;
      }

    }]
  };
});
```

Note the lack of an async keyword on the `value` function. This causes browser or linters to correctly point out the syntax error.

## Technical information

Versions:

* Babel and plugins: v7.1.0
* Node.js: v10.10.0
* NPM: 6.4.0

Tests were run on Windows 10 Enterprise 1709 Build 16299.522
