import { userSession } from "@/lib"
import { redirect } from "next/navigation"

export default async function ProfilePage(){

    const session=await userSession()

    if(!session){
        return redirect('/not-auth')
    }

    return(
        <div>
            Profile
        </div>
    )
}