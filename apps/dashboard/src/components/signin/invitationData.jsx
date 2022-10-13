import {useEffect, useState} from 'react';
import Input from '../input';
import Image from 'next/image';

export default function UserData() {
  return <form className='form' onSubmit={null}>
        <Input
          disabled={isLoad}
          value={name}
          id='name'
          onInput={null}
          label='Nombre'
        />
        <Input
          disabled={isLoad}
          value={lastname}
          id='lastname'
          onInput={null}
          label='Apellido'
        />
        <div id='emailLoad'>
          <Input
            disabled={isLoad || !!email}
            className={((!!emailState || !!email) && 'notEmpty ') + emailClass}
            value={email || emailState}
            id='email'
            type='email'
            onInput={null}
            label='Email'
          />
          {
            emailLoad &&
            <div className='load-container'>
              <Image layout='fill' src='/assets/spinner-black.svg' alt='Spinner' className='load-rotation'style={{animation: 'rotation linear 1s infinite'}}/>
            </div>
          }
        </div>
        <Input
          disabled={isLoad}
          value={password}
          id='password'
          onInput={null}
          label='Contraseña'
          type='password'
        />

        {
          isLoad
            ? <div style={{width: '2.75rem', height: '2.75rem', position: 'relative', margin: 'auto'}}>
                <Image layout='fill'
                  src='/assets/spinner-black.svg'
                  alt='Spinner'
                  style={{
                    display: 'block', height: '2.75rem', margin: '15px auto', animation: 'rotation linear 1s infinite',
                  }}
                />
              </div>
            : <button className="black">Register</button>
        }
      <style jsx>{`
        .load-container {
          width: 50px;
          height: 50px;
          position: absolute;
          top: 0;
          right: 0;
        }
        #emailLoad {
          position: relative;
        }
      `}</style>
    </form>;
}