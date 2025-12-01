import axios from "axios";
import { useCallback, useState } from "react";

export default function usePost(url: string, token: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<any>(null);

  const makeRequest = useCallback(
    async (requestData: any) => {
      setIsLoading(true);
      setError(null);
      try {
        console.log(requestData);
        const response = await axios.post(url, requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setData(response.data);
      } catch (error: any) {
        setError(error);
      }
      setIsLoading(false);
    },
    [url, token]
  );

  return { makeRequest, data, isLoading, error };
}
