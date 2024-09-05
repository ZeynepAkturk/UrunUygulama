import { useMemo } from "react";

const useGlobalFilter = (array: any[], query: string) => {
  const filteredResult = useMemo(
    () =>
      array.filter((x) =>
        Object.values(x).join(" ").toLowerCase().includes(query.toLowerCase())
      ),
    [query]
  );
  return filteredResult;
};

export default useGlobalFilter;
