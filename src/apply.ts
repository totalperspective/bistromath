import { ASTNode } from '../types/ast'

export default <SourceT extends object, TargetT extends object>(
  ast: ASTNode<SourceT, TargetT> | Record<string, never>,
  source: SourceT
): TargetT => ({} as TargetT)
