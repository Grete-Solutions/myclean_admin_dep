import { File } from "lucide-react";
import { ReactNode } from "react";

export const data: DeletedUsersConst[] = [
    {
      id: "kjsdgj",
      ServiceLocation: "Service Location",
      Name: "Daniel J",
      Status: "Deleted",
      DocView: <File/>,
      Email:'',
      Mobile:'',
      DeletedReason:'',
      Rating:'',
      Type:'SUV'
    },
   
  ];
  

export type DeletedUsersConst = {
  id: string,
  Type: string,
  Email: string,
  Mobile: string,
  DeletedReason: string,
  Rating: string,
  DocView?: ReactNode; 
  ServiceLocation: string
  Status?: string;
  Name: string
}
