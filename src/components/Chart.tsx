import { Static } from "@sinclair/typebox";
//@ts-ignore
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import { ChartDataSchema } from "../data";

type Props = Omit<Static<typeof ChartDataSchema>, "id">;

export const Chart = ({
  edgeTitles,
  lines,
  primaryColor,
  backgroundColor,
  textColor,
  title,
}: Props) => {
  return (
    <div
      className="flex-column p-10 rounded-3xl m-10"
      style={{ backgroundColor }}
    >
      <h1 className="h1">{title}</h1>
      <div className="flex-1 p-4">
        <RadarChart
          captions={edgeTitles}
          data={lines.map((line) => ({
            data: line.values,
            meta: { color: line.color },
          }))}
          size={350}
          options={
            {
              dots: true,
              scales: 10,
              scaleProps: (a: any) => {
                return {
                  stroke: "black",
                  strokeOpacity: 0.1,
                  fill: primaryColor,
                  fillOpacity: 0.3,
                };
              },
              setViewBox: (e: any) => 4,
              // @ts-ignore
              captionProps: (data: {
                key: string;
                caption: string;
                angle: number;
              }) => ({
                className: "font-mono",
                fontSize: 16,
                fill: textColor,
                color: primaryColor,
                fontFamily: "monospace",
                textAnchor: "middle",
                cursor: "pointer",
                onClick: (e: any) => {
                  console.log("click", data);
                },
              }),
            } as any
          }
        />
      </div>
      <div className="w-100">
        {lines.map((line) => {
          return (
            <div className="flex flex-row space-x-4 items-center">
              <div
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: line.color,
                }}
              />
              <p style={{ color: textColor }}>{line.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
