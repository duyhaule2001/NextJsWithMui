"use client";
import React, { useEffect, useState, useMemo } from "react";
import WaveSurfer from "wavesurfer.js";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

const useWavesurfer = (containerRef: any, options: any) => {
  const [wavesurfer, setWavesurfer] = useState<any>(null);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!containerRef.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [options, containerRef]);

  return wavesurfer;
};

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

  // useEffect(() => {
  //   if (containerRef.current) {
  //     const wavesurfer = WaveSurfer.create({
  //       container: containerRef.current,
  //       waveColor: "rgb(200, 0, 200)",
  //       progressColor: "rgb(100, 0, 100)",
  //       url: `/api?audio=${fileName}`,
  //     });

  //     return () => {
  //       wavesurfer.destroy();
  //     };
  //   }
  // }, []);
  return <div ref={containerRef}>WaveTrack</div>;
};

export default WaveTrack;
