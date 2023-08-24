
const schemaDataType = [
  'string',
  'number',
  'integer',
  'decimal',
  'boolean',
  'object',
  'array',
  'null',
  'any',
  'date',
  'ref',
] as const

type SchemaDataType = typeof schemaDataType[number]

interface SchemaItem {
  type: SchemaDataType
  required?: boolean
  default?: any
  enum?: any[]
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
}

class Schema {
  constructor() {

  }
}