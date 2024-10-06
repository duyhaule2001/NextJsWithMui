import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequest } from "@/components/utils/api";
export default async function HomePage() {
  const res = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "CHILL", limit: 2 },
  });
  return (
    <>
      <Container>
        <MainSlider />
      </Container>
    </>
  );
}
