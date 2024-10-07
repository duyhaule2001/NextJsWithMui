"use client";
import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";

const WaveTrack = () => {
  useEffect(() => {
    const element = document.getElementById("leduyhau");
    if (element) {
      WaveSurfer.create({
        container: element,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        url: "/audio/CHILL.mp3",
      });
    }
  }, []);
  return <div id="leduyhau">WaveTrack</div>;
};

export default WaveTrack;
