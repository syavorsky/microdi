
import test from 'ava'
import inject from './'

test.beforeEach(t => {
  const double = x => x * 2
  const triple = x => x * 3

  t.context.func = inject(({double, triple}) => (

    x => double(x) + triple(x)

  ))({double, triple})
})

test('Works with default dependencies', t => {
  const {func} = t.context
  t.is(func(1), 5)
})

test('Allows injection', t => {
  const {func} = t.context
  const func2 = func.inject({
    double: x => x,
    triple: x => x
  })
  t.is(func2(1), 2)
})

test('Allows partial injection', t => {
  const {func} = t.context
  const func2 = func.inject({
    double: x => x
  })

  t.is(func2(1), 4)
})

test('Works with no overrides passed', t => {
  const {func} = t.context
  const func2 = func.inject()

  t.is(func2(1), 5)
})

test('keeps independent instances', t => {
  const {func} = t.context
  const func2 = func.inject({
    double: x => x,
    triple: x => x
  })
  const func3 = func.inject({
    double: x => x * 3,
    triple: x => x * 4
  })

  t.is(func(1), 5)
  t.is(func2(1), 2)
  t.is(func3(1), 7)
  t.is(func(1), 5)
})

test('produces identical instances', t => {
  const {func} = t.context
  const func2 = func.inject({
    double: x => x,
    triple: x => x
  })
  // note func2.inject
  const func3 = func2.inject({
    double: x => x * 3,
    triple: x => x * 4
  })

  t.is(func(1), 5)
  t.is(func2(1), 2)
  t.is(func3(1), 7)
  t.is(func(1), 5)
})
