'use server'

import { userSession } from "@/lib";
import { prisma } from "@/prisma/prisma-client";
import { Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";


export async function userUpdate(body: Prisma.UserUpdateInput) {
    try{

        const currentUser= await userSession()

        if(!currentUser){
            throw new Error("Пользователь не найден")
        }

        const findUser=await prisma.user.findFirst({
            where: {
                email: currentUser.email as string
            }
        })

        if(!findUser){
            throw new Error("Пользователь не найден")
        }

        await prisma.user.update({
            where: {
                id: findUser.id
            },
            data:{
                fullName: body.fullName,
                email: body.email,
                password: body.password ? hashSync(body.password as string, 10) : findUser?.password
            }
        })

    }
    catch(error){
        console.log(error)
        throw error
    }
}

export async function registerUser(body: Prisma.UserCreateInput){

    try{

        /// здесь будет условие на подтверждение почты

        const currentUser=await prisma.user.findFirst({
            where:{
                email: body.email 
            }
        })

        if(currentUser){
            throw new Error('Такой пользователь уже есть')
        }

        await prisma.user.create({
            data: {
              fullName: body.fullName,
              email: body.email,
              password: hashSync(body.password, 10),
            },
          });

    }
    catch(error){
        console.log(error)
        throw new Error('Error with register')
    }
}