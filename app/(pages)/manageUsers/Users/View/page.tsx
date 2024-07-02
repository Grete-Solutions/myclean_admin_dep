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

export default function ApproveUsersDataPage() {
  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [referral, setReferral] = React.useState('');
  const [referredBy, setReferredBy] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [profilePicture, setProfilePicture] = React.useState('');
  const [data, setData] = React.useState<ApprovedData | null>(null);
  const [referrals, setReferrals] = React.useState<ReferralData[]>([]);
  const params = useSearchParams();
  const id = params.get('id');

  React.useEffect(() => {
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
              <Input id="ReferredBy" value={referredBy} className="w-full " readOnly />
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
  );
}
