"use client";
import { useSearchParams } from "next/navigation";
const DetailTrackPage = (props: any) => {
  const { params } = props;

  const searchParams = useSearchParams();
  const search = searchParams.get("audio");
  console.log(search);
  return <div>My Post: {params.slug}</div>;
};

export default DetailTrackPage;
