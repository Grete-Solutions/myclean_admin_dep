export const data: Admin[] = [
  {
    id: "REQ_002150",
    Sno: 1,
    Date: "2024-03-30",
    UserName: "ajaj haj",
    DriverName: "amir hosen	",
    CancelledBy: "",
    CancellationReason:"",
    CancellationFee:"",
    PayStatus: "Paid"
  },
 ];


export type Admin = {
id: string
Sno: number
CancelledBy: string;
PayStatus: string; 
Date: string;
CancellationReason:string;
CancellationFee:string
DriverName: string;
UserName: string
}
