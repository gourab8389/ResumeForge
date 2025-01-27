"use client";

import { api } from "@/lib/hono-rpc";
import { useQuery } from "@tanstack/react-query";

const useGetDocument = () => {
    const queryKey = ["documents"];
    const query = useQuery({
        queryKey,
        queryFn: async () => {
            const endpoint = api.document.all;
            const response = await endpoint.$get();

            if (!response.ok) {
                throw new Error("Failed to fetch documents");
            }
            const { data, success } = await response.json();
            return { data, success };
        },
    });
    return query;
}

export default useGetDocument;