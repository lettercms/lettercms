const SetBanner = () => {
  const banners = [
    <iframe key='046J26ETS9M7NDGDASG2' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=electronica&banner=046J26ETS9M7NDGDASG2&f=ifr&linkID=ec1f05c79701080eaa9e0c5e581c6ec7&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='0EBKJZ3WWFVPXWK2EQG2' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=kindlestore&banner=0EBKJZ3WWFVPXWK2EQG2&f=ifr&linkID=b9f7bb73e3f336b05221396f315435c5&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='0EQAZANNGB2FBCTTWY02' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=kindle_oasis&banner=0EQAZANNGB2FBCTTWY02&f=ifr&linkID=e7a91201639cf79f15997953cf66c43b&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='0HS9T4K2ZD228BRY4KG2' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=kindle_unlimited&banner=0HS9T4K2ZD228BRY4KG2&f=ifr&linkID=931e3a8b478cee425045c3bbe64cd83f&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='08BNTKF4K3J6EXRKB002' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=kindle&banner=08BNTKF4K3J6EXRKB002&f=ifr&linkID=2ee1875319344cda79cf2eed7e9fd264&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='0EMP21769P76KEGTJNR2' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=premium&banner=0EMP21769P76KEGTJNR2&f=ifr&linkID=fc38e0ecbe2b7aef4e4950900b8796f7&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='08B36QSC3KJB4QCVAWR2' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=todoslosproductos&banner=08B36QSC3KJB4QCVAWR2&f=ifr&linkID=5ea43b604eb1807f55bf5e4da5cce0fc&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='158DZ09YX363P3B44A02' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=generico&banner=158DZ09YX363P3B44A02&f=ifr&linkID=b4e51bc3c17d2b0498068f691bf846dd&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
    <iframe key='1GZMTXW4K3DWBWD3VAR2' src="https://rcm-eu.amazon-adsystem.com/e/cm?o=30&p=12&l=ur1&category=informatica&banner=1GZMTXW4K3DWBWD3VAR2&f=ifr&linkID=ee035cd8f5bcba192e46c585ecb67290&t=davidsdevel-21&tracking_id=davidsdevel-21" width="300" height="250" scrolling="no" border="0" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
  ];

  const num = Math.floor(Math.random() * banners.length);

  return banners[num];
};

export default SetBanner;
