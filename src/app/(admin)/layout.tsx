"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic classes for responsive layout
  const mainContentClasses = [
    "flex-1",
    "transition-all duration-300 ease-in-out",
    isMobileOpen ? "ml-0" : "",
    !isMobileOpen && (isExpanded || isHovered) ? "lg:ml-[290px]" : "lg:ml-[90px]",
    // Add a minimum width to prevent content squeezing
    "min-w-0" // Ensures content can shrink properly
  ].filter(Boolean).join(' ');

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Sidebar - Fixed on desktop, overlay on mobile */}
      <AppSidebar />
      
      {/* Backdrop for mobile sidebar */}
      <Backdrop />
      
      {/* Main Content Area */}
      <div className={mainContentClasses}>
        {/* Sticky Header */}
        <AppHeader />
        
        {/* Page Content with proper spacing */}
        <div className="p-4 mx-auto w-full max-w-screen-2xl md:p-6 2xl:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}