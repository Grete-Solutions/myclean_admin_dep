"use client";
import { useSideBarToggle } from '@/hooks/use-sidebar-toggle';
import { SideNavItem } from '@/types/type';
import classNames from 'classnames';
import { Circle } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react'
import { BsChevronRight } from 'react-icons/bs';

export const SideBarMenuItem = ({ item }: { item: SideNavItem }) => {

    const { toggleCollapse } = useSideBarToggle();

    const pathname = usePathname();

    const [subMenuOpen, setSubMenuOpen] = useState(false);

    const toggleSubMenu = () => {
        setSubMenuOpen(!subMenuOpen);
    };

    const inactiveLink = classNames("flex items-center min-h-[40px] h-full text-sidebar-foreground py-2 px-4 hover:text-sidebar-muted-foreground  hover:bg-[#0A8791] rounded-md transition duration-200",
        { ["justify-center"]: toggleCollapse }
    );

    const activeLink = classNames(" text-white bg-[#0A8791]");

    const navMenuDropdownItem = "text-red py-2 px-4 hover:text-sidebar-muted-foreground hover:bg-[#0A8791] transition duration-200 rounded-md"

    const dropdownMenuHeaderLink = classNames(inactiveLink,
        {
            ["bg-sidebar-muted rounded-b-none"]: subMenuOpen
        }
    );
    return (
        <>
            {item.submenu ? (
                <div className="min-w-[18px]">
                    <a className={`${dropdownMenuHeaderLink} ${pathname.includes(item.path) ? activeLink : ''}`}
                        onClick={toggleSubMenu}>
                        <div className='min-w-[20px]'>{item.icon}</div>
                        {!toggleCollapse && <>
                            <span className='ml-3 text-base leading-6 font-semibold'>{item.title}</span>
                            <BsChevronRight className={`${subMenuOpen ? 'rotate-90' : ''} ml-auto stroke-2 text-xs`} />
                        </>
                        }
                    </a>
                    {subMenuOpen && !toggleCollapse && (
                        <div className='bg-sidebar-muted border-l-4'>
                            <div className='grid gap-y-2 px-10 leading-5 py-3'>
                                {item.subMenuItems?.map((subItem, idx) => {
                                    return (
                                        <Link
                                            key={idx}
                                            href={subItem.path}
                                            className={`flex space-x-1 items-center ${navMenuDropdownItem} ${subItem.path === pathname ? ' text-white font-medium ' : ' text-sidebar-foreground'}`}
                                        >
                                                <Circle size={16}/>
                                            <span>{subItem.title}</span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>)
                    }
                </div>
            ) :
                (<Link href={item.path} className={`${inactiveLink} ${item.path === pathname ? activeLink : ''}`}>
                    <div className='min-w-[20px]'>{item.icon}</div>
                    {!toggleCollapse && (<span className="ml-3 leading-6 font-semibold">{item.title}</span>)}
                </Link>)}
        </>
    );
};