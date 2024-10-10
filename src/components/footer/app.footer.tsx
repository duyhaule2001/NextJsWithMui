"use client";
import { AppBar, Container } from "@mui/material";
import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHasMounted } from "../utils/customHooks";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  if (!hasMounted) return <></>;

  return (
    <div>
      <AppBar
        position="fixed"
        color="primary"
        sx={{
          top: "auto",
          bottom: 0,
          background: "white",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AudioPlayer
            autoPlay={false}
            onPlay={(e) => console.log("onPlay")}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
            layout="stacked"
            style={{ border: "none", boxShadow: "none" }}
            // other props here
          />
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ marginRight: "10px", color: "black" }}>Eric</span>
            <span style={{ color: "black", width: "100px" }}>Who am I?</span>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppFooter;
