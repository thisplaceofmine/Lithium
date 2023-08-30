 import { TSchema } from './types'
 
 class Schema {
  schema: TSchema = {}
  constructor(schema: string | TSchema) {
    this.init(schema)
  }

  private init(schema: string | TSchema): void | never {

  }


  public static stringify(input: TSchema): string {
    const obj = {}



    return JSON.stringify(obj)
  }

  public static parse(input: string): TSchema {
    return {}
  }


 }
