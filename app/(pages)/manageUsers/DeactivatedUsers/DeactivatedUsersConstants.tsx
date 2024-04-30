import { File } from "lucide-react";
import { ReactNode } from "react";

export const data: DeactivatedUsersConst[] = [
    {
      id: "kjsdgj",
      ServiceLocation: "Service Location",
      Name: "Daniel J",
      Status: "Deactivated",
      DocView: <File/>,
      Email:'',
      Mobile:'',
      DeactivatedReason:'',
      Rating:'',
      Type:'SUV'
    },
   
  ];
  

export type DeactivatedUsersConst = {
  id: string,
  Type: string,
  Email: string,
  Mobile: string,
  DeactivatedReason: string,
  Rating: string,
  DocView?: ReactNode; 
  ServiceLocation: string
  Status?: string;
  Name: string
}
