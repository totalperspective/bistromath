import type { Mapping, OperationList } from '../types/dsl'

export function isOperatorList<SourceT, TargetT>(
  mapping: Mapping<SourceT, TargetT>
): mapping is OperationList<SourceT, TargetT> {
  return Array.isArray(mapping)
}
