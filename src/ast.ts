import type { ASTNode, NodeConstructor, NodeMap, NodeName, NodeSpecMap } from '../types/ast'
import { NodeType } from '../types/ast'

function factoryFactory<T extends NodeType>(type: T) {
  return <SourceT, TargetT>(spec: NodeSpecMap<SourceT, TargetT>[T]): NodeMap<SourceT, TargetT>[T] =>
    ({ type, ...spec } as NodeMap<SourceT, TargetT>[T])
}

const factory: NodeConstructor = {
  Lookup: factoryFactory(NodeType.Lookup),
  Filter: factoryFactory(NodeType.Filter),
  Difference: factoryFactory(NodeType.Difference),
  Group: factoryFactory(NodeType.Group),
  Intersect: factoryFactory(NodeType.Intersect),
  OperationList: factoryFactory(NodeType.OperationList),
  Project: factoryFactory(NodeType.Project),
  Rename: factoryFactory(NodeType.Rename),
  Template: factoryFactory(NodeType.Template),
  Union: factoryFactory(NodeType.Union),
}

export function b<
  SourceT,
  TargetT,
  NodeNameT extends NodeName = NodeName,
  NodeTypeT extends (typeof NodeType)[NodeNameT] = (typeof NodeType)[NodeNameT]
>(type: NodeNameT, spec: NodeSpecMap<SourceT, TargetT>[NodeTypeT]): ASTNode<SourceT, TargetT> {
  const nodeType = NodeType[type]
  const toNode = factory[nodeType]
  return toNode(spec)
}
