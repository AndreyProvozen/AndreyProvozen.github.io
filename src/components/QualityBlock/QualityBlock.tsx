import type { FC } from 'react';

import QualitiesList from './QualityList';

interface Props {
  containerClasses?: string;
}

const QualitiesBlock: FC<Props> = ({ containerClasses = '' }) => (
  <div className={containerClasses}>
    <h2 className="text-4xl font-bold mb-5">Our qualities</h2>
    <QualitiesList />
  </div>
);

export default QualitiesBlock;
