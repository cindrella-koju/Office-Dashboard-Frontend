import type { ModelType } from "./main.type";

export interface RoundData{
    id : string,
    name : string,
}

export interface RoundModelProps{
    mode : ModelType,
    onClose : () => void;
    formData : RoundData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit : (e:React.FormEvent) => void;
}