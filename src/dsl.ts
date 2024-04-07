import type { FilterOperation, Mapping, OperationList } from '../types/dsl'

export function isOperatorList<SourceT, TargetT>(
  mapping: Mapping<SourceT, TargetT>
): mapping is OperationList<SourceT, TargetT> {
  return Array.isArray(mapping)
}

export function isFilter<SourceT, TargetT>(
  mapping: Mapping<SourceT, TargetT>
): mapping is FilterOperation<SourceT> {
  return (
    typeof mapping === 'object' && typeof (mapping as FilterOperation<SourceT>).$filter === 'object'
  )
}
