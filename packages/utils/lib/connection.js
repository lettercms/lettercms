import mongoose from '@lettercms/models/mongoose';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost/blog';

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.__mongoCache;

if (!cached)
  cached = global.__mongoCache = { conn: null, promise: null };

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //bufferCommands: false,
};

export default async function dbConnect() {
  if (cached.conn)
    return cached.conn;

  if (!cached.promise)
    cached.promise = mongoose.connect(MONGO_URL, opts).then(m => m);

  cached.conn = await cached.promise;
  return cached.conn;
}
