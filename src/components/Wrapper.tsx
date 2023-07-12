import { Box } from "@chakra-ui/react";
import React from "react";

export default interface WrapperProps {
  children: React.ReactNode;
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  const box = {
    marginTop: "10px",
    width: "100%",
    marginX: "auto",
  };

  return (
    <Box maxWidth={variant === "regular" ? "800px" : "400px"} sx={box}>
      {children}
    </Box>
  );
};
