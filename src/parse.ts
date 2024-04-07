import type { Ast } from '../types/ast'
import type { Mapping } from '../types/dsl'
import { isOperatorList } from './dsl'

export function toAst<SourceT, TargetT>(mapping: Mapping<SourceT, TargetT>): Ast<SourceT, TargetT> {
  if (isOperatorList(mapping)) {
    return {}
  }
  return {}
}
