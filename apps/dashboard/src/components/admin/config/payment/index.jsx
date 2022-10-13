import Base from '../../stats/base';
import Image from 'next/image';
import {useState, useEffect, useRef} from 'react';
import BaseLoad from '../../stats/baseLoad';
import ModalBase from '@/components/modalBase';
import sdk from '@lettercms/sdk';
import Input from '@/components/input';

let amount = '2.00';

const paypalOpts = {
  client: {
    sandbox: process.env.PAYPAL_SANDBOX,
    production: process.env.PAYPAL_PRODUCTION
  },
  env: 'sandbox',
  style: {
    layout: 'vertical',   // horizontal | vertical
    size: 'responsive',   // medium | large | responsive
    shape: 'pill',        // pill | rect
    color: 'blue',        // gold | blue | silver | black,
    fundingicons: false,  // true | false,
    tagline: false        // true | false,
  }
};

const onApprove = (type, cb) => async function({orderID}, actions) {
  const {status} = await sdk.createRequest('/payment/verify', 'POST', {
    orderID,
    type
  });

  if (status === 'OK') {
    alert('Pago realizado con exito');
    cb();
  }
  else
    alert('Hubo un error en el pago. Contacte a davidsdevel@gmail.com para soporte');
};

const createOrder = purchase_units => (data, actions) => actions.order.create({purchase_units});

const CardLoad = () => <>
  <BaseLoad rows={2}/>
  <BaseLoad rows={2}/>
  <BaseLoad rows={1}/>
</>;

const generatePrice = (price, data, multiplier) => {
  let used = 0;

  if (data.available < 0) {
    if (multiplier)
      used = -data.available / multiplier;
    else
      used = -data.available;
  }

  const total = price * used;

  delete data.available;
  delete data.used;

  return {
    used,
    total,
    ...data
  };
};

const generateTotals = limits => {
  const {
    files,
    posts,
    pages,
    accounts,
    social,
    stats,
    ab
  } = limits;

  const values = [
    generatePrice(.6, files.storage, (1024 * 1024)),
    generatePrice(.05, files.upload, 1000),
    generatePrice(.1, pages),
    generatePrice(.01, posts.versioning, 10),
    generatePrice(1, accounts.collaborators),
    generatePrice(.1, accounts.single),
    generatePrice(.01, social.accounts),
    generatePrice(.05, social.schedule, 10),
    generatePrice(.01, stats.reports, 10),
    generatePrice(.005, ab.tests)
  ];

  return {
    values,
    total: values.map(({total}) => total).reduce((a,b) => a + b)
  };
};

const InvoiceField = ({label, used, total, units, price}) => <>
  <li>
    <span className='price-name'>{label}:</span>
    <span className='price-used'>{price}$ x {used}{units || ''}</span>
    <span className='price-total'>{total}$</span>
  </li>
  <hr/>
  <style jsx>{`
    li {
      display: flex;
      position: relative;
    }
    li .price-name {
      width: 60%;
    }
    li .price-used {
      width: 30%;
    }
    li .price-total {
      text-align: right;
      width: 10%;
    }
  `}</style>
</>;

const Faturation = ({data, lastPayment}) => {
  const {values, total} = generateTotals(data);
  const opts = {...paypalOpts, layout: 'horizontal'};

  opts.onApprove = onApprove('payment', () => alert('Pago efectuado con exito'));
  opts.createOrder = async () => {
    const usage = await sdk.createRequest('/usage');
    const t = generateTotals(usage);
    const units = t.values.map(value => {
      return {
        amount: {
          value
        }
      };
    });
    createOrder(units);
  };

  useEffect(() => {
    window.p =paypal.Buttons(opts).render('#payment-button');
  }, []);

  return <div style={{width: '100%'}}>
    <ul>
      {values.map(e => <InvoiceField key={e.label} {...e}/>)}
      <li>
        <span className='total'>{total}$</span>
      </li>
      <li className='button-invoice'>
        <div id='payment-button'/>
      </li>
    </ul>
    <style jsx>{`
      ul {
        list-style: none;
        padding: 2rem 10% ;
      }
      .total {
        text-align: right;
        width: 100%;
        display: flex;
        align-content: right;
        justify-content: end;
      }
      li.button-invoice {
        margin-top: 2rem;
      }
    `}</style>
  </div>; 
};

const BalanceModal = ({addFunds}) => {
  const [amount, setAmount] = useState('2.00');

  const opts = {...paypalOpts};
  
  opts.onApprove = onApprove('funds', () => addFunds(parseInt(amount)));
  opts.createOrder = createOrder([
    {amount: {value: amount}}
  ]);

  useEffect(() => {
    window.p2 = paypal.Buttons(opts).render('#paypalCheckoutContainer');
  }, []);

  return <div className='modal-funding'>
    <div className='modal-prices'>
      <div>
        <span>Monto</span>
      </div>
      <div className="selection">
        <input type="radio" onChange={() => {setAmount('2.00');}} name="amount" id="amount" checked={amount === '2.00'} />
        <label htmlFor="amount" className="option">2$</label>
      </div>
      <div className="selection">
        <input type="radio" onChange={() => {setAmount('5.00');}} name="amount" id="amount" checked={amount === '5.00'} />
        <label htmlFor="amount" className="option">5$</label>
      </div>
      <div className="selection">
        <input type="radio" onChange={() => {setAmount('10.00');}} name="amount" id="amount" checked={amount === '10.00'} />
        <label htmlFor="amount" className="option">10$</label>
      </div>
    </div>
    <div className='modal-payment'>
      <div id="paypalCheckoutContainer"/>
    </div>
    <style jsx>{`
      .modal-funding {
        height: 100%;
        display: flex;
      }
      .modal-funding .modal-prices {
        display: flex;
        justify-content: center;
        height: 100%;
        width: 30%;
      }
      .modal-funding .modal-payment {
        width: 70%;
        overflow: auto;
      }
    `}</style>
  </div>;
};

const Payment = () => {
  const [isLoading, changeLoad] = useState(true);
  const [usage, setUsage] = useState(null);
  const [balance, setBalance] = useState(0);
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    Promise.all([
      sdk.createRequest('/usage'),
      sdk.createRequest('/payment')
    ])
    .then(([limits, payment]) => {
      setUsage(limits);
      setBalance(payment.balance);
      changeLoad(false);
    });

    return () => {
      paypal.Buttons.instances.forEach(e => e.close());
    };
  }, []);

  return <div className='config-opts'>
    <Base rows={2} title='Saldo' principal style={{height: 250}}>
      <div style={{fontSize: '3rem', width: 'auto'}}>
        <span>{balance}</span>
        <span>$</span>
      </div>
    </Base>
    <Base rows={2} title='Añadir Fondos' style={{height: 250}}>
      <Image src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/plus.svg' width='100' height='100' style={{cursor: 'pointer'}} onClick={() => setModal(true)}/>
    </Base>
    <Base rows={1} title='Factura Actual' style={{height: 'auto'}}>
      {
        isLoading
          ? <div style={{display: 'flex', justifyContent: 'center'}}>
            <span>
              <img alt='Spinner' src='https://cdn.jsdelivr.net/gh/davidsdevel/lettercms-cdn/public/assets/spinner-black.svg' style={{animation: 'rotation linear .6s infinite', width: 75}}/>
            </span>
          </div>
          : <Faturation data={usage}/>
      }
    </Base>
    <ModalBase show={showModal} close={() => setModal(false)}>
      <BalanceModal addFunds={amt => setBalance(balance + amt)} />
    </ModalBase>
    <style jsx>{`
      .config-opts {
        padding: 0 2.5%;
        flex-direction: row;
        flex-wrap: wrap;
      }
    `}</style>
  </div>;
};

export default Payment;
