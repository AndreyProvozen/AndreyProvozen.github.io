import Link from 'next/link';
import type { FC } from 'react';

const CREDITS = [
  {
    href: 'https://www.freepik.com/free-photo/3d-grunge-room-interior-with-spotlight-smoky-atmosphere-background_6038271.htm',
    text: 'Image by kjpargeter on Freepik',
  },
  {
    href: 'https://www.freepik.com/free-vector/grunge-dusty-texture-background_3857029.htm',
    text: 'Image by kjpargeter on Freepik',
  },
  {
    href: 'https://www.freepik.com/free-vector/statistical-analysis-man-cartoon-character-with-magnifying-glass-analyzing-data-circular-diagram-with-colorful-segments-statistics-audit-research-concept-illustration_11668491.htm',
    text: 'Image by vectorjuice on Freepik',
  },
  {
    href: 'https://www.freepik.com/free-vector/environment-data-analytics-abstract-concept_12085726.htm',
    text: 'Image by vectorjuice on Freepik',
  },
  {
    href: 'https://www.freepik.com/free-vector/site-stats-concept-illustration_7140739.htm',
    text: 'Image by storyset on Freepik',
  },
  {
    href: 'https://www.freepik.com/free-vector/setup-analytics-concept-illustration_7140754.htm',
    text: 'Image by storyset on Freepik',
  },
  {
    href: 'https://www.freepik.com/free-photo/digital-presentation-related-performance-business-using-graph_13463608.htm#query=statistic&position=17&track=robertav1_2_sidr',
    text: 'Image by rawpixel.com on Freepik',
  },
  {
    href: 'https://icons8.com/icon/12923/multiple-devices',
    text: 'Multiple Devices icon by Icons8',
  },
  {
    href: 'https://www.freepik.com/free-photo/old-black-background-grunge-texture-blackboard-chalkboard-concrete_14055416.htm#query=background&position=31&track=sph',
    text: 'Image by benzoix on Freepik',
  },
  {
    href: 'https://www.flaticon.com/free-icons/laptop-screen',
    text: 'Laptop screen icons created by DinosoftLabs - Flaticon',
  },
];

const CredentialsSection: FC = () => (
  <div className="container py-5 mx-auto">
    {CREDITS.map(({ href, text }) => (
      <Link target="_blank" className="block mb-2" href={href} key={href}>
        {text}
      </Link>
    ))}
  </div>
);

export default CredentialsSection;
