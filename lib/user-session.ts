import { GET } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const userSession = async () => {
  const session = await getServerSession(GET);

  return session?.user ?? null;
};
