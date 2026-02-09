export interface UserDetail {
  user_id: string; 
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
