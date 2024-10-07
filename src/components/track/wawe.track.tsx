"use client";
import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { useRef } from "react";

const WaveTrack = () => {
  const containerRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      WaveSurfer.create({
        container: containerRef.current,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        url: "http://localhost:8000/tracks/CHILL.mp3",
      });
    }
  }, []);
  return <div ref={containerRef}>WaveTrack</div>;
};

export default WaveTrack;
