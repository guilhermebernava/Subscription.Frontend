"use client"
import { CSSProperties } from "react"
import { ErrorOutlineRounded } from "@mui/icons-material"
import {
  Box,
  CircularProgress,
  SxProps,
  Theme,
  Typography,
} from "@mui/material"

export default function NotFound() {
  return (
    <Box style={{ ...boxStyle }}>
      <ErrorOutlineRounded sx={iconSx} />
      <Typography variant="overline" fontSize={24}>
        <strong>404</strong> - Page not found
      </Typography>
      <Typography variant="overline" mb={2}>
        returning to home page
      </Typography>
      <CircularProgress />
    </Box>
  )
}

const boxStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  height: "100%",
}

const iconSx: SxProps<Theme> = {
  fontSize: "8rem",
}
