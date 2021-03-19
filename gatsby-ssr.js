import * as React from "react"
import { ColorModeScript } from "@chakra-ui/react"

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([<ColorModeScript key="chakra-ui-no-flash" />])
};
