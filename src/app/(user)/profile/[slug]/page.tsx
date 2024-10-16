import { sendRequest } from "@/components/utils/api";

const Profile = async ({ params }: { params: { slug: string } }) => {
  const track = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10",
    method: "POST",
    body: { id: params.slug },
  });

  console.log("check track", track);
  return <div>abcd {params.slug}</div>;
};

export default Profile;
