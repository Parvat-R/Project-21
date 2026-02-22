import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import { Appbar } from "./components/auth/Appbar";
import { NEXT_AUTH_CONFIG } from "@/lib/auth";

async function getUser() {
  const session = await getServerSession(NEXT_AUTH_CONFIG);
  return session;
}
export default async function Home() {
  const session = await getUser();

  return (
    <div>
      <Appbar />
      {JSON.stringify(session)}
      <div>
        loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas,
      </div>
      <div>
        loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas,
      </div>
      <div>
        loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas,
      </div>
      <div>
        loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas,
      </div>
      <div>
        loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas,
      </div>
      <div>
        loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        dolorem
        <div>
          loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas,
        </div>
        <div>
          loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas,
        </div>
        <div>
          loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas,
        </div>
        <div>
          loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas,
        </div>
        <div>
          loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas,
        </div>
        <div>
          loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas,
        </div>
        <div>
          loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
          doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
          doloremque. Voluptas,
        </div>
        que. Voluptas, doloremque. Voluptas, doloremque. Voluptas, doloremque.
        Voluptas, doloremque. Voluptas, doloremque. Voluptas, doloremque.
        Voluptas, doloremque. Voluptas, doloremque. Voluptas, doloremque.
        Voluptas, doloremque. Voluptas, doloremque. Voluptas, doloremque.
        Voluptas, doloremque. Voluptas, doloremque. Voluptas, doloremque. Volupt
        as, doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
      </div>
      <div>
        loren ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
        doloremqueque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Volupt as, doloremque. Voluptas, doloremque. Voluptas,
        doloremque. Voluptas,
      </div>
    </div>
  );
}
