"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useWavesurfer } from "../utils/customHooks";

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLInputElement>(null);

  const optionsMemo = useMemo(() => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      url: `/api?audio=${fileName}`,
    };
  }, []);

  const wavesurfer = useWavesurfer(containerRef, optionsMemo);

  return <div ref={containerRef}>WaveTrack</div>;
};

export default WaveTrack;
