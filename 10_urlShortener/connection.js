import mongoose from 'mongoose';

export async function connectDB(url){
    await mongoose.connect(url);
    console.log('Connected to MongoDB');
}