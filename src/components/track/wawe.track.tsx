"use client";
import React, { useEffect } from "react";
import WaveSurfer from "wavesurfer.js";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      WaveSurfer.create({
        container: containerRef.current,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        url: `/api?audio=${fileName}`,
      });
    }
  }, []);
  return <div ref={containerRef}>WaveTrack</div>;
};

export default WaveTrack;
