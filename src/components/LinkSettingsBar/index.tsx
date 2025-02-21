import { getCookie, setCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState, type FC } from 'react';

import { SCREEN_SIZES, FLASH_MESSAGE_TYPE, type FullLinkDataProps } from '@/constants';
import { ClipBoard, Heart, Trash } from '@/icons';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import { useMediaQuery, getConfigVariable } from '@/utils';

const DeleteLinkModal = dynamic(() => import('../Modals/DeleteLink'), { ssr: false });

const API_HOST = getConfigVariable('API_HOST');

const LinkSettingsBar: FC<{ link: FullLinkDataProps }> = ({ link }) => {
  const dispatch = useAppDispatch();
  const isSmallMobile = useMediaQuery(SCREEN_SIZES.MOBILE_BELOW);

  const [favoriteList, setFavoriteList] = useState<string[]>(JSON.parse((getCookie('favorite') as string) || '[]'));
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    setCookie('favorite', favoriteList);
  }, [favoriteList]);

  const isFavoriteLink = favoriteList.includes(link.code);
  const formattedDate = new Date(link.createdAt).toDateString();

  const barData = useMemo(
    () => [
      {
        ariaLabel: 'Copy link button',
        fieldTitle: !isSmallMobile && 'Copy',
        fieldFunction: () => {
          navigator.clipboard.writeText(`${API_HOST}/${link.code}`);
          dispatch(addNewFlashMessage({ message: 'Link copied successfully', type: FLASH_MESSAGE_TYPE.SUCCESSFUL }));
        },
        fieldImage: <ClipBoard fill="black" />,
      },
      {
        ariaLabel: 'Delete button',
        fieldTitle: !isSmallMobile && 'Delete',
        fieldFunction: () => setIsDeleteModalOpen(true),
        fieldImage: <Trash fill="black" />,
      },
      {
        ariaLabel: 'Favorite button',
        fieldFunction: () => {
          if (isFavoriteLink) {
            setFavoriteList(favoriteList.filter(item => item !== link.code));
            dispatch(
              addNewFlashMessage({
                message: 'The link has been removed from the favorites list',
                type: FLASH_MESSAGE_TYPE.SUCCESSFUL,
              })
            );
            return null;
          }
          setFavoriteList([...favoriteList, link.code]);
          dispatch(
            addNewFlashMessage({
              message: 'Link has been added to the favorites list',
              type: FLASH_MESSAGE_TYPE.SUCCESSFUL,
            })
          );
        },
        fieldImage: (
          <Heart
            width={24}
            fill={isFavoriteLink ? 'red' : 'none'}
            stroke={isFavoriteLink ? 'red' : 'black'}
            strokeWidth="2"
          />
        ),
      },
    ],
    [isSmallMobile, isFavoriteLink, link.code, dispatch, favoriteList]
  );

  return (
    <>
      <div className="flex justify-between mt-5 gap-2 items-center max-tablet:flex-col-reverse">
        <div className="flex gap-3">
          <div className="border bg-lightOrange/20 border-lightOrange rounded-lg flex items-center px-3">
            Total clicks:
            <p className="bg-lightOrange font-bold p-2 ml-2">{link.clicked}</p>
          </div>
          <p className="border bg-darkGreen/20 border-darkGreen font-bold rounded-lg flex items-center px-3 py-2">
            {formattedDate}
          </p>
        </div>
        <div className="flex justify-end gap-3 items-center">
          {barData.map(({ fieldTitle, fieldFunction, fieldImage, ariaLabel }, index) => (
            <button
              key={fieldTitle + index}
              onClick={fieldFunction}
              aria-label={ariaLabel}
              className="flex border rounded-lg p-2 hover:border-lightPink border-gray hover:bg-pink/10"
            >
              {fieldImage}
              {fieldTitle && <span className="ml-1">{fieldTitle}</span>}
            </button>
          ))}
        </div>
      </div>
      {isDeleteModalOpen && (
        <DeleteLinkModal setIsModalOpen={setIsDeleteModalOpen} deletedLink={link} isStatisticPage={true} />
      )}
    </>
  );
};

export default LinkSettingsBar;
