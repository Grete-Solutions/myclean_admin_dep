"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type ApprovedData = {
  firstname: string;
  lastname: string;
  phone: string;
  userType: number;
  email: string;
  referral: string;
  referredBy: string;
  address: string;
  profilePicture: string;
  vehicleDetails: {
    vehicleColor: string;
    vehicleLicenseNumber: string;
    vehicleMake: string;
  };
  documents: {
    driverPhoto: string;
    idCard: string;
    driverLicense: string;
  };
  balance: string;
  city: string;
};

type ReferralData = {
  firstname: string;
  lastname: string;
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  userType: number;
};

interface BookingData {
  user: string;
  actualPrice: number;
  netPrice: number;
  status: string;
  createdAt?: {
    _seconds: number;
    _nanoseconds: number;
  };
  pickupLocation: {
    _latitude: number;
    _longitude: number;
  };
  address?: string; // Adding address field for display
}

export default function ViewDriverPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApproveDriversDataPage />
    </Suspense>
  );
}

const ApproveDriversDataPage = () => {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [count, setCount] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [referral, setReferral] = React.useState('');
  const [referredBy, setReferredBy] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [balance, setBalance] = React.useState('');
  const [city, setCity] = React.useState('');
  const [vehicleDetails, setVehicleDetails] = React.useState({
    vehicleColor: '',
    vehicleLicenseNumber: '',
    vehicleMake: '',
  });
  const [documents, setDocuments] = React.useState({
    driverPhoto: '',
    idCard: '',
    driverLicense: '',
  });
  const [data, setData] = React.useState<ApprovedData | null>(null);
  const [referrals, setReferrals] = React.useState<ReferralData[]>([]);
  const [bookings, setBookings] = React.useState<BookingData[]>([]);
  const params = useSearchParams();
  const id = params.get('id');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/lib/GET/Driver/getDriverById?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        if (data && data.product) {
          const driverData = data.product;
          setData(driverData);
          setEmail(driverData.email);
          setFirstname(driverData.firstname);
          setLastname(driverData.lastname);
          setPhone(driverData.phone);
          setAddress(driverData.pickup_address);
          setReferredBy(driverData.referredBy);
          setReferral(driverData.referral);
          setCity(driverData.city);
          setBalance(driverData.balance);
          setProfilePicture(driverData.documents.driverPhoto);
          setVehicleDetails(driverData.vehicleDetails);
          setDocuments(driverData.documents);

          const referralResponse = await fetch(`/lib/GET/Driver/getReferralByCode?code=${driverData.referral}`);
          if (!referralResponse.ok) {
            throw new Error('Failed to fetch referral data');
          }
          const referralData = await referralResponse.json();
          if (referralData && referralData.product) {
            setReferrals(referralData.product);
          } else {
            setReferrals([]);
          }

          const bookingResponse = await fetch(`/lib/GET/Driver/getDriverBookingById?id=${id}`);
          if (!bookingResponse.ok) {
            throw new Error('Failed to fetch booking data');
          }
          const bookingData = await bookingResponse.json();
          if (bookingData && bookingData.product) {
            // Fetch addresses for each booking
            const bookingsWithAddresses = await Promise.all(
              bookingData.product.map(async (booking: BookingData) => {
                let address = '';
                try {
                  address = await getAddressFromCoordinates(
                    booking.pickupLocation._latitude,
                    booking.pickupLocation._longitude
                  );
                } catch (error) {
                  console.error('Error fetching address:', error);
                  address = `Lat: ${booking.pickupLocation._latitude}, Lon: ${booking.pickupLocation._longitude}`;
                }
                return { ...booking, address };
              })
            );
            setBookings(bookingsWithAddresses);
          } else {
            setBookings([]);
          }

          const countResponse = await fetch(`/lib/GET/Driver/getDriverBookingByCount?id=${id}`);
          if (!countResponse.ok) {
            throw new Error('Failed to fetch count data');
          }
          const countData = await countResponse.json();
          if (countData && countData.product) {
            setCount(countData.product.count);
          }
        } else {
          setData(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch address');
      }
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Error fetching address:', error);
      throw new Error('Failed to fetch address');
    }
  };

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full h-full p-4">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-600">User Profile</h2>
          {profilePicture ? (
            <img
              src={profilePicture}
              alt={`${firstname} ${lastname}`}
              className="w-32 h-32 rounded-full"
            />
          ) : (
            <img
              src="https://media.istockphoto.com/id/1345002600/vector/gender-neutral-profile-avatar-front-view-of-an-anonymous-person-face.jpg?s=612x612&w=0&k=20&c=082qj-lppYxoHZkDETLvwLSwt1WaTiRgRaaQDcsdbfg="
              alt={`${firstname} ${lastname}`}
              className="w-32 h-32 shadow-xl rounded-full"
            />
          )}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <Label htmlFor="FirstName" className="text-left">First Name</Label>
              <Input id="FirstName" value={firstname} className="w-full" readOnly />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="LastName" className="text-left">Last Name</Label>
              <Input id="LastName" value={lastname} className="w-full" readOnly />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="Phone" className="text-left">Phone Number</Label>
              <Input id="Phone" value={phone} className="w-full" readOnly />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="Email" className="text-left">Email</Label>
              <Input id="Email" value={email} className="w-full" readOnly />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="Address" className="text-left">Address</Label>
              <Input id="Address" value={address} className="w-full" readOnly />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="Balance" className="text-left">Balance</Label>
              <Input id="Balance" value={balance} className="w-full" readOnly />
            </div>
            <div className="flex flex-col">
              <Label htmlFor="City" className="text-left">City</Label>
              <Input id="City" value={city} className="w-full" readOnly />
            </div>
            <div className="sm:col-span-2 grid gap-4">
              <h2 className="text-xl font-semibold text-gray-600">Vehicle Details</h2>
              <div className="flex flex-col">
                <Label htmlFor="VehicleColor" className="text-left">Vehicle Color</Label>
                <Input id="VehicleColor" value={vehicleDetails.vehicleColor} className="w-full" readOnly />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="VehicleLicenseNumber" className="text-left">Vehicle License Number</Label>
                <Input id="VehicleLicenseNumber" value={vehicleDetails.vehicleLicenseNumber} className="w-full" readOnly />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="VehicleMake" className="text-left">Vehicle Make</Label>
                <Input id="VehicleMake" value={vehicleDetails.vehicleMake} className="w-full" readOnly />
              </div>
            </div>
            <div className="sm:col-span-2 grid-cols-1 sm:grid-cols-2">
              <h2 className="text-xl font-semibold text-gray-600">Documents</h2>
              <div className="flex flex-col m-4">
                <Label htmlFor="IdCard" className="text-left">ID Card</Label>
                <iframe src={documents.idCard} className="w-64 h-32" />
              </div>
              <div className="flex m-4 flex-col">
                <Label htmlFor="DriverLicense" className="text-left">Driver License</Label>
                <iframe id="DriverLicense" src={documents.driverLicense} className="w-64 h-32 border-none" />
              </div>
            </div>
            <div className="sm:col-span-2 gap-4 grid-cols-1 sm:grid-cols-2">
              <h2 className="text-xl font-semibold text-gray-600">Referral Details</h2>
              <div className="flex flex-col">
                <Label htmlFor="Referral" className="text-left">Referral</Label>
                <Input id="Referral" value={referral} className="w-full" readOnly />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="ReferredBy" className="text-left">Referred By</Label>
                <Input id="ReferredBy" value={referredBy} className="w-full" readOnly />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 col-span-2 gap-4">
              <h2 className="text-xl font-semibold text-gray-600">Referred Members</h2>
              {referrals.length > 0 ? (
                <Table className="w-full">
                  <TableCaption>A list of referred members.</TableCaption>
                  <TableHeader className="w-full">
                    <TableRow>
                      <TableHead>First Name</TableHead>
                      <TableHead>Last Name</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>User Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {referrals.map((referral, index) => (
                      <TableRow key={index}>
                        <TableCell>{referral.firstname}</TableCell>
                        <TableCell>{referral.lastname}</TableCell>
                        <TableCell>
                          {referral.createdAt ? new Date(referral.createdAt._seconds * 1000).toLocaleString() : ''}
                        </TableCell>
                        <TableCell>
                          {referral.userType === 0 ? 'User' : referral.userType === 1 ? 'Driver' : ''}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>No referred members found</div>
              )}
            </div>

            <div className="w-full grid grid-cols-1 col-span-2 gap-4">
              <h2 className="text-xl font-semibold text-gray-600">Driver Bookings({count})</h2>
              {bookings.length > 0 ? (
                <Table className="w-full">
                  <TableCaption>A list of Bookings</TableCaption>
                  <TableHeader className="w-full">
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Actual Price</TableHead>
                      <TableHead>Net Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Pickup Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((book, index) => (
                      <TableRow key={index}>
                        <TableCell>{book.user}</TableCell>
                        <TableCell>{book.actualPrice}</TableCell>
                        <TableCell>{book.netPrice}</TableCell>
                        <TableCell>{book.status}</TableCell>
                        <TableCell>
                          {book.createdAt ? new Date(book.createdAt._seconds * 1000).toLocaleString() : ''}
                        </TableCell>
                        <TableCell>{book.address || `Lat: ${book.pickupLocation._latitude}, Lon: ${book.pickupLocation._longitude}`}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div>No bookings found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};
