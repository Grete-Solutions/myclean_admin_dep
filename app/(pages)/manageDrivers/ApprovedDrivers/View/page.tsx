"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSearchParams } from "next/navigation";
import * as React from "react";

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
  userType: string;
};

export default function ApproveDriversDataPage() {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');
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

          // Fetch referred members based on referral code
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
    <React.Suspense fallback={<div>Loading...</div>}>
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
          <div className="w-full grid grid-cols-1 gap-4">
            <h2 className="text-xl font-semibold text-gray-600">Referred Members</h2>
            {referrals.length > 0 ? (
              referrals.map((referral, index) => (
                <div key={index} className="flex flex-col">
                  <Label htmlFor={`ReferralCode${index}`} className="text-left my-3">Member {index+1}</Label>
                  <Label htmlFor={`ReferralFirstName${index}`} className="text-left">First Name</Label>
                  <Input id={`ReferralFirstName${index}`} value={referral.firstname} className="w-full" readOnly />
                  <Label htmlFor={`ReferralLastName${index}`} className="text-left">Last Name</Label>
                  <Input id={`ReferralLastName${index}`} value={referral.lastname} className="w-full" readOnly />
                  <Label htmlFor={`ReferralCreatedAt${index}`} className="text-left">Created At</Label>
                  <Input
                    id={`ReferralCreatedAt${index}`}
                    value={referral.createdAt ? new Date(referral.createdAt._seconds * 1000).toLocaleString() : ''}
                    className="w-full"
                    readOnly
                  />
                </div>
              ))
            ) : (
              <div>No referred members found</div>
            )}
          </div>
        </div>
      </div>
    </div>
    </React.Suspense>
  );
}
