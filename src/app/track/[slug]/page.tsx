import WaveTrack from "@/components/track/wawe.track";
import { sendRequest } from "@/components/utils/api";
import { Container } from "@mui/material";
import type { Metadata, ResolvingMetadata } from "next";
import slugify from "slugify";
import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const temp = params?.slug?.split(".html") ?? [];
  const temp1 = temp[0].split("-");
  const id = temp1[temp1.length - 1];
  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: "GET",
  });

  return {
    title: res.data?.title,
    description: res.data?.description,
    openGraph: {
      title: "Hỏi Dân IT",
      description: "Beyond Your Coding Skills",
      type: "website",
      images: [
        `https://raw.githubusercontent.com/haryphamdev/sharing-host-files/refs/heads/master/detail-doctors/a4.jpg`,
      ],
    },
  };
}

export async function generateStaticParams() {
  return [
    { slug: "tinh-co-yeu-em-66fff266229833532dcb812f.html" },
    { slug: "sau-con-mua-66fff266229833532dcb812d.html" },
    { slug: "nu-hon-bisou-66fff266229833532dcb8129.html" },
  ];
}

const DetailTrackPage = async (props: any) => {
  const { params } = props;
  const temp = params?.slug?.split(".html") ?? [];
  const temp1 = temp[0].split("-");
  const id = temp1[temp1.length - 1];

  const res = await sendRequest<IBackendRes<ITrackTop>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
    method: "GET",
    nextOption: {
      next: { tags: ["track-by-id"] },
    },
  });

  const res1 = await sendRequest<IBackendRes<IModelPaginate<ITrackComment>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
    method: "POST",
    queryParams: {
      current: 1,
      pageSize: 10,
      trackId: id,
      sort: "-createdAt",
    },
  });

  if (!res?.data) {
    notFound();
  }

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
