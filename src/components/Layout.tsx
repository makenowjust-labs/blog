import * as React from 'react';
import { StaticQuery, Link as GatsbyLink, graphql } from 'gatsby';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

import { Box, Button, Container, Heading, Stack, Text, useColorMode, VStack, Link } from "@chakra-ui/react"

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 20 20" {...props}>
    <path
      fill="currentColor"
      d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
    />
  </svg>
);

export type LayoutContentProps = {
  siteName: string;
  github: string;
  children: React.ReactNode;
};

export const LayoutContent = ({ siteName, github, children }: LayoutContentProps) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const ColorModeIcon = colorMode === 'light' ? SunIcon : MoonIcon;

  return (
    <Container as="main" w="100vw" maxW="1280px">
      <Stack direction={['column', 'row']}>
        <Box w={[null, "280px"]} h={[null, '100vh']} pt={["1rem", "3rem"]} pos={[null, "sticky"]} top={[null, 0]} mr={[null, "1rem"]} borderRightStyle={[null, 'solid']} borderRightWidth={[null, '1px']} borderRightColor={[null, 'gray.400']} flexGrow={1}>
          <Heading fontSize="20px" fontWeight="bold">
            <GatsbyLink to="/"><Link as="span">{ siteName }</Link></GatsbyLink>
            <Link ml={"0.25rem"} href={`https://github.com/${github}`}><GithubIcon style={{display: 'inline-block'}} width="20px" height="20px" /></Link>
          </Heading>
        </Box>
        <Box w={[null, "1000px"]} pt={["1rem", "3rem"]}>
          <VStack>
            <Box textAlign="right" width="100%"><Button display="inline" variant="ghost" onClick={toggleColorMode}><ColorModeIcon /></Button></Box>
            { children }
            <Text pb={"1rem"}>(C) 2021 TSUYUSATO "MakeNowJust" Kitsune</Text>
          </VStack>
        </Box>
      </Stack>
    </Container>
  );
};

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => (
  <StaticQuery query={graphql`
    query {
      site {
        siteMetadata {
          siteName
          github
        }
      }
    }
  `}
  render={({site: {siteMetadata}}: any) => <LayoutContent github={siteMetadata.github} siteName={siteMetadata.siteName}>{children}</LayoutContent>}
  />
);
