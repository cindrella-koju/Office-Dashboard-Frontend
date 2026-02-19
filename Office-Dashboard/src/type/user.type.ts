import type { Dispatch, SetStateAction } from "react";
import type { ModelType } from "./main.type";
import type { Round } from "./group.type";

export interface UserDetailResponse{
  page : number,
  limit : number,
  total_pages : number,
  items : UserDetail[]
}


export interface UserDetail {
  id: string; 
  username: string;
  fullname: string;
  email: string;
  role_id: string;
  role : string
}

export interface AddUser {
  id?: string;  
  username: string;
  fullname: string;
  email: string;
  role_id: string;
  password: string; 
}

export interface UserModelProps {
    mode: ModelType;
    formData: AddUser;
    setFormData : Dispatch<SetStateAction<AddUser>>;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClose : () => void;
    handleSubmit : (e:React.FormEvent) => void;
    roles : Round[]
}
