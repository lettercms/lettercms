import mongoose from 'mongoose';

const mongo = global.mongoose || mongoose;
global.mongoose = mongo;

export default mongoose;
