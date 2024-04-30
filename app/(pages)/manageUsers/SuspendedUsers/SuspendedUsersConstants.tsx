import { File } from "lucide-react";
import { ReactNode } from "react";

export const data: SuspendedUsersConst[] = [
    {
      id: "kjsdgj",
      ServiceLocation: "Service Location",
      Name: "Daniel J",
      Status: "Suspended",
      DocView: <File/>,
      Email:'',
      Mobile:'',
      SuspendedReason:'',
      Rating:'',
      Type:'SUV'
    },
   
  ];
  

export type SuspendedUsersConst = {
  id: string,
  Type: string,
  Email: string,
  Mobile: string,
  SuspendedReason: string,
  Rating: string,
  DocView?: ReactNode; 
  ServiceLocation: string
  Status?: string;
  Name: string
}
