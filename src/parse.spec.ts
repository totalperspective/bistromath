import { ASTNode } from '../types/ast'
import { Mapping } from '../types/dsl'
import { b } from './ast'
import { toAst } from './parse'

interface Example {
  name: string
  mapping: Mapping<object, object>
  ast: ASTNode<object, object>
}
const examples: Example[] = [
  { name: 'empty mapping', mapping: {}, ast: b('Rename', { mappings: {} }) },
  { name: 'direct mapping *', mapping: '*', ast: b('DirectCopy', { path: '*' }) },
  { name: 'direct mapping dotted', mapping: 'a.b.c', ast: b('DirectCopy', { path: 'a.b.c' }) },
  {
    name: 'rename mapping *',
    mapping: { name: '*' },
    ast: b('Rename', { mappings: { name: b('DirectCopy', { path: '*' }) } }),
  },
  {
    name: 'rename mapping dotted',
    mapping: { name: 'a.b.c' },
    ast: b('Rename', { mappings: { name: b('DirectCopy', { path: 'a.b.c' }) } }),
  },
  {
    name: 'op list, simple',
    mapping: ['a', 'b'],
    ast: b('OperationList', {
      operations: [b('DirectCopy', { path: 'a' }), b('DirectCopy', { path: 'b' })],
    }),
  },
  {
    name: 'filter',
    mapping: { $filter: { type: 'Foo' } },
    ast: b('Filter', {
      condition: { type: 'Foo' },
    }),
  },
]

describe('toAst', () => {
  it.each(examples)('mapping: $name', ({ mapping, ast }) => {
    expect(toAst(mapping)).toStrictEqual(ast)
  })
})
