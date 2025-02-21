import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import type { Dispatch, FC, SetStateAction } from 'react';

import { ModalWrapper } from '@/atoms';
import { FLASH_MESSAGE_TYPE, type LinkDataProps } from '@/constants';
import { useDeleteLinkMutation } from '@/store/api/links.api';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import { getConfigVariable } from '@/utils';

interface Props {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  deletedLink?: LinkDataProps;
  isStatisticPage?: boolean;
}

const API_HOST = getConfigVariable('API_HOST');

const DeleteLinkModal: FC<Props> = ({ setIsModalOpen, deletedLink, isStatisticPage }) => {
  const { data: session } = useSession();
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const [deleteLink] = useDeleteLinkMutation();

  const shortLink = `${API_HOST}/${deletedLink?.code}`;

  const handleDeleteLink = async () => {
    const response = await deleteLink({ code: deletedLink?.code, userEmail: session?.user?.email });

    dispatch(
      addNewFlashMessage(
        'error' in response && 'data' in response.error
          ? { message: response.error.data as string, type: FLASH_MESSAGE_TYPE.ERROR }
          : { message: 'Shortened link successfully added', type: FLASH_MESSAGE_TYPE.SUCCESSFUL }
      )
    );

    if (isStatisticPage) return push('/links');

    setIsModalOpen(false);
  };

  return (
    <ModalWrapper title="Delete link" setIsModalOpen={setIsModalOpen} onConfirm={handleDeleteLink}>
      <div className="py-4 px-8">
        <p>You really want to delete this link?</p>
        <Link target="_blank" href={shortLink} className="text-darkPink hover:text-pink">
          {shortLink}
        </Link>
      </div>
    </ModalWrapper>
  );
};
export default DeleteLinkModal;
