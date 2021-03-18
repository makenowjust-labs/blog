import * as React from 'react';

import { ChakraProvider } from "@chakra-ui/react"

export default function Layout({ children }) {
  return (
    <ChakraProvider>
      <main>
        { children }
      </main>
    </ChakraProvider>
  );
};
