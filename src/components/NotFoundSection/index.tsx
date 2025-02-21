import Image from 'next/image';
import Link from 'next/link';
import type { FC } from 'react';

interface Props {
  title: string;
  href: string;
  linkText: string;
  linkClassName?: string;
}

const NotFoundSection: FC<Props> = ({ title, href, linkText, linkClassName = '' }) => (
  <div className="text-center">
    <Image src="/images/laptop.png" alt="Not found image" width={200} height={200} className="mx-auto" />
    <h2 className="text-2xl font-bold my-6 mx-auto max-w-xl">{title}</h2>
    <Link href={href} className={linkClassName}>
      {linkText}
    </Link>
  </div>
);

export default NotFoundSection;
