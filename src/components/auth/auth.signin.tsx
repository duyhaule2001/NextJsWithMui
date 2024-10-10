"use client";
import {
  Button,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
const AuthSign = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const handleLogin = () => {
    setUserNameError(false);
    setPasswordError(false);

    if (userName === "") {
      setUserNameError(true);
    }

    if (password === "") {
      setPasswordError(true);
    }

    console.log("check name,password", userName, password);
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
        <span style={{ textAlign: "center" }}>Sign in</span>
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
          <GitHubIcon sx={{ color: "orange" }} />
          <GoogleIcon sx={{ color: "orange" }} />
        </div>
      </Grid>
    </Grid>
  );
};

export default AuthSign;
