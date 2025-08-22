import React, { ReactNode } from "react";
import { Container, Box } from "@chakra-ui/react";

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Container maxW={{ md: "90%", lg: "1300px" }} py={0} px={8}>
      <Box mt={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }} 
      mb={{ base: "80px", sm: "100px", md: "150px", lg: "180px" }} 
      paddingInline="0">
        {children}
      </Box>
    </Container>
  );
};
