"use client";
import { AppBar, Container } from "@mui/material";
import React, { useContext } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHasMounted } from "../utils/customHooks";
import { useTrackContext } from "@/lib/track.wrapper";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  console.log("check track", currentTrack);
  if (!hasMounted) return <></>;

  return (
    <div style={{ marginTop: 50 }}>
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
            ".rhap_main": {
              gap: "30px",
            },
          }}
        >
          <AudioPlayer
            autoPlay={false}
            onPlay={(e) => console.log("onPlay")}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
            style={{ border: "none", boxShadow: "none" }}
            // other props here
            layout="horizontal-reverse"
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
