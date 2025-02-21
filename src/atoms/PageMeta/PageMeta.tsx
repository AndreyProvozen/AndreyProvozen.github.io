import Head from 'next/head';
import { type FC } from 'react';

interface Props {
  title: string;
  description: string;
  noIndex?: boolean;
}

const PageMeta: FC<Props> = ({ title, description, noIndex }) => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    {noIndex && <meta name="robots" content="noindex" />}
  </Head>
);

export default PageMeta;
