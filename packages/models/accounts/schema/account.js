import {Schema} from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Accounts = new Schema({
  subdomain: String,
  name: String,
  lastname: String,
  firstTime: {
    type: Boolean,
    required: true,
    default: true
  },
  lastLogin: Date,
  description: String,
  ocupation: String,
  role: {
    type: String,
    required: true,
    enum: [
      'admin',
      'collaborator',
      'single'
    ]
  },
  isSubscribeToNewsletter: {
    type: Boolean,
    required: true,
    default: false
  },
  permissions: {
    type: Array,
    default: [
      'posts',
      'pages',
      'stats',
      'social',
      'email',
      'config',
      'accounts',
    ]
  },
  photo: String,
  email:{
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  linkedin: String,
});

Accounts.statics.login = async function(email, password) {
  try {
    const account = await this.findOne({ email }, 'password subdomain', {lean: true});

    if (!account)
      return {
        status: 'no-account',
        message: 'Email does not exists'
      };

    const pass = await bcrypt.compare(password, account.password);

    if (pass) {
      const accessToken = jwt.sign({
        subdomain: account.subdomain,
        account: account._id
      }, process.env.JWT_AUTH);

      return {
        id: account._id.toString(),
        subdomain: account.subdomain,
        accessToken
      };
    }

    return Promise.resolve({
      status: 'invalid-password',
      message: 'Invalid Password'
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

Accounts.statics.createCollab = async function(subdomain, data) {
  const password = await sign(data.password);

  const id = await this.create({
    ...data,
    subdomain,
    verified: true,
    password
  });

  return Promise.resolve({id});
};

Accounts.statics.createAccount = async function(subdomain, data) {
  if (!data && typeof subdomain === 'object')
    data = subdomain;
  else if (typeof subdomain === 'string' && !data)
    data = {
      subdomain
    };
  else if (typeof subdomain === 'string' && typeof data === 'object')
    data = {
      ...data,
      subdomain
    };

  const password = await bcrypt.hash(data.password, 10);

  data.password = password;

  const exists = await this.findOne({
    email: data.email,
    isSubscribeToNewsletter: true
  });

  let id = null;

  if (exists !== null) {
    await this.updateOne({email: data.email}, data);

    id = exists._id;
  } else  {
    const acc = await this.create(data);
    id = acc._id;
  }

  return Promise.resolve({id});
};

export default Accounts;
