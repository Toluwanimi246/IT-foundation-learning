import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not fetch data!");
        }
        return res.json();
      })
      .then((data) => {
        setData(data);
        setIsPending(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.log("An error occurred:", err.message);
          setIsPending(false);
        }
      });

    return () => abortCont.abort();
  }, [url]);

  return { data, isPending };
};

export default useFetch;
