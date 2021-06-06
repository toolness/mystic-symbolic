// This is just a subset of the actual API; for full documentation, see:
//
//   https://github.com/apache/avro/blob/master/lang/js/doc/API.md

declare module "avro-js" {
  export type AvroType<T> = {
    toBuffer(value: T): Buffer;
    fromBuffer(value: Buffer, resolver?: any, noCheck?: boolean): T;
    createResolver(otherType: AvroType<any>): any;
  };

  export function parse<T>(schema: any): AvroType<T>;
}
