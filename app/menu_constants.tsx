import { SideNavItemGroup } from "@/types/type";
import { Car, GitBranch, LocateFixed, LucideSidebarClose, Speaker, Ticket } from "lucide-react";
import { BsCash, BsChat, BsDoorClosed, BsEnvelope, BsFile, BsGear, BsHouseDoor, BsKanban, BsListUl, BsPeople, BsPersonFillCheck, BsQuestionCircle, BsX } from "react-icons/bs";



export const SIDENAV_ITEMS: SideNavItemGroup[] = [

    {
        title: "Dashboards",
        menuList: [{
            title: 'Dashboard',
            path: '/',
            icon: <BsHouseDoor size={20} />,
            
        },
        {
            title: 'Configurations',
            path: '/Configurations',
            icon: <BsGear size={20} />,
            submenu: true,
            subMenuItems: [
                { title: 'Priveleges', path: '/Configurations/priveleges' },
                { title: 'System Settings', path: '/Configurations/system-settings' },
                // { title: 'Translations', path: '/Configurations/translations' },
            ],
        },
    
    ],
        
    },
    {
        title: "Manage",
        menuList: [
            {
                title: 'Master Data',
                path: '/MasterData',
                icon: <GitBranch size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'Vehicle Make', path: '/MasterData/VehicleMake' },
                    { title: 'Vehicle Model', path: '/MasterData/VehicleModel' },
                    { title: 'Country', path: '/MasterData/Country' },
                    { title: 'Driver Needed Documentation', path: '/MasterData/DriverNeededDocumentation' },
                
                ],
            },
            {
                title: 'Service Locations',
                path: '/serviceLocations',
                icon: <LocateFixed size={20} />,
            },
            {
                title: 'Admins',
                path: '/Admin',
                icon: <BsPersonFillCheck size={20} />,
            },
            {
                title: 'Trip Requests',
                path: '/TripRequests',
                icon: <Ticket size={20} />,
                submenu: true,
                subMenuItems: [
                    { title: 'Completed Rides', path: '/TripRequests/CompletedRides' },
                    { title: 'Scheduled rides', path: '/Trip Requests/ScheduledRides' },
                    { title: 'Cancelled rides', path: '/Trip Requests/CancelledRides'},
                ],
            },
            {
                title: 'Vehicle Types',
                path: '/vehicleTypes',
                icon: <Car size={20} />,
            },
            {
                title: 'Manage Drivers',
                path: '/manageDrivers',
                icon: <BsPeople size={20} />,
                submenu: true,
                subMenuItems: [
                    {title: 'Approved Drivers', path: '/Trip Requests' },
                    {title: 'Approved Pending Drivers', path: '/Trip Requests' },
                    {title: 'Driver Ratings', path: '/Trip Requests' },
                    {title: 'Withdrawal Requests', path: '/Trip Requests' },
                    {title: 'Negative Balance Drivers', path: '/Trip Requests' },
               ],
            },
               {
                        title: 'Set Price',
                        path: '/setPrice',
                        icon: <BsCash size={20} />,
                        submenu: true,
                        subMenuItems: [
                            {title: 'World', path: '/Trip Requests' },
                       ],
                    },
        ]
    },
    {
        title: "Others",
                menuList: [
                 
            {
                title: 'Chat',
                path: '/Chat',
                icon: <BsChat size={20} />,
            },
            {
                title: 'Notification',
                path: '/Notification',
                icon: <Speaker size={20} />,
            },
            {
                title: 'Promo Code',
                path: '/Promo Code',
                icon: <BsQuestionCircle size={20} />,
            },
            {
                title: 'Cancellation',
                path: '/Cancellation',
                icon: <BsX size={20} />,
            },
            {
                title: 'Complaints',
                path: '/Complaints',
                icon: <BsQuestionCircle size={20} />,
            },
            {
                title: 'Report',
                path: '/Report',
                icon: <BsFile size={20} />,
            }
        ]
    }

];