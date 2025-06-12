import { UnionEnum } from "../../../BaseEnum";
export const enDataSourceParamType = {
    Numeric: "Numeric",
    String: "String",
  } as const;
export type enDataSourceParamType = UnionEnum<typeof enDataSourceParamType>;
  