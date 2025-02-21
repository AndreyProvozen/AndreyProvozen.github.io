import Image from 'next/image';
import type { FC } from 'react';

import { classNames, useIntersectionObserver } from '@/utils';

import { TEXT_WITH_IMAGE_TEST_IDS } from './testIds';

interface Props {
  linkData: { src: string; alt: string };
  text: string;
  title: string;
  featuresListData: string[];
  imageFirst?: boolean;
  containerClasses?: string;
}

const TextWithImage: FC<Props> = ({ linkData, text, imageFirst, title, featuresListData, containerClasses = '' }) => {
  const { elementRef: animationRef, isVisible: isAnimationVisible } = useIntersectionObserver({
    threshold: 0.3,
  });

  const imageTransition = imageFirst ? 'animate__fadeInRight' : 'animate__fadeInLeft';
  const textTransition = imageFirst ? 'animate__fadeInLeft' : 'animate__fadeInRight';

  return (
    <div
      ref={animationRef}
      data-testid={TEXT_WITH_IMAGE_TEST_IDS.ROOT}
      className={classNames(
        { 'flex-row-reverse': imageFirst },
        { invisible: !isAnimationVisible },
        'flex justify-between max-w-screen-desktop px-5 mx-auto max-desktop-small:block overflow-hidden',
        containerClasses
      )}
    >
      <Image
        src={linkData.src}
        alt={linkData.alt}
        height={400}
        width={500}
        className={classNames('px-5 max-desktop-small:mx-auto animate__animated', {
          [imageTransition]: isAnimationVisible,
        })}
      />
      <div
        className={classNames('pt-5 max-w-[700px] max-desktop-small:mx-auto animate__animated', {
          [textTransition]: isAnimationVisible,
        })}
      >
        <h2 className="text-2xl font-bold mx-auto text-center mb-2">{title}</h2>
        <div dangerouslySetInnerHTML={{ __html: text }} />
        {Boolean(featuresListData) &&
          featuresListData.map(feature => (
            <div className="flex mt-5" key={feature}>
              <svg viewBox="0 0 24 24" width="24px" className="shrink-0 mr-2 ">
                <use href="#star-icon" />
              </svg>
              {feature}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TextWithImage;
