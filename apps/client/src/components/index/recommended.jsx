import React from 'react';
import dynamic from 'next/dynamic';
import Card from './card';

const SetBanner = dynamic(() => import('../../lib/banners'), {
  ssr: false
});

const Recommended = ({data}) => <div>
  <span style={{ marginLeft: '5%', display: 'block' }}>Te puede interesar</span>
  <div className="banner-container">
    <Card
      ID={data.url}
      title={data.title} 
      content={data.description}
      url={`/${data.subdomain}${data.fullUrl}`}
      thumbnail={data.thumbnail}
      comments={data.comments}
      category={data.category}
      size="big"
      as={data._as}
    />
    <SetBanner/>
  </div>
</div>;

export default Recommended;
