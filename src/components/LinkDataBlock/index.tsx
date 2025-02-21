import { getCookie, setCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { type FC, useEffect, useState } from 'react';

import { SCREEN_SIZES, FLASH_MESSAGE_TYPE, type LinkDataProps } from '@/constants';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import { getConfigVariable, useMediaQuery } from '@/utils';

import SettingsDropDown from './SettingsDropDown';

const DeleteLinkModal = dynamic(() => import('@/components/Modals/DeleteLink'), { ssr: false });
const Pagination = dynamic(() => import('@/atoms/Pagination'), { ssr: false });

interface Props {
  linksList: LinkDataProps[];
  count?: number;
  perPage?: number;
  linkContainerClasses?: string;
  showFiltersAndPagination?: boolean;
}

const API_HOST = getConfigVariable('API_HOST');

const LinkDataBlock: FC<Props> = ({ linksList, count, perPage, linkContainerClasses, showFiltersAndPagination }) => {
  const isMobile = useMediaQuery(SCREEN_SIZES.TABLET_SMALL_BELOW);
  const dispatch = useAppDispatch();

  const [favoriteList, setFavoriteList] = useState<string[]>(JSON.parse((getCookie('favorite') as string) || '[]'));
  const [deletedLink, setDeletedLink] = useState<LinkDataProps | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setCookie('favorite', favoriteList);
  }, [favoriteList]);

  const toggleFavorite = (isFavoriteLink: boolean, code: string) => {
    if (isFavoriteLink) {
      setFavoriteList(prev => prev.filter(item => item !== code));
      dispatch(
        addNewFlashMessage({
          message: 'The link has been removed from the favorites list',
          type: FLASH_MESSAGE_TYPE.SUCCESSFUL,
        })
      );

      return null;
    }

    setFavoriteList(prev => [...prev, code]);
    dispatch(
      addNewFlashMessage({
        message: 'Link has been added to the favorites list',
        type: FLASH_MESSAGE_TYPE.SUCCESSFUL,
      })
    );
  };

  return (
    <>
      <div className="text-start">
        {linksList.map((linkData, index) => {
          const isFavoriteLink = favoriteList.includes(linkData.code);

          return (
            <div
              key={linkData.code + index}
              className={`flex items-center justify-between p-5 ${linkContainerClasses}`}
            >
              <div className="flex flex-col w-full max-w-md">
                <Link
                  target={!showFiltersAndPagination ? '_blank' : '_self'}
                  href={`${!showFiltersAndPagination ? `${API_HOST}/${linkData.code}` : `/links/${linkData.code}`}`}
                  className="text-darkPink hover:text-pink cursor-pointer line-clamp-1 break-all"
                >
                  {API_HOST}/{linkData.code}
                </Link>
                <p className="max-w-sm text-black/60 line-clamp-1 break-all text-sm">{linkData.url}</p>
              </div>
              {!isMobile && (
                <>
                  <div className="pr-10 pl-5">{linkData.clicked}</div>
                  <svg
                    onClick={() => toggleFavorite(isFavoriteLink, linkData.code)}
                    viewBox="0 0 24 24"
                    width="24px"
                    className="ml-auto cursor-pointer hover:scale-110 transition-all"
                  >
                    <use href={isFavoriteLink ? '#heart-icon' : '#heart-outline-icon'} />
                  </svg>
                </>
              )}
              <SettingsDropDown
                data={linkData}
                setIsModalOpen={setIsDeleteModalOpen}
                setIsDeleteModalOpen={setDeletedLink}
              />
            </div>
          );
        })}
        {showFiltersAndPagination && count > perPage && <Pagination count={count} perPage={perPage} />}
      </div>
      {isDeleteModalOpen && (
        <DeleteLinkModal key={deletedLink?.code} setIsModalOpen={setIsDeleteModalOpen} deletedLink={deletedLink} />
      )}
    </>
  );
};

export default LinkDataBlock;
