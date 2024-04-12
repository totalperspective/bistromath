import { ASTNode } from '../types/ast'
import { Mapping } from '../types/dsl'
import { b } from './ast'
import { toAst } from './parse'

interface Source {
  a: string
  b: number
  c: boolean
}

interface Example<SourceT, TargetT> {
  name: string
  mapping: Mapping<SourceT, TargetT>
  ast: ASTNode<SourceT, TargetT>
}

type SomeExample = <R>(cb: <S, T>(example: Example<S, T>) => R) => R

const someExample = <S, T>(i: Example<S, T>): SomeExample => {
  const w = <R>(cb: <S, T>(example: Example<S, T>) => R) => cb(i)
  w._name = i.name
  return w
}

const examples: SomeExample[] = [
  someExample({ name: 'empty mapping', mapping: {}, ast: b('Rename', { mappings: {} }) }),
  someExample({ name: 'direct mapping *', mapping: '*', ast: b('Lookup', { path: '*' }) }),
  someExample({
    name: 'direct mapping dotted',
    mapping: 'a.b.c',
    ast: b('Lookup', { path: 'a.b.c' }),
  }),
  someExample({
    name: 'rename mapping *',
    mapping: { name: '*' },
    ast: b('Rename', { mappings: { name: b('Lookup', { path: '*' }) } }),
  }),
  someExample({
    name: 'rename mapping dotted',
    mapping: { name: 'a.b.c' },
    ast: b('Rename', { mappings: { name: b('Lookup', { path: 'a.b.c' }) } }),
  }),
  someExample({
    name: 'op list, simple',
    mapping: ['a', 'b'],
    ast: b('OperationList', {
      operations: [b('Lookup', { path: 'a' }), b('Lookup', { path: 'b' })],
    }),
  }),
  someExample({
    name: 'filter',
    mapping: { $filter: { type: 'Foo' } },
    ast: b('Filter', {
      condition: { type: 'Foo' },
    }),
  }),
  someExample<Source, Source>({
    name: 'project',
    mapping: { $project: ['a', 'b', 'c'] },
    ast: b<Source, Source>('Project', {
      fields: ['a', 'b', 'c'],
    }),
  }),
]

describe('toAst', () => {
  it.each(examples)('mapping: $_name', (someExample) => {
    someExample(({ mapping, ast }) => expect(toAst(mapping)).toStrictEqual(ast))
  })
})
