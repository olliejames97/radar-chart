import { Pantry } from "pantry-cloud";
import { useEffect, useState } from "react";

const pantry = new Pantry("8da538d6-c677-4be1-9873-b60e7486a7ed");

export const getDetails = async () => await pantry.getPantry();

export const createBasket = async (id: string) => await pantry.postBasket(id);
export const getMetadata = async () => {
  return await pantry.getPantry();
};

export const getBasketData = async (id: string) => {
  return await pantry.getBasket(id);
};

export const addDataToBasket = async (id: string, data: {}) => {
  return await pantry.putBasket(id, { ...data });
};

export const useGetData = (id: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(undefined);
  const [response, setResponse] = useState<any>(undefined);
  useEffect(() => {
    if (id.length > 1) {
      getBasketData(id)
        .then((d) => {
          setResponse(d);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
          setError(e);
        });
    } else {
      console.log("skipping fetch");
    }
  }, [id]);

  return { loading, error, response };
};

export const useAddData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(undefined);
  const [response, setResponse] = useState<any>(undefined);
  const submit = (d: any) => {
    setLoading(true);
    console.log("submitting");
    createBasket(d.id)
      .then((_) => {
        addDataToBasket(d.id, d)
          .then((r) => {
            setResponse(r);
            setLoading(false);
          })
          .catch((e) => {
            setError(e);
            setLoading(false);
          });
      })
      .catch((e) => {
        setError(e);
        setLoading(false);
      });
  };
  return { loading, error, response, submit };
};

// // The `deleteBasket` async method deletes the entire baskte.
// await pantry.deleteBasket("testBasket");
