// pages/invite.js
import { Context, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Head from "next/head";
import Link from "next/link";
import { authenticateAndGetToken } from "../../lib/auth/authUtils";
import { IUser } from "../../types";
import firstUser from "../../lib/constants";

interface IPageProps {
  user: IUser;
  firstUser: boolean;
}

const InvitePage: React.FC<IPageProps> = ({ user, firstUser }: IPageProps) => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async () => {
    const endPoint = "/api/auth/invite";
    const response = await fetch(endPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, role }),
    });

    if (response.status === 200) {
      setSubmitMessage("Your invite has been sent!");
    }
  };
  return (
    <>
      <Head>
        <title>Invite Page</title>
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {user.role === "ADMIN" || firstUser ? (
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            {firstUser ? (
              <h2 className="m-3">
                Enter your email to receive an invite link
              </h2>
            ) : (
              <h2 className="m-3">Enter an email to send an invite link</h2>
            )}

            <div className="sm:col-span-6">
              <div className="mb-4">
                <label
                  htmlFor="role"
                  className="block text-sm font-medium mb-2"
                >
                  Role
                </label>
                <select
                  id="role"
                  className="w-full p-2 border-1 bg-gray-100 border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  {!firstUser && <option value="User">User</option>}
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    className="block w-full pl-8 rounded-md border-1 mt-1 border-gray-500 bg-gray-100 py-1.5 text-gray-900"
                    placeholder="frodo.baggins@thefellowship.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleSubmit}
              className="rounded-md bg-indigo-600 px-3 mt-5 py-2 w-full text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Send Invite
            </button>
            {submitMessage.length > 0 && (
              <p className="bg-green-200 border border-gray-300 rounded-lg px-4 py-3 mt-3 ml-3 text-sm text-black max-w-sm">
                {submitMessage}
              </p>
            )}
            <p className="mt-3 ml-3">
              The email you entered will receive an invite link to sign up.
              <br />
              <br />
              The link will expire in 7 days, and can only be used once.
            </p>
          </div>
        ) : (
          <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">
              You are not authorized to view this page, This page is only for
              Admins, please login or contact the admin
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

  if (!cookies || !decodedToken) {
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
      firstUser: await firstUser(),
    },
  };
}

export default InvitePage;
