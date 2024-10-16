import ProfilePage from "@/components/header/profile.track";
import { sendRequest } from "@/components/utils/api";
import { Container, Grid } from "@mui/material";

const Profile = async ({ params }: { params: { slug: string } }) => {
  const track = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: "http://localhost:8000/api/v1/tracks/users?current=1&pageSize=10",
    method: "POST",
    body: { id: params.slug },
  });

  const data = track?.data?.result ?? [];
  return (
    <Container sx={{ my: 5 }}>
      <Grid container spacing={5}>
        {data.map((item: ITrackTop, index: number) => {
          return (
            <Grid item xs={12} md={6} key={index}>
              <ProfilePage data={item} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Profile;
