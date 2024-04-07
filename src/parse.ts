import type { ASTNode } from '../types/ast'
import type { Mapping } from '../types/dsl'
import { isOperatorList } from './dsl'

export function toAst<SourceT extends object, TargetT extends object>(
  mapping: Mapping<SourceT, TargetT>
): ASTNode<SourceT, TargetT> | Record<string, never> {
  if (isOperatorList(mapping)) {
    return {}
  }
  return {}
}
