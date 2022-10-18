import React from 'react';
import { number } from 'prop-types';

export default function Banners({ length })  {
  return <aside className="banners">
    <a href="https://share.payoneer.com/nav/8KWKN89znbmVoxDtLaDPDhoy-Hh5_0TAHI8v5anfhDJ6wN3NOMMU3rpV5jk6FSfq9t5YNnTcg-XSxqiV1k7lwA2" target="_blank" onClick={() => FB.AppEvent.logEvent('Click on Payoneer Banner')} rel="noreferrer">
      <img src="/images/payoneer.png" />
    </a>
    {
		length > 2
		&& (
      <a href="https://platzi.com/r/davidsdevel/" target="_blank" onClick={() => FB.AppEvent.logEvent('Click on Platzi Banner')} rel="noreferrer">
        <img src="/images/platzi.png" />
      </a>
		)
	}
  </aside>;
};
