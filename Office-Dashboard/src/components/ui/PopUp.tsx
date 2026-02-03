import type { Dispatch, SetStateAction } from "react";
import ModalWrapper from "../pages/shared/ModelWrapper";
import Button from "./Button";

interface PopUpProps {
  popUpType : "error" | "success" | "delete";
  pagename : string;
  data? : string;
  message? : string;
  setOnClose :  Dispatch<SetStateAction<boolean>>    
}

export default function DeleteConfirmation({
  data,
  pagename,
  popUpType,
  message,
  setOnClose
}: PopUpProps) {
  const title = popUpType === "error"
    ? "Error"
    : popUpType === "success"
        ? "Success"
        : popUpType === "delete"
        ? "Delete"
        : "";

    const color = popUpType === "error"
    ? "red"
    : popUpType === "success"
        ? "green"
        : "";
    
console.log(title, popUpType, color)
  return (
    <ModalWrapper 
      title={title} 
      color={color}
      onClose={() => setOnClose(false)}
    >
      <div className="space-y-6 py-2">

        {
            message ? 
             (<div >
                <p className="text-ld font-semibold text-gray-900">
                    {message}
                </p>
            </div>
        ) : (
            <div >
            <p className="text-sm font-semibold text-gray-900">
                Are you sure you want to delete this {pagename} {data}?
            </p>
            <p className="mt-2 text-sm text-gray-500">
                This action cannot be undone. The {pagename} {data} and all associated data will be
                permanently removed.
            </p>
            </div>
        )
        }

        <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            varient={popUpType === "delete" ? "danger" : "primary"}
          >
            { popUpType === "delete" ? "Delete" : "OK"}
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
}