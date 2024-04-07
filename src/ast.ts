import { ASTNode, NodeConstructor, NodeMap, NodeSpecMap, NodeType } from '../types/ast'

function factoryFactory<T extends NodeType>(type: T) {
  return (spec: NodeSpecMap[T]): NodeMap[T] => ({ type, ...spec } as NodeMap[T])
}

const factory: NodeConstructor = {
  DirectCopy: factoryFactory(NodeType.DirectCopyNode),
  Filter: factoryFactory(NodeType.FilterNode),
  Difference: factoryFactory(NodeType.DifferenceNode),
  Group: factoryFactory(NodeType.GroupNode),
  Intersect: factoryFactory(NodeType.IntersectNode),
  OperationList: factoryFactory(NodeType.OperationListNode),
  Project: factoryFactory(NodeType.ProjectNode),
  Rename: factoryFactory(NodeType.RenameNode),
  Template: factoryFactory(NodeType.TemplateNode),
  Union: factoryFactory(NodeType.UnionNode),
}

function b<SourceT extends object, TargetT extends object, T extends NodeType>(
  type: T,
  spec: NodeSpecMap[T]
): ASTNode<SourceT, TargetT> {
  const toNode: Extract<NodeConstructor[T], (spec: NodeSpecMap[T]) => { type: T }> = factory[type]
  return toNode(spec)
}
