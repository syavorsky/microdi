
# microdi

A micro helper for JavaScript DI.

```bash
> npm install microdi
```

Imagine the following snippet.

```js
import moduleA from './module-a'
import moduleB from './module-b'

const doSomething x => moduleA(x) + moduleB(x)

export default doSomething
```

for testing purposes it's handy to be able stubbing either of `moduleA` or `moduleB`. This can be achieved with a bit different definition

```js
import inject from 'microdi'

import moduleA from './module-a'
import moduleB from './module-b'

// define module referring local vars
const doSomething = inject(({moduleA, moduleB}) => (
  // still same function
  x => moduleA(x) + moduleB(x)
// default dependencies wiring
))({moduleA, moduleB})

export default doSomething

```

and any dependencies can be injected as

```js
import doSomething from './do-something'

const doSomething1 = doSomething.inject({
  moduleA: function anotherModuleA (x) { }
})

// produced function is identical to original
// so you can even do following
const doSomething2 = doSomething1.inject({
  moduleB: function anotherModuleB (x) { }
})
```
