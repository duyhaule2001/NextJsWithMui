import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/components/utils/api";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log("check", session);
  //get session
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "CHILL", limit: 10 },
  });

  const workouts = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "WORKOUT", limit: 10 },
  });

  const party = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "PARTY", limit: 10 },
  });

  return (
    <>
      <Container>
        <MainSlider data={chills?.data ?? []} title="Top Chills" />
        <MainSlider data={workouts?.data ?? []} title="Top Workout" />
        <MainSlider data={party?.data ?? []} title="Top party" />
      </Container>
    </>
  );
}
