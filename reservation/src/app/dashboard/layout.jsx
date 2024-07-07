"use client";
import VerticalNavbar from "@/components/verticalnavbar";
import { useSelector } from "react-redux";
export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  
  const alias = useSelector((state) => state.user);
  return (
    <section className="flex flex-row">
      {/* Include shared UI here e.g. a header or sidebar */}
      <VerticalNavbar name={alias.userDetails.fname}/>
        
      {children}
    </section>
  );
}
