# Speech To Text Application

Speech Command Recognition - Classify audio to detect sounds and trigger an action in your web app

## Steps for Running project

Execute `npm i` to install dependencies.
Run `npm start` to execute the project.

## Configuring Angular Project for Tensorflow.js

To run tensorflow speech model following dependencies were required

`npm i @tensorflow-models/speech-commands @tensorflow/tfjs util fs process`

`Updates in package.json`

```json
 "browser": {
    "fs": false,
    "crypto": false
  }
```

`Updates in tsconfig.json`

```json
   "skipDefaultLibCheck": true,
    "skipLibCheck": true,
    "paths": {
      "util": ["./node_modules/util"],
      "fs": ["./node_modules/fs"],
      "process": ["./node_modules/process"]
    }
    ...
    "files": ["src/polyfills.ts"],
    "angularCompilerOptions": {
    ...
    "types": ["node"]
  }
```

`Updates in angular.json`

```json

    "build": {
            ...
            "polyfills": [
              "zone.js",
              "src/polyfills.ts"
            ],
    }
    ...
    "test": {
        ...
        "options": {
        "polyfills": [
            "zone.js",
            "zone.js/testing",
            "src/polyfills.ts"
        ],
        }
```

`Console logging the below message was required in the component to make sure the audio model got loaded properly`

```
console.log(tf.engine().backend);
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## References

[Tensorflow JS](https://www.tensorflow.org)

[Tensorflow Audio Model for speech command recognition](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands)
