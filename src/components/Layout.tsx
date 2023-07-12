import React from "react";
import { Wrapper } from "./Wrapper";
import { NavBar } from "./NavBar";
import LayoutProps from "./Wrapper";

// interface LayoutProps {
//   children: React.ReactNode;
//   variant?: "small" | "regular";
// }

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
