import { GET } from "@/app/api/auth/[...nextauth]/route";
import { AuthOptions, getServerSession } from "next-auth";

export const userSession = async () => {
  const session = await getServerSession(GET as AuthOptions);

  return session?.user ?? null;
};
