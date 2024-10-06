import MainSlider from "@/components/main/main.slider";
import { Container } from "@mui/material";
import { sendRequestJS } from "/Users/lehau/Desktop/NextJs_Mui/src/components/utils/old.api.js";
export default async function HomePage() {
  const res = await sendRequestJS({
    url: "http://localhost:8000/api/v1/tracks/top",
    method: "POST",
    body: { category: "CHILL", limit: 1 },
  });

  console.log(res);
  return (
    <>
      <Container>
        <MainSlider />
      </Container>
    </>
  );
}
