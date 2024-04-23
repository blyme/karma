import { useQuery } from "@tanstack/react-query";

export default function useGetKarmaPeople() {
  return useQuery({
    queryKey: ["karmaPeople"],
    queryFn: async () => {
      const res = await fetch(
        "https://europe-west1-karma-26309.cloudfunctions.net/latestKings"
      );
      const data = await res.json();

      return data;
    },
  });
}
