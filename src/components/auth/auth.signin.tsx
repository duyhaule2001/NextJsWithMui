"use client";
import {
  Alert,
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/navigation";

const AuthSign = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const [openMessage, setOpenMessage] = useState<boolean>(false);
  const [resMessage, setResMessage] = useState<string>("");

  const router = useRouter();

  const handleLogin = async () => {
    setUserNameError(false);
    setPasswordError(false);

    if (userName === "") {
      setUserNameError(true);
    }

    if (password === "") {
      setPasswordError(true);
    }

    const res = await signIn("credentials", {
      username: userName,
      password: password,
      redirect: false,
    });
    if (!res?.error) {
      router.push("/");
    } else {
      setOpenMessage(true);
      setResMessage(res.error);
    }
    console.log(res);
  };
  return (
    <Grid
      container
      sx={{
        height: "100%",
        marginTop: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid
        item
        xs={12}
        md={4}
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "200px" }}>
          <Link href="/">
            <ArrowBackIcon />
          </Link>
          <span style={{ textAlign: "center" }}>Sign in</span>
        </div>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          required
          value={userName}
          error={userNameError}
          helperText={userNameError ? "Tên tài khoản chưa được nhập" : ""}
          onChange={(e) => setUserName(e.target.value)}
        />

        <TextField
          onChange={(event) => setPassword(event.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          error={passwordError}
          helperText={passwordError ? "Mật khẩu chưa được nhập" : ""}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword === false ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Divider>Or using</Divider>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <GitHubIcon
            onClick={() => signIn("github")}
            sx={{ color: "orange" }}
          />
          <GoogleIcon sx={{ color: "orange" }} />
        </div>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openMessage}
      >
        <Alert
          severity="error"
          onClose={() => setOpenMessage(false)}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {resMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default AuthSign;
