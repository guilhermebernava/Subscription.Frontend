"use client"
import { ChangeLanguage } from "@/components"
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid2,
  TextField,
} from "@mui/material"
import { useTranslation } from "react-i18next"

export default function Login() {
  const { t } = useTranslation()

  return (
    <main style={{ minHeight: "100dvh" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          px: 2,
        }}
      >
        <Card>
          <Box display="flex" justifyContent="space-between" pr={2}>
            <CardHeader title={t("pages.login.title")} />
            <ChangeLanguage />
          </Box>
          <Divider />
          <CardContent>
            <form>
              <Grid2 container gap={2}>
                <Grid2
                  size={{
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12,
                  }}
                >
                  <TextField
                    size="small"
                    label={t("pages.login.user")}
                    fullWidth
                  />
                </Grid2>
                <Grid2
                  size={{
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12,
                  }}
                >
                  <TextField
                    size="small"
                    label={t("pages.login.password")}
                    type="password"
                    fullWidth
                  />
                </Grid2>
                <Grid2
                  size={{
                    lg: 12,
                    md: 12,
                    sm: 12,
                    xs: 12,
                  }}
                >
                  <Button variant="contained" fullWidth>
                    {t("pages.login.signIn")}
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </CardContent>
        </Card>
      </Box>
    </main>
  )
}
