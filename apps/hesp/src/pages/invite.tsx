// pages/invite.js
import { Context, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import Link from "next/link";

export default function InvitePage({ user }: any) {
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");

  const generateInviteLink = async (e: any) => {
    e.preventDefault();

    const dynamicID = uuidv4();

    const inviteLink = `${window.location.origin}/signup/${dynamicID}`;

    const today = new Date();
    const expiresAt = new Date(today);

    // link that expires 7 days from now
    expiresAt.setDate(today.getDate() + 7);

    const res = await fetch("/api/auth/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: inviteLink,
        expiresAt: expiresAt,
      }),
    });

    const data = await res.json();

    setLink(data.code);
  };

  return (
    <>
      <Head>
        <title>Invite Page</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {user?.user?.role === "STAFF" ? (
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Generate Invite Link</h2>
            <button onClick={() => console.log(user)}>click me</button>

            <form onSubmit={generateInviteLink}>
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="he">Homeless entrepreneur</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-bold rounded-md"
              >
                Generate Link
              </button>
            </form>
            {link && (
              <div className="mt-4 p-3 bg-green-100 border border-green-400 rounded-md">
                <p className="text-sm font-medium">Invite Link:</p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 break-all"
                >
                  {link}
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              You are not authorized to view this page, please login or contact
              the admin
            </h2>
            <Link href="/login">
              <button className="w-full p-2 bg-blue-600 text-white font-bold rounded-md">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context: {
  req: { headers: { host: string; cookie: string } };
}) {
  const host = context.req.headers.host;

  const user = await fetch(`http://${host}/api/auth/authenticate`, {
    method: "GET",
    headers: {
      cookie: context.req.headers.cookie,
    },
  }).then((res) => res.json());

  return {
    props: {
      user: user,
    },
  };
}
