import Image from 'next/image';
import type { FC } from 'react';

import { Header } from '@/components';
import { classNames, useIntersectionObserver } from '@/utils';

interface Props {
  bgSrc: string;
  bgAlt: string;
  title: string;
  subTitle: string;
}

const HeroBlock: FC<Props> = ({ bgSrc, bgAlt, title, subTitle }) => {
  const { elementRef: animationRef, isVisible: isAnimationVisible } = useIntersectionObserver({ threshold: 0.3 });

  return (
    <div className="relative px-5 bg-cover bg-center max-h-max text-white">
      <Header />
      <Image className="object-cover object-center z-[-1]" src={bgSrc} alt={bgAlt} priority fill />
      <div
        ref={animationRef}
        className={classNames(
          'container max-w-screen-desktop-small text-center mx-auto pb-20',
          { 'animate__zoomIn animate__faster animate__animated': isAnimationVisible },
          { invisible: !isAnimationVisible }
        )}
      >
        <h1 className="text-5xl py-5">{title}</h1>
        <p className="text-center text-xl">{subTitle}</p>
      </div>
    </div>
  );
};

export default HeroBlock;
