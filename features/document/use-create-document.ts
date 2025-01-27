"use client"

import { toast } from "@/hooks/use-toast";
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof api.document.create.$post>;
type RequestType = InferRequestType<typeof api.document.create.$post>["json"];

const useCreateDocument = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await api.document.create.$post({ json });
            return await response.json();
        },
        onSuccess: (response) => {
            console.log(response);
            queryClient.invalidateQueries({ queryKey: ["documents"]});
        },
        onError: () => {
            toast({
                title: "Failed to create document",
                description: "An error occurred while creating the document",
                variant: "destructive"
            })
        }
    })
};


export default useCreateDocument;