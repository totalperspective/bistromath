import { Ast } from '../types/ast'
// @ts-expect-error Until we implement it
export default <SourceT, TargetT>(ast: Ast<SourceT, TargetT>, source: SourceT): TargetT => ({})
