# Prevent Shortcut Takeover

Stop sites from taking over your keyboard shortcuts.

Defaults to preventing sites from taking over ctrl+k and ctrl+l (cmd on Mac).

You can add your own shortcuts in the extension options.

## Install

You can get this addon at https://addons.mozilla.org/en-US/firefox/addon/prevent-shortcut-takeover/

## Local development

1. `corepack enable`
1. `pnpm install`
1. `pnpm start`

### Building the web extension

```shell
pnpm build
```

The `zip` output will be in the `./build` folder.

## Extension signing for Firefox

Define your api key / secret in your environment then run the following.

Credentials can be found at https://addons.mozilla.org/en-US/developers/addon/api/key/

This generates an `xpi` file and it will be put in `./build`.

```shell
pnpm sign --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET
```

### Signing a listed plugin

```shell
pnpm sign --channel=listed --api-key=$WEB_EXT_API_KEY --api-secret=$WEB_EXT_API_SECRET
```

## Useful links

- https://hacks.mozilla.org/2019/10/developing-cross-browser-extensions-with-web-ext-3-2-0/
- https://extensionworkshop.com/documentation/develop/getting-started-with-web-ext/
