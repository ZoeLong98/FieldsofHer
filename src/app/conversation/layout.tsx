"use client";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // 或者返回一个加载指示器
  }

  return <BrowserRouter>{children}</BrowserRouter>;
}
