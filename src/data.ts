import { Static, Type } from "@sinclair/typebox";

export const ChartDataSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  primaryColor: Type.String(),
  backgroundColor: Type.String(),
  textColor: Type.String(),
  edgeTitles: Type.Record(Type.String(), Type.String()),
  lines: Type.Array(
    Type.Object({
      label: Type.String(),
      color: Type.String(),
      values: Type.Record(Type.String(), Type.Number()),
    })
  ),
});

export type ChartData = Omit<Static<typeof ChartDataSchema>, "id">;
