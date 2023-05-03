import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { GetServerSideProps } from "next";

interface User {
  id: number;
  email: string;
  password: string;
}

interface props {
  reviewToken: string;
}

const UserSwitcher: React.FC<any> = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    { id: 1, email: "Admin", password: "Admin" },
    { id: 2, email: "Staff", password: "Staff" },
    { id: 3, email: "HE", password: "HE" },
  ]);

  const switchUser = async (user: User) => {
    const { email, password } = user;
    Object.keys(Cookies.get()).forEach((cookie) => {
      Cookies.remove(cookie);
    });
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (res.status === 200) {
      window.location.href = "/";
    }
  };

  return (
    <div className="p-4">
      <div className="space-x-2">
        <h1 className="text-2xl font-bold">Switch User</h1>
        <p className="text-gray-500">
          You are currently logged in as{" "}
          {currentUser ? (
            <span className="font-bold">{currentUser?.email}</span>
          ) : (
            <span className="font-bold">No user</span>
          )}
        </p>
        {users.map((user) => (
          <button
            key={user.id}
            className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => switchUser(user)}
          >
            {user.email}
          </button>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  if (process.env.VERCEL_ENV === "production") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UserSwitcher;
