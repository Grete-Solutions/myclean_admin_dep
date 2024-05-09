import { useTheme } from "next-themes";
import Image from "next/image"

export const LoginLogo=()=>
{
    const { theme } = useTheme();
return <Image width={35} alt="" className="mx-auto h-10 w-auto"
height={35} src={theme === 'dark' || theme === 'custom' ? '/g1.png' : '/a1.png'}/>
}