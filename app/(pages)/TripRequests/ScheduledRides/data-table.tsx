export const data: Admin[] = [
  {
    id: "REQ_002150",
    Sno: 1,
    Date: "2024-03-30",
    UserName: "ajaj haj",
    DriverName: "amir hosen	",
    TripStatus: "Not Started",
    PayStatus: "Not Paid",
    PaymentOption:'Cash',
    AttemptsForSchedule:0

  },
 ];


export type Admin = {
id: string
Sno: number
TripStatus: string;
PayStatus: string; 
Date: string
DriverName: string;
UserName: string;
PaymentOption:string;
AttemptsForSchedule:number
}
