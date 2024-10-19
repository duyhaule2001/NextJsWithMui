import WaveTrack from "@/components/track/wawe.track";
import { sendRequest } from "@/components/utils/api";
import { Container } from "@mui/material";
const DetailTrackPage = async (props: any) => {
  const { params } = props;

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
  });

  return (
    <Container>
      <div>
        <WaveTrack trackInfo={res?.data ?? null} />
      </div>
    </Container>
  );
};

export default DetailTrackPage;
