import { type FC, useState } from 'react';

import AccordionItem from './AccordionItem';

interface Props {
  accordionItems: {
    title: string;
    description: string;
  }[];
}

const Accordion: FC<Props> = ({ accordionItems }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleActiveItem = (questionId: string) => setActiveItem(prev => (prev !== questionId ? questionId : null));

  return (
    <>
      {accordionItems.map(({ title, description }) => (
        <AccordionItem
          title={title}
          description={description}
          key={title}
          isOpened={activeItem === title}
          onClick={() => toggleActiveItem(title)}
        />
      ))}
    </>
  );
};

export default Accordion;
