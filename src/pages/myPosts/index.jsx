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

export default function MyPosts() {
  const { user } = useUser();

  const getPosts = () => api.get("/posts").then((res) => res.data);

  const { data: posts, isLoading, isError } = useQuery("posts", getPosts);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  const userPosts = posts.filter((post) => post.userId == user.id);

  return (
    <>
      <h1 className="m-5">My Posts Page</h1>

      <div className="flex flex-wrap gap-5 mx-auto w-full">
        {userPosts ? (
          userPosts.map((post) => (
            <Card className="w-96 mt-10" key={post.id}>
              <CardHeader color="blue-gray" className="relative h-56">
                <img src={post.image} alt="card-image" />
              </CardHeader>
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {post.title}
                </Typography>
                <Typography>{post.body}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Button>
                  <Link to={`/editpost/${post.id}`}>Edit</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <p>No posts found for this user.</p>
        )}
      </div>
    </>
  );
}
