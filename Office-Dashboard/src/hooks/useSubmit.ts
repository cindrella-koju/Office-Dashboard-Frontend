import { useEffect } from "react";

interface UseCreateResourceProps<T> {
  trigger: "create" | "edit" | null;              
  endpoint: string;              
  payload: T;                   
  onSuccess?: () => void;        
  resetTrigger?: () => void;
  page: string;
  method : "POST" | "PATCH";
  refetch? : () => void;
}

const useCreateResource = <T extends object>({
  trigger,
  endpoint,
  payload,
  onSuccess,
  resetTrigger,
  page,
  method,
  refetch
}: UseCreateResourceProps<T>) => {
  useEffect(() => {
    if (!trigger) return;

    const createResource = async () => {
      try {
        const response = await fetch(endpoint, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          alert(method === "POST" ? `${page} Created Successfully` : `${page} Edited Successfully`)
          onSuccess?.();
          refetch?.();
        } else {
          alert(method === "POST" ? `Failed to create ${page}` : `Failed to edit ${page}`)
        }
      } catch (error) {
        console.error(`Error submitting ${page}:`, error);
        alert(`Error Submitting ${page}. Please try again`);
      } finally {
        resetTrigger?.();
      }
    };

    createResource();
  }, [trigger, endpoint, payload, onSuccess, resetTrigger, page]);
};

export default useCreateResource;
