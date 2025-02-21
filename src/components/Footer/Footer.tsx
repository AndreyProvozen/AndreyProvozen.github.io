import Link from 'next/link';
import type { FC } from 'react';

import { GitHub, Instagram, Steam } from '@/icons';

import CredentialsSection from './CredentialsSection';

interface Props {
  containerClasses?: string;
}

export const SOCIAL_LINKS_DATA = [
  { icon: <GitHub fill="white" />, href: 'https://github.com/AndreyProvozen', ariaLabel: 'Link to GitHub' },
  { icon: <Instagram />, href: '/', ariaLabel: 'Link to Instagram' },
  { icon: <Steam />, href: '', ariaLabel: 'Link to Steam' },
];

const Footer: FC<Props> = ({ containerClasses = '' }) => (
  <div className={`bg-lightBlack text-white ${containerClasses}`}>
    <div className="container max-mobile:flex-col-reverse max-w-screen-desktop flex justify-between px-5 items-center py-5 mx-auto">
      <p className="text-3xl font-extrabold" translate="no">
        Link Shortener
      </p>
      <div className="flex">
        {SOCIAL_LINKS_DATA.map(({ icon, href, ariaLabel }) => (
          <Link
            target="_blank"
            href={href}
            className="mr-3 hover:[&>svg]:fill-lightPink"
            key={ariaLabel}
            aria-label={ariaLabel}
          >
            {icon}
          </Link>
        ))}
      </div>
    </div>
    <CredentialsSection />
  </div>
);

export default Footer;
