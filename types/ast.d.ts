import { AggregateFunction, DottedPath } from './dsl'

export enum NodeType {
  DirectCopyNode = 'DirectCopy',
  FilterNode = 'Filter',
  ProjectNode = 'Project',
  RenameNode = 'Rename',
  TemplateNode = 'Template',
  UnionNode = 'Union',
  DifferenceNode = 'Difference',
  IntersectNode = 'Intersect',
  GroupNode = 'Group',
  OperationListNode = 'OperationList',
}
// Extend the ASTNode type to include OperationListNode
export type ASTNode<SourceT, TargetT> =
  | DirectCopyNode<SourceT, TargetT>
  | FilterNode<SourceT>
  | ProjectNode<SourceT>
  | RenameNode<SourceT>
  | TemplateNode
  | UnionNode<SourceT>
  | DifferenceNode<SourceT>
  | IntersectNode<SourceT>
  | GroupNode<SourceT>
  | OperationListNode<SourceT, TargetT>

export interface OperationListNode<SourceT, TargetT> {
  type: NodeType.OperationListNode
  operations: Array<ASTNode<SourceT, TargetT>>
}
export interface DirectCopyNode<SourceT, TargetT> {
  type: NodeType.DirectCopyNode
  path: DottedPath<Array<keyof SourceT & string>>
}

export interface FilterNode<SourceT> {
  type: NodeType.FilterNode
  condition: (source: SourceT) => boolean
}

export interface ProjectNode<SourceT> {
  type: NodeType.ProjectNode
  fields: Array<keyof SourceT & string>
}

export interface RenameNode<SourceT> {
  type: NodeType.RenameNode
  mappings: { [P in keyof SourceT]?: string }
}

export interface TemplateNode {
  type: NodeType.TemplateNode
  template: string
}

export interface UnionNode<SourceT> {
  type: NodeType.UnionNode
  operands: ASTNode<SourceT, any>[]
}

export interface DifferenceNode<SourceT> {
  type: NodeType.DifferenceNode
  operands: ASTNode<SourceT, any>[]
}

export interface IntersectNode<SourceT> {
  type: NodeType.IntersectNode
  operands: ASTNode<SourceT, any>[]
}

export interface GroupNode<SourceT> {
  type: NodeType.GroupNode
  key: keyof SourceT
  aggregate?: AggregateFunction<SourceT>
}

export type NodeMap = {
  [Node in NodeType]: Extract<ASTNode<object, object>, { type: Node }>
}

export type NodeSpecMap = {
  [Node in NodeType]: Omit<NodeMap[Node], 'type'>
}

export type NodeConstructor = {
  [Node in NodeType]: (spec: NodeSpecMap[Node]) => NodeMap[Node]
}
