import _ from 'lodash'

import type { ASTNode } from '../types/ast'
import type { Lookup, Mapping, OperationList } from '../types/dsl'
import { b } from './ast'
import { isFilter, isOperatorList } from './dsl'

export function toAst<SourceT extends object, TargetT extends object>(
  mapping: Mapping<SourceT, TargetT> | Lookup<SourceT>
): ASTNode<SourceT, TargetT> {
  if (typeof mapping === 'string') {
    return b('Lookup', { path: mapping })
  }
  if (isOperatorList<object, object>(mapping)) {
    const operations = []
    for (const op of mapping) {
      const ast = toAst<object, object>(op)
      operations.push(ast)
    }
    return b('OperationList', { operations })
  }
  if (isFilter<SourceT, TargetT>(mapping)) {
    return b('Filter', { condition: mapping.$filter })
  }
  return b('Rename', { mappings: _.mapValues(mapping, toAst) })
}
