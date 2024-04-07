// TODO: add features

import type { Mapping } from '../types/dsl'
import apply from './apply'
import { toAst } from './parse'

export const add = (a: number, b: number) => a + b

export function transmute<SourceT extends object, TargetT extends object>(
  mapping: Mapping<SourceT, TargetT>,
  source: SourceT
): TargetT {
  const ast = toAst<SourceT, TargetT>(mapping)
  const target = apply<SourceT, TargetT>(ast, source)
  return target
}
