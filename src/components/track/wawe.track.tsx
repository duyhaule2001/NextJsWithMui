"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useWavesurfer } from "../utils/customHooks";
import { WaveSurferOptions } from "wavesurfer.js";

const WaveTrack = () => {
  const searchParams = useSearchParams();
  const fileName = searchParams.get("audio");
  const containerRef = useRef<HTMLInputElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
    return {
      waveColor: "rgb(200, 0, 200)",
      progressColor: "rgb(100, 0, 100)",
      barWidth: 2,
      url: `/api?audio=${fileName}`,
    };
  }, []);

  const wavesurfer = useWavesurfer(containerRef, optionsMemo);

  // Initialize wavesurfer when the container mounts
  // or any of the props change
  useEffect(() => {
    if (!wavesurfer) return;
    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on("play", () => setIsPlaying(true)),
      wavesurfer.on("pause", () => setIsPlaying(false)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  // On play button click
  const onPlayClick = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play();
    }
  }, [wavesurfer]);

  return (
    <div>
      <div ref={containerRef}>WaveTrack</div>
      <button onClick={onPlayClick}>
        {isPlaying === true ? "Pause" : "Play"}
      </button>
    </div>
  );
};

export default WaveTrack;
