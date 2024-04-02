export const data: Admin[] = [
  {
    id: "REQ_002150",
    Sno: 1,
    Date: "2024-03-30",
    UserName: "ajaj haj",
    DriverName: "amir hosen	",
    TripStatus: "Completed",
    PayStatus: "Paid"

  },
  {
    id: "REQ_02150",
    Sno: 1,
    Date: "2024-03-30",
    UserName: "peter haj",
    DriverName: "amir hosen	",
    TripStatus: "Completed",
    PayStatus: "Paid"

  },
  {
    id: "REQ_003150",
    Sno: 1,
    Date: "2024-03-30",
    UserName: "kjhkj haj",
    DriverName: "amir hosen	",
    TripStatus: "Completed",
    PayStatus: "Paid"

  },
 ];


export type Admin = {
id: string
Sno: number
TripStatus: string;
PayStatus: string; 
Date: string
DriverName: string;
UserName: string
}
