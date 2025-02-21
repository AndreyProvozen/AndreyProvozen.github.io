import { type Dispatch, type FC, type ReactElement, type SetStateAction } from 'react';

import { classNames } from '@/utils';

import { DROPDOWN_TEST_IDS } from './testIds';

export interface DropdownDataProps {
  fieldTitle?: string;
  fieldFunction?: () => void;
  fieldImage?: ReactElement;
  customField?: ReactElement;
}

interface Props {
  dropdownData: DropdownDataProps[];
  listContainerClasses: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownPopUp: FC<Props> = ({ dropdownData, listContainerClasses, setIsOpen }) => {
  const handleFunction = (fieldFunction: DropdownDataProps['fieldFunction']) => {
    fieldFunction();
    setIsOpen(false);
  };

  return (
    <div
      data-testid={DROPDOWN_TEST_IDS.POPUP_ROOT}
      className={`${listContainerClasses} absolute rounded-lg bg-lightBlack px-4 pt-4 mt-4 z-10`}
    >
      {dropdownData.map(({ fieldTitle, fieldFunction, fieldImage, customField }, i) => (
        <div data-testid={DROPDOWN_TEST_IDS.POPUP_ITEM} key={`${fieldTitle}${i}`}>
          {customField || (
            <button
              className={classNames('group flex items-center border-b-2 border-pink py-4 w-full text-start', {
                'first:pt-0': i === 0,
                'last:border-0': i === dropdownData.length - 1,
              })}
              onClick={() => handleFunction(fieldFunction)}
            >
              {Boolean(fieldImage) && (
                <div
                  data-testid={DROPDOWN_TEST_IDS.POPUP_ITEM_IMAGE}
                  className="mr-3 group-hover:[&>svg]:fill-lightPink [&>svg]:w-6 [&>svg]:h-6"
                >
                  {fieldImage}
                </div>
              )}
              <p className="m-0 text-xl group-hover:text-lightPink">{fieldTitle}</p>
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropdownPopUp;
