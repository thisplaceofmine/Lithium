export const DataMap = {
  string: String,
  number: Number,
  boolean: Boolean,
  object: Object,
  array: Array,
} as const;

export type TDataStr = keyof typeof DataMap;
export type TDataConstr = (typeof DataMap)[TDataStr];
export type TPrimitiveShort =
  | TDataConstr
  | TDataStr
  | TDataConstr[]
  | TDataStr[];
export type TPrimitiveDetail = {
  type: TPrimitiveShort;
  required?: boolean;
  defaultValue?: any;
};

export type TPrimitive =
  | TPrimitiveShort
  | TPrimitiveDetail
  | TPrimitiveDetail[];

export type TPointer = {
  type: 'pointer';
  ref: string;
  required?: boolean;
};

export type TRelation = {
  type: 'ref';
  ref: string;
  forignField?: string;
  required?: boolean;
};

export type TSchema = {
  [key: string]: TPrimitive | TPointer | TRelation;
};

export function isDataStr(string: any): string is TDataStr {
  return DataMap[string] !== undefined;
}
export function isDataConstr(
  constr: any
): constr is TDataConstr {
  return typeof constr === 'function';
}

export function isSchema(schema: any): schema is TSchema {
  return typeof schema === 'object';
}
export function isPrimitive(
  primitive: any
): primitive is TPrimitive {
  return (
    typeof primitive === 'string' ||
    Array.isArray(primitive) ||
    typeof primitive === 'function'
  );
}
export function isPrimitiveDetail(
  primitive: any
): primitive is TPrimitiveDetail {
  return typeof primitive === 'object' && primitive.type;
}
export function isPointer(pointer: any): pointer is TPointer {
  return (
    typeof pointer === 'object' && pointer.type === 'pointer'
  );
}
export function isRelation(
  reference: any
): reference is TRelation {
  return (
    typeof reference === 'object' && reference.type === 'ref'
  );
}
export function isRefs(
  relation: any
): relation is TPointer | TRelation {
  return isPointer(relation) || isRelation(relation);
}

const stringifyFormat = (input: TSchema): TSchema => {
  const obj = {};

  for (const key in input) {
    const value = input[key];

    if (isSchema(value)) {
      obj[key] = stringifyFormat(value);
      continue;
    }

    if (Array.isArray(value)) {
      obj[key] = value.map((item) => {
        return stringifyFormat(item);
      });
      continue;
    }

    if (isRefs(value) || isPrimitiveDetail(value)) {
      obj[key] = value;
      continue;
    }

    if (isDataConstr(value)) {
      obj[key] = { type: value.name.toLowerCase() };
      continue;
    }

    if (isDataStr(value)) {
      obj[key] = { type: value };
      continue;
    }
  }
  return obj;
};

export function stringify  (input: TSchema): string {
  return JSON.stringify(stringifyFormat(input));
};


export default {
  stringify,
  
}

