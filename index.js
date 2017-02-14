
export default define => function inject (di = {}) {
  const func = define(di)
  func.inject = overrides => inject({...di, ...overrides})
  return func
}
