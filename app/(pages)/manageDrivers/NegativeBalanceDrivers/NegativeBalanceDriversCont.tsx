import { File } from "lucide-react";
import { ReactNode } from "react";

export const data: ApprovePendingConst[] = [
    {
      id: "kjsdgj",
      ServiceLocation: "Service Location",
      Name: "Daniel J",
      Status: "Approved",
      WalletBalance: -4324324.3,
      Email:'',
      Mobile:'',
      DeclinedReason:'',
      Rating:'',
      Type:'SUV'
    },
   
  ];
  

export type ApprovePendingConst = {
  id: string,
  Type: string,
  Email: string,
  Mobile: string,
  DeclinedReason: string,
  Rating: string,
  WalletBalance?: number; 
  ServiceLocation: string
  Status?: string;
  Name: string
}
