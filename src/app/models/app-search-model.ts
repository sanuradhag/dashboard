export interface ITag {
  TagID: number;
  TagName: string;
  CategoryID: number;
  CategoryName: string;
  TagType: string;
  TagTypeID: number;
  TagDataType: string;
  TagDataTypeID: number;
  TagUnit: string;
  TagUnitID: number;
}

export interface ITagValue {
  Value: string
}

export interface IOperator {
  id: number
  operator: string
}

export interface ISearchTerm {
  tag: ITag,
  operator: IOperator,
  value: ITagValue,
  logicalOperator: IOperator
}
