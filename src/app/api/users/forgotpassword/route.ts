import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/user.model';
import { sendMail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log(email);

        const user = await UserModel.findOne({email});
        if(!user){
            return NextResponse.json({message: "No user found"}, {status: 400})
        }
        console.log(user);
        
        await sendMail({email, emailType: "RESET", userId: user._id})
        return NextResponse.json({message: `Email has been sent to ${email}`, data: user})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}