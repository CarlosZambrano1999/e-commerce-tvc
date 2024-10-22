import { Footer, Sidebar, TopMenu } from "@/components";
import React from "react"

export default function ShopLayout({ children}: {
    children: React.ReactNode;
    }) {
    return (
      <main className="min-h-screen">
        <TopMenu />
        <Sidebar/>
        <div className= "px_0 sm:px-10">{children}</div>
        <Footer />
      </main>
    );
  }