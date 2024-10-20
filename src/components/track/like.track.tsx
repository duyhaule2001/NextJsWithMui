import { Chip } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { sendRequest } from "../utils/api";
import { useRouter } from "next/navigation";

interface IProps {
  track: ITrackTop | null;
}
const LikeTrack = (props: IProps) => {
  const { track } = props;
  const { data: session } = useSession();
  const router = useRouter();

  const [trackLikes, setTrackLikes] = useState<ITrackLike[] | null>(null);

  const fetchData = async () => {
    if (session?.access_token) {
      const res2 = await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
        url: `http://localhost:8000/api/v1/likes`,
        method: "GET",
        queryParams: {
          current: 1,
          pageSize: 100,
          sort: "-createdAt",
        },
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
      if (res2?.data?.result) setTrackLikes(res2?.data?.result);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  const handleLikeTrack = async () => {
    await sendRequest<IBackendRes<IModelPaginate<ITrackLike>>>({
      url: `http://localhost:8000/api/v1/likes`,
      method: "POST",
      body: {
        track: track?._id,
        quantity: trackLikes?.some((t) => t._id === track?._id) ? -1 : 1,
      },
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    });

    fetchData();
    router.refresh();
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Chip
        icon={<FavoriteIcon />}
        label="Like"
        clickable
        color={
          trackLikes?.some((t) => t._id === track?._id) ? "error" : "default"
        }
        onClick={() => handleLikeTrack()}
      />
      <div
        style={{
          gap: 10,
          display: "flex",
        }}
      >
        <Chip icon={<PlayArrowIcon />} label={track?.countPlay} />
        <Chip icon={<FavoriteIcon />} label={track?.countLike} />
      </div>
    </div>
  );
};

export default LikeTrack;
