# Elysia Helmet

Helmet helps secure Elysia apps by setting HTTP response headers. This is a port of the official [helmet](https://github.com/helmetjs/helmet) plugin for express.

## 🧑‍💻 Install

```
bun add elysia-helmet
```

## 👋 Getting Started

Here's a sample Elysia app that uses Helmet:

```typescript
import { Elysia } from 'elysia';
import { helmet } from 'elysia-helmet';

new Elysia().use(helmet()).listen(3000);
```

For more configuration options, please refer to the original [helmet documentation](https://github.com/helmetjs/helmet).

> There seems to be a bug in the current version of Elysia that prevents the headers from being set correctly. As a workaround, you can use the aot flag must be set to false.
>
> ```typescript
> new Elysia({ aot: false }).use(helmet()).listen(3000);
> ```
>
> Refer to this [Issue](https://github.com/elysiajs/elysia/issues/625).

## 🔓 License

This software ist distributed under the MIT license. For more information you can have a look at the [license file](./LICENSE).
