'use client';

import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import useUser from '@/data/use-user';

import { PulseLoader } from 'react-spinners';
import { signOutApi } from '@/api/user';
import LabFilledIcon from './icons/nav/LabFilledIcon';
import PostFilledIcon from './icons/nav/PostFilledIcon';
import LabIcon from './icons/nav/LabIcon';
import PostOutlineIcon from './icons/nav/PostOutlineIcon';

import conchImage from '../../public/images/conch.png';
import PersonLightIcon from './icons/nav/PersonLightIcon';
import PersonIcon from './icons/nav/PersonIcon';
import SignOutIcon from './icons/nav/SignOutIcon';
import { Tooltip } from '@chakra-ui/react';

const menu = [
    { href: '/', name: 'lab', selected: <LabFilledIcon />, not_selected: <LabIcon /> },
    { href: '/post', name: 'post', selected: <PostFilledIcon />, not_selected: <PostOutlineIcon /> },
];

export default function Navbar() {
    const pathName = usePathname();
    const params = useParams();

    const { user, loading, loggedOut, mutate } = useUser();

    function signOut() {
        signOutApi().then(() => mutate());
    }

    return (
        <div className="flex justify-between items-center px-6 py-2">
            <section className="flex gap-5 items-center ">
                <div className="flex gap-1 items-center ">
                    <Image
                        priority={true}
                        className="w-auto h-auto"
                        src={conchImage}
                        alt="소라고동 이미지"
                        width={25}
                        height={25}
                        sizes="(max-width: 768px) 25px, (max-width: 1200px) 27px, 30px"
                    />
                    {/* <h1 className="font-bold text-xs text-gray-500">마법의 소라고동</h1> */}
                </div>
                <nav>
                    <ul className="flex gap-4 items-center">
                        {menu.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={
                                        `/${pathName.split('/')[1]}` === item.href ? 'font-bold text-teal-600' : ''
                                    }
                                >
                                    {`/${pathName.split('/')[1]}` === item.href ? item.selected : item.not_selected}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
            <section>
                <ul className="flex gap-3 items-center">
                    {loading ? (
                        <PulseLoader color="#b9b9b9" size={7} speedMultiplier={0.5} />
                    ) : loggedOut ? (
                        <>
                            <li>
                                <Link className="cursor-pointer text-xs text-gray-400" href="/sign/signin">
                                    sign in
                                </Link>
                            </li>
                            <li>
                                <Link className="cursor-pointer text-xs text-gray-400" href="/sign/signup">
                                    sign up
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Tooltip label={user.name}>
                                    <Link href="/mypage" className="cursor-pointer">
                                        <>
                                            {`/${pathName.split('/')[1]}` === '/mypage' ? (
                                                <div className="text-teal-600">
                                                    <PersonIcon />
                                                </div>
                                            ) : (
                                                <PersonLightIcon />
                                            )}
                                        </>
                                    </Link>
                                </Tooltip>
                            </li>
                            {/* <li className="font-bold text-xs">{user.name}</li> */}

                            <li onClick={signOut} className="cursor-pointer ">
                                <SignOutIcon />
                            </li>
                        </>
                    )}
                </ul>
            </section>
        </div>
    );
}
