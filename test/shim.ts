import type {
  AsyncFunc,
  Func,
  Test,
  TestFunction,
  MochaGlobals,
} from 'mocha'

const shim = async () => {
  try {
    return (await import('node:test')).default
  } catch {
    return Mocha as unknown as MochaGlobals
  }
}

const unpackage = async () => {
  const {
    suite,
    test,
    beforeEach,
    afterEach,
  } = await shim()

  return {
    suite,
    test: test as (
      typeof test extends TestFunction
        ? (title: string, fn?: Func | AsyncFunc) => Test
        : Exclude<typeof test, TestFunction>
    ),
    beforeEach,
    afterEach,
  }
}

const result = await unpackage()

const {
  suite,
  test,
  beforeEach,
  afterEach,
} = result

export default result

export {
  suite,
  test,
  beforeEach,
  afterEach,
}
