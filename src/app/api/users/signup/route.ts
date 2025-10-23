import {connect} from '@/dbConfig/dbConfig';
import UserModel from '@/models/user.model.js';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { sendMail } from '@/helpers/mailer';
 
connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, password, email} = reqBody;

        const user = await UserModel.findOne({email});
        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();

        await sendMail({email, emailType:"VERIFY", userId: savedUser._id})

        return NextResponse.json({message: "User created", success: true, savedUser});
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}