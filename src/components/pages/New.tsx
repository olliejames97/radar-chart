import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { times } from "lodash";
import { ChartData, ChartDataSchema } from "../../data";
import { Chart } from "../Chart";
import { HexColorPicker } from "react-colorful";
import Ajv from "ajv";
import { useAddData } from "../../storage";
import { useNavigate } from "react-router-dom";

const shortid = require("shortid");
const ajv = new Ajv().addKeyword("kind").addKeyword("modifier");

export const NewPage = () => {
  const [chartData, setChartData] = useState<any>({});
  const { loading, error, response, submit } = useAddData();
  const validate = ajv.compile(ChartDataSchema);
  const navigate = useNavigate();
  const onSubmit = () => {
    const data = { id: shortid.generate(), ...chartData };
    const valid = validate(data);
    if (valid) {
      submit(data);
    } else {
      console.log("invalid data", validate.errors);
    }
  };

  useEffect(() => {
    console.log({ loading, error, response });
    if (!error && !loading && response) {
      navigate("/charts/" + response.id);
    }
  }, [loading, error, response]);
  return (
    <>
      <div className="flex flex-row">
        <div className="absolute right-8">
          <ChartForm
            onUpdate={setChartData}
            onComplete={() => {
              console.log("submitting");
              onSubmit();
            }}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Chart {...chartData} />
        </div>
      </div>
    </>
  );
};

const defaults = {
  title: "My Chart",
  primaryColor: "#ff9bfd",
  backgroundColor: "#ffe8a2",
  textColor: "#000000",
};

const ChartForm = ({
  onUpdate,
  onComplete,
}: {
  onUpdate: (c: ChartData) => void;
  onComplete: () => void;
}) => {
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();
  watch();
  const [numEdges, setNumEdges] = useState(0);
  const [numLines, setNumLines] = useState(0);
  const refresh = useCallback(
    (values: any) => {
      onUpdate(formatFormData(values) as any);
    },
    [numEdges, numLines, onUpdate]
  );

  const formatFormData = (values: any) => {
    return {
      title: values.title ? values.title : defaults.title,
      primaryColor: values.primaryColor
        ? values.primaryColor
        : defaults.primaryColor,
      backgroundColor: values.backgroundColor ?? defaults.backgroundColor,
      textColor: values.textColor ? values.textColor : defaults.textColor,
      edgeTitles: Object.assign(
        {},
        times(
          numEdges,
          (index) => values.edge[index].title || `Step ${index + 1}`
        )
      ),
      lines: times(numLines, (index) => {
        const label = values.line[index].label || `Line ${index + 1}`;
        const color = values.line[index].color || `green`;
        const data = Object.assign(
          {},
          times(numEdges, (edgeIndex) => {
            return Number(values.line[index].values[edgeIndex]) || 1;
          })
        );

        return { label, color, values: data };
      }),
    };
  };

  useEffect(() => {
    refresh(getValues());
  }, [onUpdate, refresh, getValues]);
  return (
    <form
      className="flex-col flex space-y-4 text-sm bg-green-400 p-4 rounded"
      style={{ maxHeight: "90vh", overflowY: "scroll" }}
      onSubmit={refresh}
      onChange={() => {
        console.log("change");
        refresh(getValues());
      }}
    >
      <div>
        <p>Title</p>
        <input
          placeholder={defaults.title}
          className="ml-4"
          type="text"
          {...register("title", { required: true })}
        />
        {errors.title && errors.title.message}
      </div>
      <div>
        <p>Primary Colour</p>
        <ColorField
          color={getValues("primaryColor") || defaults.primaryColor}
          onChangeColor={(col) => {
            setValue("primaryColor", col);
          }}
          placeholder={defaults.primaryColor}
          value={getValues("primaryColor") || defaults.primaryColor}
          className="ml-4"
          type="text"
          {...register("primaryColor", { required: true })}
        />
        {errors.primaryColor && errors.primaryColor.message}
      </div>
      <div>
        <p>Background Colour</p>
        <ColorField
          color={getValues("backgroundColor") || defaults.backgroundColor}
          onChangeColor={(col) => {
            setValue("backgroundColor", col);
          }}
          placeholder={defaults.backgroundColor}
          value={getValues("backgroundColor") || defaults.backgroundColor}
          className="ml-4"
          type="text"
          {...register("backgroundColor", { required: true })}
        />
        {errors.backgroundColor && errors.backgroundColor.message}
      </div>
      <div>
        <p>Text Colour</p>
        <ColorField
          color={getValues("textColor") || defaults.textColor}
          onChangeColor={(col) => {
            setValue("textColor", col);
          }}
          placeholder={defaults.backgroundColor}
          value={getValues("textColor") || defaults.textColor}
          className="ml-4"
          type="text"
          {...register("textColor", { required: true })}
        />
        {errors.textColor && errors.textColor.message}
      </div>
      <div className="">
        <p>Edges</p>
        <div className="ml-4 space-y-2 relative">
          {Array.from({ length: numEdges }, (_, index) => {
            const edgeIndex = index;
            return (
              <>
                <div className="p-2 rounded-lg bg-green-500 relative">
                  <p>{edgeIndex}</p>

                  <div className="ml-4">
                    <p>Title</p>
                    <input
                      placeholder={`Step ${edgeIndex + 1}`}
                      className="ml-4"
                      type="text"
                      {...register(`edge.${edgeIndex}.title`, {
                        required: true,
                      })}
                    />
                  </div>
                </div>
              </>
            );
          })}
          <button
            className="underline"
            type="button"
            onClick={() => setNumEdges(numEdges + 1)}
          >
            Add Edge
          </button>
          <button
            className="underline absolute right-0"
            type="button"
            onClick={() => setNumEdges(numEdges - 1)}
          >
            Remove Edge
          </button>
        </div>
      </div>
      <div>
        <p>Lines</p>
        <div className="ml-4 space-y-2 relative">
          {times(numLines, (index) => {
            const lineIndex = index;
            return (
              <div
                key={lineIndex}
                style={{
                  backgroundColor:
                    getValues(`line.${lineIndex}.color`) || undefined,
                }}
                className="p-4 rounded-lg"
              >
                <p>{lineIndex}</p>
                <div className="space-y-1">
                  <p>Label</p>
                  <input
                    placeholder={`Line ${lineIndex + 1}`}
                    className="ml-4"
                    type="text"
                    {...register(`line.${lineIndex}.label`, { required: true })}
                  />
                  <p>Color</p>
                  <ColorField
                    color={getValues(`line.${lineIndex}.color`) || "green"}
                    onChangeColor={(col) => {
                      setValue(`line.${lineIndex}.color`, col);
                    }}
                    placeholder={defaults.backgroundColor}
                    value={getValues(`line.${lineIndex}.color`) || "green"}
                    className="ml-4"
                    type="text"
                    {...register(`line.${lineIndex}.color`, { required: true })}
                  />

                  <p>Values</p>
                  <div className="space-y-1">
                    {times(numEdges, (index) => {
                      const key =
                        getValues(`edge.${index}.title`) || `Step ${index + 1}`;
                      return (
                        <div className="ml-4" key={key}>
                          <p>{key}</p>
                          <input
                            className="ml-4"
                            placeholder="1"
                            type="number"
                            {...register(`line.${lineIndex}.values.${index}`, {
                              required: true,
                            })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <button
            className="underline"
            type="button"
            onClick={() => setNumLines(numLines + 1)}
          >
            Add Line
          </button>
          <button
            className="underline absolute right-0"
            type="button"
            onClick={() => setNumLines(numLines - 1)}
          >
            Remove Line
          </button>
        </div>
        <button
          value="submit"
          type="button"
          onClick={() => {
            refresh(getValues());
            onComplete();
          }}
          className="mt-4 px-4 p-2 underline bg-green-600"
        >
          Done
        </button>
      </div>
    </form>
  );
};

const ColorField = ({
  onChangeColor,
  color,
  ...otherProps
}: {
  onChangeColor: (col: string) => void;
  color: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  return (
    <div
      onFocus={(e) => {
        setIsPickerVisible(true);
      }}
      onBlur={(e) => {
        setIsPickerVisible(false);
      }}
    >
      <input
        type="text"
        {...otherProps}
        style={{ backgroundColor: color, cursor: "pointer" }}
      />
      {isPickerVisible && (
        <HexColorPicker
          color={color}
          onChange={onChangeColor}
          style={{ marginLeft: 8 }}
        />
      )}
    </div>
  );
};
