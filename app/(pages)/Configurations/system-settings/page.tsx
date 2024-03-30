import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs as BaseTabs,
  TabsContent as BaseTabsContent,
  TabsList as BaseTabsList,
  TabsTrigger as BaseTabsTrigger,
} from '@/components/ui/tabs';

type Props = {};

export default function Tabs({}: Props) {
    return (
    <BaseTabs defaultValue="account" className="w-full h-full">
      <BaseTabsList className="grid grid-cols-8 h-fit max-lg:grid-cols-3 w-full">
      <BaseTabsTrigger value="WalletSettings">Wallet Settings</BaseTabsTrigger>
        <BaseTabsTrigger value="TripSettings">Trip Settings</BaseTabsTrigger>
        <BaseTabsTrigger value="AppSettings">App Settings</BaseTabsTrigger>
        <BaseTabsTrigger value="Installation">Installation</BaseTabsTrigger>
        <BaseTabsTrigger value="Referral">Referral</BaseTabsTrigger>
        <BaseTabsTrigger value="MapSettings">Map Settings</BaseTabsTrigger>
        <BaseTabsTrigger value="FirebaseSettings">Firebase Settings</BaseTabsTrigger>
        <BaseTabsTrigger value="MailConfiguration" className='max-lg:col-span-2'>Mail Configuration</BaseTabsTrigger>       
        
      </BaseTabsList>
    {/*Wallet Settings */}
      <BaseTabsContent value="WalletSettings">
        <Card>
          <CardHeader>
            <CardTitle>Wallet Settings</CardTitle>
            <CardDescription>
              Make changes to your wallet here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Minimum Wallet Amount For transfer</Label>
              <Input id="name" placeholder="0" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Driver Wallet Minimum Amount To Get An Order</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Owner Wallet Minimum Amount To Get An Order</Label>
              <Input id="username" placeholder="1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </BaseTabsContent>

    {/*Trip Settings */}
      <BaseTabsContent value="TripSettings">
        <Card>
          <CardHeader>
            <CardTitle>Trip Settings</CardTitle>
            <CardDescription>
              Make changes to your Trip here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Driver Search radius in Kilometer</Label>
              <Input id="name" placeholder="0" />
            </div> 
            <div className="space-y-1">
              <Label htmlFor="username">User Can Schedule A Ride After X minutes</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Mininum time for find drivers for schedule rides in minutes</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Maximum Time For Find Drivers For Regular Ride</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Trip Accept/Reject Duration For Driver in Seconds</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Mininum time for find drivers for schedule rides in minutes</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">How Many Times A Driver Can Enable My Route Booking Per Day</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Enable My Route Booking Feature</Label>
              <Input id="username" placeholder="1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </BaseTabsContent>


 {/*App Settings */}
 <BaseTabsContent value="AppSettings">
        <Card>
          <CardHeader>
            <CardTitle>App Settings</CardTitle>
            <CardDescription>
              Make changes to your App here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Navbar Color</Label>
              <Input id="name" placeholder="0" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Side Bar Color</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Side Bar Text Color</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">App Name</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Currency Code</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Currency Symbol</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Default Country Code For Mobile App (eg: Country name: India, as IN )</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Contact Us Mobile</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Contact Us Link</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Show Wallet Feature On Mobile App User</Label>
              <Input id="username" placeholder="1" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </BaseTabsContent>


        {/*Installation */}
      <BaseTabsContent value="Installation">
        <Card>
          <CardHeader>
            <CardTitle>Installation</CardTitle>
            <CardDescription>
              Make changes to your Installation here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* <div className="space-y-1">
              <Label htmlFor="name">Minimum Wallet Amount For transfer</Label>
              <Input id="name" placeholder="0" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Driver Wallet Minimum Amount To Get An Order</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Owner Wallet Minimum Amount To Get An Order</Label>
              <Input id="username" placeholder="1" />
            </div> */}
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </BaseTabsContent>

      
    {/*Referral */}
    <BaseTabsContent value="Referral">
        <Card>
          <CardHeader>
            <CardTitle>Referral</CardTitle>
            <CardDescription>
              Make changes to your referral here. Click save when you&apos;re done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Referral Commison amount for user(eg:1 or 1.5)</Label>
              <Input id="name" placeholder="0" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Referral Commison amount for Driver(eg:1 or 1.5)</Label>
              <Input id="username" placeholder="1" />
            </div>
         
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </BaseTabsContent>

            

      <BaseTabsContent value="MapSettings">
        <Card>
          <CardHeader>
            <CardTitle>Map Settings</CardTitle>
            <CardDescription>
              Change your Map Settings here. After saving, you&apos;ll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label >Google Map Key For Web Apps</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label >Google Map Key For Distance Matrix</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Google Sheet Id</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Default Latitude</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Default Longitude</Label>
              <Input id="username" placeholder="1" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Enable VASE Map</Label>
              <Input id="username" placeholder="1" />
            </div>

          </CardContent>
          <CardFooter>
            <Button>Save</Button>
          </CardFooter>
        </Card>
      </BaseTabsContent>
    </BaseTabs>
  );
}
