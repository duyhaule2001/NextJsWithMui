import React from "react";

const PlayListPage = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log("check backend", process.env.NEXT_PUBLIC_BACKEND_URL);

  return <div>playlist</div>;
};

export default PlayListPage;
