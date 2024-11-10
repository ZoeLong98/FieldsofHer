"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-white text-3xl p-7">
        You need to be logged in to view this page.
      </div>
    );
  }

  return (
    <section className="flex-grow px-4 py-4 text-white rounded-lg">
      <div className="font-bold text-3xl ml-8 mt-7">
        Hello! {user.displayName}
      </div>
      {children}
    </section>
  );
};

export default RootLayout;
