import {randomBytes, scrypt, timingSafeEqual} from 'crypto';


export const sign = key => {
  return new Promise((resolve, reject) => {
    const salt = randomBytes(16);

    scrypt(Buffer.from(key.normalize()), salt, 32, { N: 1024, p: 2 }, (err, buffer) => {
      if (err)
        return reject(err);

      resolve(`${buffer.toString('hex')}.${salt.toString('hex')}`);
    });
  });
};

export const compare = (key, secret) => {
  return new Promise((resolve, reject) => {
    const [hashedPassword, salt] = secret.split('.');

    const hashBuffer = Buffer.from(hashedPassword, 'hex');

    scrypt(Buffer.from(key.normalize()), Buffer.from(salt, 'hex'), 32, { N: 1024, p: 2 }, (err, buffer) => {
      if (err)
        return reject(err);

      resolve(timingSafeEqual(hashBuffer, buffer));
    });
  });
};
