import { TextField } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { fetchDefaultImages } from "../utils/api";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface IProps {
  track: ITrackTop | null;
  comments: ITrackComment[] | null;
}
const CommentsTrack = (props: IProps) => {
  const { track, comments } = props;
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
          <img
            src={fetchDefaultImages(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track?.uploader.type}`
            )}
            width={250}
            height={250}
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
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={fetchDefaultImages(comment.user.type)}
                    width={50}
                    height={50}
                  />
                  <span
                    style={{
                      marginLeft: 10,
                    }}
                  >
                    <p>{comment.user.email}</p>
                    <p>{comment.content}</p>
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
