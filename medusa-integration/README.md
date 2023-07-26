# medusa-integration
Leverages [Medusa](https://www.medusa.codes/), a third-party solution for increasing visibility of micro frontend architectures and orchestrating them.

## Medusa Integration

1) Login to [Medusa](https://medusa.codes/)
2) Create an application and generate a `Read` token and also a `Read/Write` token
3) Copy `env-example.js` and name it simply `env.js`
4) Update with your token values
5) Run all the applications (see section below)
6) Visit your application in Medusa and see MFEs that are have registered


## Running Applications
This project contains 5 applications:

- `home` - The root application host which serves as the main entry point
- `mfe-navigation` - The shared header and footer (port 3002)
- `mfe-image-viewer` - Showcases an image and provides a set of actions to interact with it
- `mfe-image` - Displays an image when given a url
- `mfe-image-recommender` - Recommends other images that are similar

Each app lives in its own directory.
To run the `home` app you must also run each of the MFEs.

```shell
$ cd /<app_dir>
$ yarn install
$ yarn start
```

Or you can build each for production and serve the files:

```shell
$ cd /<app_dir>
$ yarn install
$ yarn build
$ yarn serve 
```

Once started, you can visit the composed `home` app or any of the individual MFEs by using their url:

- `home`: http://localhost:3001
- `mfe-navigation`: http://localhost:3002
- `mfe-image-viewer`: http://localhost:3003
- `mfe-image` - http://localhost:3004
- `mfe-image-recommender` - http://localhost:3005