export const DataMap = {
  string: String,
  number: Number,
  boolean: Boolean,
  object: Object,
  array: Array,
} as const;

export type TDataStr = keyof typeof DataMap;
export type TDataConstr = (typeof DataMap)[TDataStr];
export type TPrimitiveShort = TDataConstr | TDataStr | TDataConstr[] | TDataStr[];
export type TPrimitiveDetail = { type: TPrimitiveShort, required?: boolean, defaultValue?: any };

export type TPrimitive = TPrimitiveShort | TPrimitiveDetail | TPrimitiveDetail[];

export type TPointer = {
  type: 'pointer',
  ref: string,
  required?: boolean,
}

export type TReference = {
  type: 'ref',
  ref: string,
  forignField?: string,
  required?: boolean,
}

export type TSchema = {
  [key: string]: TPrimitive | TPointer | TReference,
};