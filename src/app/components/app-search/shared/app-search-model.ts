export interface ITag {
  tagID: number,
  tagName: string,
  tagDisplayName:string,
  categoryID: number,
  categoryName: string,
  tagType: string,
  tagTypeID: number,
  tagDataType: string,
  tagDataTypeID: number,
  tagUnit:string,
  tagUnitID: number
}

export interface IOperator {
  id: number
  operator: string
}

export interface ISearchTerm {
  tag: ITag,
  operator: IOperator,
  value: string,
  logicalOperator: IOperator,
  index?: number
}
