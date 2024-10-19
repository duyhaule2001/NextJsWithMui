"use client";
import { AppBar, Container } from "@mui/material";
import React, { useContext, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useHasMounted } from "../utils/customHooks";
import { useTrackContext } from "@/lib/track.wrapper";

const AppFooter = () => {
  const hasMounted = useHasMounted();
  const playerRef = useRef(null);
  const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext;

  if (!hasMounted) return <></>;

  //@ts-ignore
  if (currentTrack.isPlaying) {
    //@ts-ignore
    playerRef?.current?.audio?.current?.play();
  } else {
    //@ts-ignore
    playerRef?.current?.audio?.current?.pause();
  }

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
            ref={playerRef}
            autoPlay={false}
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
            style={{ border: "none", boxShadow: "none" }}
            // other props here
            layout="horizontal-reverse"
            onPlay={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: true });
            }}
            onPause={() => {
              setCurrentTrack({ ...currentTrack, isPlaying: false });
            }}
          />
          <div
            style={{
              marginLeft: "20px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ marginRight: "10px", color: "black" }}>
              {currentTrack.description}
            </span>
            <span style={{ color: "black", width: "100px" }}>
              {currentTrack.title}
            </span>
          </div>
        </Container>
      </AppBar>
    </div>
  );
};

export default AppFooter;
