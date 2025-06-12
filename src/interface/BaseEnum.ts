type ValueType = string | number | object | boolean;
export type UnionEnum<
  T extends { [key: string]: ValueType } | ReadonlyArray<ValueType>
> = T extends ReadonlyArray<ValueType>
  ? T[number]
  : T extends { [key: string]: infer U }
  ? U
  : never;
