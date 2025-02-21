import dynamic from 'next/dynamic';
import Image from 'next/image';
import { type FormEvent, type ChangeEvent, useState } from 'react';

import { Header, InfoBlock, LinkDataBlock, QualityBlock } from '@/components';
import LinksListSkeleton from '@/components/Skeleton/LinksListSkeleton';
import { FLASH_MESSAGE_TYPE } from '@/constants';
import { MOCK_TEXT_WITH_IMAGE, MOCK_QUESTIONS } from '@/constants/mock';
import { useAddNewLinkMutation, useGetLinksQuery } from '@/store/api/links.api';
import { addNewFlashMessage } from '@/store/slices/flashMessages.slice';
import { useAppDispatch } from '@/store/storeHooks';
import { classNames, useIntersectionObserver } from '@/utils';

const TextWithImage = dynamic(() => import('@/components/TextWithImage'), { ssr: false });
const Accordion = dynamic(() => import('@/atoms/Accordion'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });

const Home = () => {
  const { elementRef: textWithImageRef, isVisible: isTextWithImageVisible } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { elementRef: bottomSectionRef, isVisible: isBottomSectionVisible } = useIntersectionObserver({
    threshold: 0.1,
  });
  const { elementRef: logoAnimationRef, isVisible: isLogoAnimationVisible } = useIntersectionObserver({
    threshold: 0.3,
  });

  const dispatch = useAppDispatch();
  const { data: linkData, isLoading } = useGetLinksQuery({ perPage: 4 });
  const [addNewLink] = useAddNewLinkMutation();

  const [longLink, setLongLink] = useState('');

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await addNewLink({ url: longLink });

    setLongLink('');
    dispatch(
      addNewFlashMessage(
        'error' in response && 'data' in response.error
          ? { message: response.error.data as string, type: FLASH_MESSAGE_TYPE.ERROR }
          : { message: 'Shortened link successfully added', type: FLASH_MESSAGE_TYPE.SUCCESSFUL }
      )
    );
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => setLongLink(event.target.value);

  return (
    <>
      <div className="relative pb-5 min-h-screen px-5">
        <Image
          className="object-cover object-center z-[-1]"
          src="/images/homeBg.avif"
          alt="Home background"
          sizes="100vw"
          priority
          fill
        />
        <Header />
        <div className="container max-w-screen-desktop-small text-center mx-auto text-lg">
          <div
            ref={logoAnimationRef}
            className={classNames(
              { invisible: !isLogoAnimationVisible },
              { 'animate__fadeInDown animate__animated': isLogoAnimationVisible },
              'mt-7 my-5 text-white'
            )}
          >
            <h1 className="text-5xl" translate="no">
              Link Shortener
            </h1>
            <p className="max-w-lg mx-auto">
              Free URL Shortener for transforming long, ugly links into nice, memorable and trackable short URLs
            </p>
          </div>
          <form
            onSubmit={handleOnSubmit}
            className="mb-14 w-full relative flex flex-wrap items-stretch max-tablet-small:block"
          >
            <input
              type="search"
              value={longLink}
              onChange={handleInputChange}
              placeholder="Paste the URL to be shortened"
              className="rounded-r bg-white border-[1px] border-gray flex-auto relative m-0 rounded-l px-3 py-2.5 max-tablet-small:w-full max-tablet-small:rounded-r focus:outline-none focus:border-pink"
            />
            <button
              type="submit"
              className="text-white text-2xl bg-pink rounded-r text-center px-6 py-2.5 hover:bg-lightPink active:bg-darkPink max-tablet-small:w-full max-tablet-small:rounded-l max-tablet-small:mt-4"
            >
              generate link
            </button>
          </form>
          {isLoading ? (
            <LinksListSkeleton isHomePageList={true} />
          ) : (
            <LinkDataBlock linksList={linkData?.linksList || []} linkContainerClasses="bg-white rounded-md mb-5" />
          )}
        </div>
      </div>
      <QualityBlock containerClasses="container max-w-screen-desktop mx-auto text-center px-5 my-8" />
      <InfoBlock btnHref="/links" btnText="Get link statistics" title="Already there are abbreviated links" />
      <div style={{ minHeight: '1800px' }} ref={textWithImageRef}>
        {isTextWithImageVisible &&
          MOCK_TEXT_WITH_IMAGE.map(({ listData, linkData, text, title }, index) => (
            <TextWithImage
              key={index + title}
              linkData={linkData}
              imageFirst={index % 2 !== 0}
              title={title}
              containerClasses="my-10"
              featuresListData={listData}
              text={text}
            />
          ))}
      </div>
      <InfoBlock btnHref="/auth" btnText="Sign up" title="Sign up to see full link statistic" />
      <div style={{ minHeight: '700px' }} ref={bottomSectionRef}>
        {isBottomSectionVisible && (
          <>
            <div className="container max-w-screen-desktop mx-auto px-5 my-10">
              <p className="text-4xl font-bold mb-5 text-center">Frequently Asked Questions</p>
              <Accordion accordionItems={MOCK_QUESTIONS} />
            </div>
            <Footer />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
