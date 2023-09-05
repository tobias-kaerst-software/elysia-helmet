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

## 🔓 License

This software ist distributed under the MIT license. For more information you can have a look at the [license file](./LICENSE).
