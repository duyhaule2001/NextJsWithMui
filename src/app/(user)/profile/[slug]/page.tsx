import ProfilePage from "@/components/header/profile.track";
import { sendRequest } from "@/components/utils/api";
import { Container, Grid } from "@mui/material";

const Profile = async ({ params }: { params: { slug: string } }) => {
  const track = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/users?current=1&pageSize=10`,
    method: "POST",
    body: { id: params.slug },
    nextOption: {
      next: { tags: ["track-by-profile"] },
    },
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
