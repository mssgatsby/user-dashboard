import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { api } from "../../utils/axios";
import { useQuery } from "react-query";
import { useUser } from "../../utils/zustand";
import { Link } from "react-router-dom";

export default function AllPosts() {
  const { user } = useUser();

  const getPosts = () => api.get("/posts").then((res) => res.data);

  const { data: posts, isLoading, isError } = useQuery("posts", getPosts);

  const getUsers = () => api.get("/users").then((res) => res.data);

  const { data: users } = useQuery("users", getUsers);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <>
      <h1 className="m-5">My Posts Page</h1>

      <div className="flex flex-wrap gap-5 m-5">
        {posts ? (
          posts.map((post) => {
            const author = users?.find((user) => post.userId == user.id);
            const date = new Date(post.createdAt).toLocaleDateString("en-GB");

            return (
              <Card className="w-96 mt-10" key={post.id}>
                <CardHeader color="blue-gray" className="relative h-56">
                  <img src={post.image} alt="card-image" />
                </CardHeader>
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {post.title}
                  </Typography>
                  <Typography>
                    {post.body.split(" ").slice(0, 10).join(" ")} ...
                  </Typography>
                </CardBody>
                <div className="mx-6 flex justify-between items-center">
                  <p>{author ? author.name : "Unknown"}</p>
                  <p>{date}</p>
                </div>
                <CardFooter className="">
                  <Button>
                    <Link to={`/singlepost/${post.id}`}>Read More</Link>
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </>
  );
}
