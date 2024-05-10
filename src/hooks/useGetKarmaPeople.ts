import { useQuery } from "@tanstack/react-query";
import { Reloader } from "../types";

export default function useGetKarmaPeople() {
  return useQuery({
    queryKey: ["karmaPeople"],
    queryFn: async () => {
      const res = await fetch(
        "https://europe-west1-karma-26309.cloudfunctions.net/latestKings"
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();

      return data as Reloader[];
    },
    refetchOnWindowFocus: false,
  });
}
