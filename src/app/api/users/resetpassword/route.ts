import {connect} from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/user.model';
import bcrypt from 'bcryptjs';

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {token, newPassword, confirmPassword} = reqBody;

        if(newPassword === confirmPassword){
            const user = await UserModel.findOne({forgotPasswordToken: token});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            return NextResponse.json({message: "Password changed successfully"}, {status: 200})
        }else{
            return NextResponse.json({error: "Password does not match"}, {status: 500})
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}