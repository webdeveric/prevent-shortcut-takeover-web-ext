# Prevent Shortcut Takeover

Stop sites from taking over your browser's keyboard shortcuts.

Currently prevents sites from taking over ctrl+k / cmd+k.

## Local development

1. `npm ci`
1. `npm run dev`
1. `npm start` (different terminal)

### Building the web extension

```shell
npm run build
```

The `zip` output will be in the `./build` folder.

## Extension signing for Firefox

Define your api key / secret in your environment then run the following.

Credentials can be found at https://addons.mozilla.org/en-US/developers/addon/api/key/

This generates an `xpi` file and it will be put in `./build`.

```shell
npm run sign -- --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET
```

### Signing a listed plugin

```shell
npm run sign -- --channel=listed --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET
```

## Useful links

- https://hacks.mozilla.org/2019/10/developing-cross-browser-extensions-with-web-ext-3-2-0/
- https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/
