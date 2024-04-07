import { toAst } from './parse'

describe('toAst', () => {
  const examples = [{ name: 'empty mapping', mapping: {}, ast: {} }]
  it.each(examples)('mapping:$name', ({ mapping, ast }) => {
    expect(toAst(mapping)).toStrictEqual(ast)
  })
})
