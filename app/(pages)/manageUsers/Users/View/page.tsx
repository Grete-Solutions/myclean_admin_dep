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
  driver: string;
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

export default function ViewUserPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApproveUsersDataPage />
    </Suspense>
  );
}

const ApproveUsersDataPage = () => {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [referral, setReferral] = React.useState('');
  const [referredBy, setReferredBy] = React.useState('')
  const [referralFname, setReferralFname] = React.useState('');
  const [referralLname, setReferralLname] = React.useState('');
  const [userCount, setUserCount]= React.useState('');
  const [count, setCount] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [data, setData] = React.useState<ApprovedData | null>(null);
  const [referrals, setReferrals] = React.useState<ReferralData[]>([]);
  const params = useSearchParams();
  const [bookings, setBookings] = React.useState<BookingData[]>([]);

  const id = params.get('id');

  React.useEffect(() => {
    const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch address');
        }
        const data = await response.json();
        return data.display_name || 'Address not found';
      } catch (error) {
        console.error('Error fetching address:', error);
        // Return a string representation of latitude and longitude
        return `(${latitude}, ${longitude})`;
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(`/lib/GET/User/getUserById?id=${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const userData = await response.json();
        if (userData && userData.product) {
          const user = userData.product;
          setData(user);
          setEmail(user.email);
          setFirstname(user.firstname);
          setLastname(user.lastname);
          setPhone(user.phone);
          setAddress(user.address);
          setReferredBy(user.referredBy);
          setReferral(user.referral);
          setProfilePicture(user.profilePicture);

          // Fetch referred members based on referral code
          const referralResponse = await fetch(`/lib/GET/User/getReferralByCode?code=${user.referral}`);
          if (!referralResponse.ok) {
            throw new Error('Failed to fetch referral data');
          }
          const referralData = await referralResponse.json();
          if (referralData && referralData.product) {
            setReferrals(referralData.product);
          } else {
            setReferrals([]);
          }

          const namereferralResponse = await fetch(`/lib/GET/User/getUserByReferral?code=${userData.referredBy}`);
          if (!namereferralResponse.ok) {
            throw new Error('Failed to fetch referral data');
          }
          const namereferralData = await namereferralResponse.json();
          if (namereferralData && namereferralData.product) {
            setReferralFname(namereferralData.product.firstname);
            setReferralLname(namereferralData.product.lastname);
          } else {
            setReferrals([]);
          }

          // Fetch bookings
          const bookingResponse = await fetch(`/lib/GET/User/getUserBookingById?id=${id}`);
          if (!bookingResponse.ok) {
            throw new Error('Failed to fetch booking data');
          }
          const bookingData = await bookingResponse.json();
          if (bookingData && bookingData.product) {
            const bookingsWithAddress = await Promise.all(
              bookingData.product.map(async (booking: BookingData) => {
                let address;
                try {
                  address = await getAddressFromCoordinates(
                    booking.pickupLocation._latitude,
                    booking.pickupLocation._longitude
                  );
                } catch (error) {
                  console.error('Error fetching address for booking:', error);
                  address = `(${booking.pickupLocation._latitude}, ${booking.pickupLocation._longitude})`;
                }
                return { ...booking, address };
              })
            );
            setBookings(bookingsWithAddress);
          } else {
            setBookings([]);
          }
          const usercountResponse = await fetch(`/lib/GET/User/getReferralByCount?code=${userData.referral}`);
          if (!usercountResponse.ok) {
            throw new Error('Failed to fetch referral data');
          }
          const usercountData = await usercountResponse.json();
          if (usercountData && usercountData.product.Downline) {
            setUserCount(usercountData.product.Downline);
          }
          // Fetch booking count
          const countResponse = await fetch(`/lib/GET/User/getUserBookingByCount?id=${id}`);
          if (!countResponse.ok) {
            throw new Error('Failed to fetch booking count');
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

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <Suspense>
      <div className="w-full p-4">
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
            <div className="flex flex-col sm:col-span-2">
              <Label htmlFor="Address" className="text-left">Address</Label>
              <Input id="Address" value={address} className="w-full" readOnly />
            </div>
            <div className="sm:col-span-2 grid grid-cols-1 gap-4">
              <h2 className="text-xl font-semibold text-gray-600">Referral Details</h2>
              <div className="flex flex-col">
                <Label htmlFor="Referral" className="text-left">Referral</Label>
                <Input id="Referral" value={referral} className="w-full" readOnly />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="ReferredBy" className="text-left">Referred By</Label>
                <Input id="ReferredBy" value={referralFname} className="w-full " readOnly />
              </div>
            </div>
            <div className="w-full grid grid-cols-1 col-span-2 gap-4">
              <h2 className="text-xl font-semibold text-gray-600">Referred Users - {userCount}</h2>
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
                          {referral.userType === 0 ?
                            "Member" : "Driver"}
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
              <h2 className="text-xl font-semibold text-gray-600">Booking History- {count}</h2>
              {bookings.length > 0 ? (
                <Table className="w-full">
                  <TableCaption>A list of bookings.</TableCaption>
                  <TableHeader className="w-full">
                    <TableRow>
                      <TableHead>Driver</TableHead>
                      <TableHead>Actual Price</TableHead>
                      <TableHead>Net Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Address</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking, index) => (
                      <TableRow key={index}>
                        <TableCell>{booking.driver}</TableCell>
                        <TableCell>{booking.actualPrice}</TableCell>
                        <TableCell>{booking.netPrice}</TableCell>
                        <TableCell>{booking.status}</TableCell>
                        <TableCell>
                          {booking.createdAt ? new Date(booking.createdAt._seconds * 1000).toLocaleString() : ''}
                        </TableCell>
                        <TableCell>{booking.address}</TableCell>
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

