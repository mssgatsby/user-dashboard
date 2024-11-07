import { Card, Typography } from "@material-tailwind/react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { api } from "../../utils/axios";

export default function SinglePost() {
  const { id } = useParams();

  const getPost = () => api.get(`/posts/${id}`).then((res) => res.data);

  const { data: post, isLoading, isError } = useQuery("post", getPost);

  const getUsers = () => api.get("/users").then((res) => res.data);

  const { data: users } = useQuery("users", getUsers);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  const author = users?.find((user) => post.userId == user.id);
  const date = new Date(post.createdAt).toLocaleDateString("en-GB");

  return (
    <>
      <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src={post.image}
          />
        </Card>
        <Typography variant="h2" color="blue-gray" className="mb-2">
          {post.title}
        </Typography>
        <Typography color="gray" className="font-normal">
          {post.body}
        </Typography>
        <div className="my-3 flex justify-between items-center">
          <p>{author ? author.name : "Unknown"}</p>
          <p>{date}</p>
        </div>
      </div>
    </>
  );
}
