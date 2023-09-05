# Elysia Helmet

Helmet helps secure Elysia apps by setting HTTP response headers. This is a port of the official [helmet](https://github.com/helmetjs/helmet) plugin for express.

## Install

```
bun add elysia-helmet
```

## Getting Started

```typescript
import { Elysia } from 'elysia';
import { helmet } from 'elysia-helmet';

new Elysia().use(helmet()).listen(3000);
```
