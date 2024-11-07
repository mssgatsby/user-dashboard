import { Button, Input, Textarea } from "@material-tailwind/react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../utils/axios";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/zustand";
import { useEffect } from "react";

export default function EditPost() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user } = useUser();
  const { id } = useParams();

  const getPost = () => api.get(`/posts/${id}`).then((res) => res.data);

  const { data: post, isLoading, isError } = useQuery("postEdit", getPost);

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("image", post.image);
      setValue("body", post.body);
    }
  }, [post, setValue]);

  const submitData = (data) => {
    return api.put(`/posts/${id}`, data);
  };

  const mutation = useMutation({ mutationFn: submitData });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const date = {
      ...data,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };
    console.log(date);
    mutation.mutate(date, {
      onSuccess: () => {
        toast.success("Post updated!");
        navigate("/myposts");
      },
    });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  return (
    <>
      <h1 className="m-5">Create Post Page</h1>

      <form
        className="flex gap-2 m-5 flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          label="Title"
          //   defaultValue={post.title}
          {...register("title", { required: true, maxLength: 100 })}
        />
        <Input
          type="text"
          label="Image"
          //   defaultValue={post.image}
          {...register("image", { required: true })}
        />
        <Textarea
          variant="outlined"
          label="Body"
          //   defaultValue={post.body}
          {...register("body", { required: true })}
        />
        <Button type="submit" disabled={mutation.isLoading}>
          Update
        </Button>
      </form>
    </>
  );
}
