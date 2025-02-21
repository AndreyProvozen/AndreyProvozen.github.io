import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import { type FC, useState, useMemo } from 'react';

import { Drover } from '@/atoms';
import { Menu } from '@/icons';

export interface MenuProps {
  name: string;
  link?: string;
  handleFunction?: () => void;
  children?: MenuProps[];
}

interface Props {
  textBlack?: boolean;
}

const MobileHeader: FC<Props> = ({ textBlack }) => {
  const { push } = useRouter();
  const { data: session } = useSession();

  const [isOpenDrover, setIsOpenDrover] = useState(false);

  const handleToggle = () => setIsOpenDrover(prev => !prev);

  const menuMobile: MenuProps[] = useMemo(
    () => [
      { name: 'Home', link: '/' },
      {
        name: 'Links',
        link: '/links',
      },
      session
        ? {
            name: 'My profile',
            children: [
              {
                name: 'Favorite links',
                handleFunction: () => push(`${window.location.origin}/links?search=favorite`),
              },
              {
                name: 'Sign out',
                handleFunction: signOut,
              },
            ],
          }
        : { name: 'Sign in', link: '/auth' },
    ],
    [push, session]
  );

  return (
    <div>
      <Menu onClick={handleToggle} cursor="pointer" className={`${textBlack ? 'fill-black' : 'fill-white'}`} />
      <Drover isOpen={isOpenDrover} handleToggle={handleToggle} menu={menuMobile} />
    </div>
  );
};

export default MobileHeader;
