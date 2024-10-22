"use client";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { fetchDefaultImages, sendRequest } from "../utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WaveSurfer from "wavesurfer.js";
import Image from "next/image";
dayjs.extend(relativeTime);

interface IProps {
  track: ITrackTop | null;
  comments: ITrackComment[] | null;
  wavesurfer: WaveSurfer | null;
}
const CommentsTrack = (props: IProps) => {
  const { track, comments, wavesurfer } = props;
  const { data: session } = useSession();
  const [yourComment, setYourComment] = useState<string>("");
  const router = useRouter();

  console.log(yourComment);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.round(seconds) % 60;
    const paddedSeconds = `0${secondsRemainder}`.slice(-2);
    return `${minutes}:${paddedSeconds}`;
  };

  const handleSubmit = async () => {
    const res = await sendRequest<IBackendRes<ITrackComment>>({
      url: "http://localhost:8000/api/v1/comments",
      method: "POST",
      body: {
        content: yourComment,
        moment: Math.round(wavesurfer?.getCurrentTime() ?? 0),
        track: track?._id,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });
    if (res.data) {
      setYourComment("");
      router.refresh();
    }
  };

  const handleJumpTrack = (moment: number) => {
    if (wavesurfer) {
      const duration = wavesurfer.getDuration();
      wavesurfer.seekTo(moment / duration);
      wavesurfer.play();
    }
  };
  return (
    <div
      style={{
        marginTop: 30,
      }}
    >
      <TextField
        id="standard-basic"
        label="Comments"
        variant="standard"
        sx={{
          width: "100%",
        }}
        value={yourComment}
        onChange={(e) => setYourComment(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <div
        style={{
          marginTop: 30,
          display: "flex",
          gap: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            src={fetchDefaultImages(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.uploader.type}`
            )}
            alt="avatar comment"
            height={250}
            width={250}
          />
          <p>{track?.uploader.email}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          {comments?.map((comment) => {
            return (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
                key={comment._id}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={fetchDefaultImages(comment.user.type)}
                    width={50}
                    height={50}
                    alt="comment"
                  />

                  <span
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <p>
                      {comment.user.email} at {formatTime(10)}
                    </p>
                    <p onClick={() => handleJumpTrack(comment.moment)}>
                      {comment.content}
                    </p>
                  </span>
                </div>
                <p> {dayjs(comment.createdAt).fromNow()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentsTrack;
