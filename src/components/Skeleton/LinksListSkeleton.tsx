import type { FC } from 'react';

import { SCREEN_SIZES } from '@/constants';
import { useMediaQuery } from '@/utils';

interface Props {
  isHomePageList?: boolean;
  quantity?: number;
}

type TabLinkProps = Pick<Props, 'isHomePageList'>;

const TableLink: FC<TabLinkProps> = ({ isHomePageList }) => {
  const isMobile = useMediaQuery(SCREEN_SIZES.TABLET_SMALL_BELOW);

  const linkContainerClasses = isHomePageList ? 'bg-white rounded-md mb-5' : 'border-b border-gray';

  return (
    <div className={`w-full p-5 flex justify-between items-center ${linkContainerClasses}`}>
      <div className="max-w-xs w-full">
        <div className="max-w-[288px] h-6 animate-pulse bg-lightPink rounded-md mb-1" />
        <div className="max-w-[176px] h-5 mr-5 animate-pulse bg-gray rounded-md" />
      </div>
      {!isMobile && <div className="w-9 shrink-0 h-7 ml-5 animate-pulse bg-gray rounded-md" />}
      <div className="w-4 shrink-0 h-7 ml-5 animate-pulse bg-lightPink rounded-md" />
    </div>
  );
};

const LinksListSkeleton: FC<Props> = ({ isHomePageList = false, quantity = 3 }) => {
  const skeletonList = Array(quantity).fill(1);

  return (
    <>
      {skeletonList.map((_, index) => (
        <TableLink key={index} isHomePageList={isHomePageList} />
      ))}
    </>
  );
};

export default LinksListSkeleton;
