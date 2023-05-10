// pages/invite.js
import { Context, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import Link from "next/link";
import { authenticateAndGetToken } from "../../lib/auth/authUtils";
import { IUser } from "../../types";
interface IPageProps {
  user: IUser;
}

const InvitePage: React.FC<IPageProps> = ({ user }: IPageProps) => {
  const [role, setRole] = useState("");
  const [link, setLink] = useState("");

  const generateInviteLink = async (e: any) => {
    e.preventDefault();

    const res = await fetch("/api/auth/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        role,
      }),
    });

    // currentHost
    const host = window.location.host;
    const data = await res.json();

    setLink(`http://${host}/signup/${data.id}`);
  };

  return (
    <>
      <Head>
        <title>Invite Page</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {user.role === "ADMIN" ? (
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Generate Invite Link</h2>

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
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white font-bold rounded-md"
              >
                Generate Link
              </button>
            </form>
            <p className="mt-3 ml-3">
              Generate a link and share it with the person signing up.
            </p>
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
};

export async function getServerSideProps(context: {
  req: { headers: { host: string; cookie: string } };
}) {
  const decodedToken = await authenticateAndGetToken(context);
  const cookies = context.req.headers.cookie;

  if (!cookies) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: decodedToken,
    },
  };
}

export default InvitePage;
