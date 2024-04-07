import type { ASTNode, NodeConstructor, NodeMap, NodeName, NodeSpecMap } from '../types/ast'
import { NodeType } from '../types/ast'

function factoryFactory<T extends NodeType>(type: T) {
  return (spec: NodeSpecMap[T]): NodeMap[T] => ({ type, ...spec } as NodeMap[T])
}

const factory: NodeConstructor = {
  DirectCopy: factoryFactory(NodeType.DirectCopy),
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
  SourceT extends object,
  TargetT extends object,
  NodeNameT extends NodeName,
  NodeTypeT extends (typeof NodeType)[NodeNameT]
>(type: NodeNameT, spec: NodeSpecMap[NodeTypeT]): ASTNode<SourceT, TargetT> {
  const nodeType = NodeType[type]
  const toNode = factory[nodeType]
  return toNode(spec)
}
