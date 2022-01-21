//@ts-ignore
import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import { ChartData, ChartDataSchema } from "../data";
import Ajv from "ajv";
const ajv = new Ajv().addKeyword("kind").addKeyword("modifier");

export const Chart = (p: ChartData) => {
  const validate = ajv.compile(ChartDataSchema);
  const valid = validate({ id: "asda3", ...p });
  if (!valid) {
    return (
      <div>
        Invalid Chart Data{" "}
        {validate.errors?.map((e) => (
          <p className="ml-4">{e.message}</p>
        ))}
      </div>
    );
  }
  const { edgeTitles, lines, primaryColor, backgroundColor, textColor, title } =
    p;
  return (
    <div
      className="flex-column p-10 rounded-3xl m-10"
      style={{ backgroundColor, color: textColor }}
    >
      <h1 className="h1">{title}</h1>
      <div className="flex-1 flex p-4 justify-center">
        <RadarChart
          captions={edgeTitles}
          data={lines.map((line) => ({
            data: line.values,
            meta: { color: line.color },
          }))}
          size={650}
          options={
            {
              captionMargin: 32,
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

              captionProps: (data: {
                key: string;
                caption: string;
                angle: number;
              }) => ({
                className: "font-mono",
                fontSize: 15,
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
