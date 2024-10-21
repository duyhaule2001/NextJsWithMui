import WaveTrack from "@/components/track/wawe.track";
import { sendRequest } from "@/components/utils/api";
import { Container } from "@mui/material";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
  });

  return {
    title: res.data?.title,
    description: res.data?.description,
  };
}

const DetailTrackPage = async (props: any) => {
  const { params } = props;

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
    method: "GET",
    nextOption: { cache: "no-store" },
  });

  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `http://localhost:8000/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: params.slug,
      sort: "-createdAt",
    },
  });

  console.log(res1);

  return (
    <Container>
      <div>
        <WaveTrack
          track={res?.data ?? null}
          comments={res1?.data?.result ?? []}
        />
      </div>
    </Container>
  );
};

export default DetailTrackPage;
