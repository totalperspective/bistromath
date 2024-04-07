import { AggregateFunction, DirectCopy, DottedPath, Pattern } from './dsl'

export enum NodeType {
  DirectCopy = 'DirectCopy',
  Filter = 'Filter',
  Project = 'Project',
  Rename = 'Rename',
  Template = 'Template',
  Union = 'Union',
  Difference = 'Difference',
  Intersect = 'Intersect',
  Group = 'Group',
  OperationList = 'OperationList',
}

export type NodeName = keyof typeof NodeType

// Extend the ASTNode type to include OperationListNode
export type ASTNode<SourceT, TargetT> =
  | DirectCopyNode<SourceT, TargetT>
  | FilterNode<SourceT>
  | ProjectNode<SourceT>
  | RenameNode<SourceT, TargetT>
  | TemplateNode
  | UnionNode<SourceT>
  | DifferenceNode<SourceT>
  | IntersectNode<SourceT>
  | GroupNode<SourceT>
  | OperationListNode<SourceT, TargetT>

export interface OperationListNode<SourceT, TargetT> {
  type: NodeType.OperationList
  operations: ASTNode<SourceT, TargetT>[]
}
export interface DirectCopyNode<SourceT, TargetT> {
  type: NodeType.DirectCopy
  path: DirectCopy<SourceT>
}

export interface FilterNode<SourceT> {
  type: NodeType.Filter
  condition: Record<string, string>
}

export interface ProjectNode<SourceT> {
  type: NodeType.Project
  fields: Array<keyof SourceT & string>
}

export interface RenameNode<SourceT, TargetT> {
  type: NodeType.Rename
  mappings: { [P in keyof SourceT]?: ASTNode<SourceT, TargetT> }
}

export interface TemplateNode {
  type: NodeType.Template
  template: string
}

export interface UnionNode<SourceT> {
  type: NodeType.Union
  operands: ASTNode<SourceT, any>[]
}

export interface DifferenceNode<SourceT> {
  type: NodeType.Difference
  operands: ASTNode<SourceT, any>[]
}

export interface IntersectNode<SourceT> {
  type: NodeType.Intersect
  operands: ASTNode<SourceT, any>[]
}

export interface GroupNode<SourceT> {
  type: NodeType.Group
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
