import Input from '@/components/input';
import {useState, useEffect} from 'react';
import List from './list';
import Load from './load';
import NoImage from './blogNoImages';

export default function Search({onSelect}) {
  const [lastQuery, setLastQuery] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setLoadState] = useState(false);
  const [isLoadingMore, setLoadMore] = useState(false);
  const [nextPage, setNextPage] = useState(1);
  const [actualPage, setActualPage] = useState(1);

  useEffect(() => {
    if (searchQuery !== lastQuery) {
      setLoadState(true);

      fetch(`/api/search-images?q=${searchQuery}&page=1`)
        .then(r => r.json())
        .then(img => {
          setImages(img);
          setLoadState(false);
          setLastQuery(searchQuery);
        });
    }

  }, [searchQuery, lastQuery]);

  useEffect(() => {
    console.log(actualPage, nextPage, isLoading);
    if (actualPage !== nextPage && nextPage !== 1) {
      setLoadMore(true);

      fetch(`/api/search-images?q=${searchQuery}&page=${nextPage}`)
        .then(r => r.json())
        .then(img => {
          setImages(prev => prev.concat(img));
          setLoadMore(false);
          setActualPage(nextPage);
        });
    }

  }, [actualPage, nextPage, searchQuery]);


  let ui = null;
  if (isLoading)
    ui = <Load/>;

  if (!isLoading && images.length > 0)
    ui = <List onSelect={onSelect} images={images} onLoadMore={() => setNextPage(nextPage + 1)} isLoadingMore={isLoadingMore}/>;

  if (!isLoading && images.length === 0)
    ui = <NoImage/>;

  return <div>
    <div id='input-container'>
      <Input disabled={isLoading} id='search' value={query} onKeyUp={({key, target: {value}}) => {
        if (key === 'Enter' && !isLoading && query !== lastQuery) {
          setNextPage(1);
          setSearchQuery(value);
        }
      }} onInput={({target: {value}}) => setQuery(value)} label='Término'/>
    </div>
    <div id='content-wrapper'>{ui}</div>
    <style jsx>{`
      #input-container {
        background: #f7f7f7;
        padding: .25rem 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      :global(#input-container div.form-group) {
        width: 20rem;
        margin: 0;
      }
      #content-wrapper {
        height: 83%;
        position: absolute;
        width: 100%;
        overflow-y: auto;
      }
    `}</style>
  </div>;
}