import { useRouter } from 'next/router';
import { useEffect, useState, type FC, type ChangeEvent } from 'react';

import { Heart } from '@/icons';

const FiltersBlock: FC = () => {
  const { query, push, pathname } = useRouter();

  const [link, setLink] = useState(query?.searchString || '');

  const showFavoriteList = query?.search === 'favorite';

  const updateURL = (searchStringParam: string, favoriteParam: string) => {
    const queryParams = [searchStringParam, favoriteParam].filter(Boolean).join('&');
    const updatedURL = queryParams ? `?${queryParams}` : pathname;

    push(updatedURL);
  };

  useEffect(() => {
    let timeoutId: string | number | NodeJS.Timeout;

    if (link || showFavoriteList) {
      timeoutId = setTimeout(
        () => updateURL(link && `searchString=${link}`, showFavoriteList && 'search=favorite'),
        500
      );

      return () => clearTimeout(timeoutId);
    }

    updateURL(link && `searchString=${link}`, showFavoriteList && 'search=favorite');

    // updateURL as a dependency make dependency cycle
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [link, showFavoriteList]);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => setLink(event.target.value);

  return (
    <div className="flex justify-between w-full items-start border-b border-gray mb-5 gap-5">
      <button
        className={`border ${
          showFavoriteList ? 'border-pink bg-lightPink/20' : 'border-gray'
        } px-3 py-2.5 rounded flex items-center ml-3`}
        onClick={() => updateURL(link && `searchString=${link}`, !showFavoriteList && 'search=favorite')}
      >
        <Heart width={20} height={20} className={showFavoriteList ? 'fill-pink' : 'fill-gray'} />
        <p className="ml-2">Favorite</p>
      </button>
      <input
        type="search"
        value={link}
        onChange={onSearchChange}
        placeholder="Enter symbols after the last slash in the URL"
        className="mb-5 px-3 py-2.5 relative max-w-sm w-full border-[1px] border-gray rounded focus:outline-none focus:border-pink"
      />
    </div>
  );
};

export default FiltersBlock;
