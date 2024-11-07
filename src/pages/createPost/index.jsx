import { Button, Input, Textarea } from "@material-tailwind/react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../utils/axios";
import { useForm } from "react-hook-form";
import { useUser } from "../../utils/zustand";

export default function CreatePost() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = useUser();

  const submitData = (data) => {
    return api.post("/posts", data);
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
        toast.success("Posted!");
        navigate("/myposts");
      },
    });
  };

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
          {...register("title", { required: true, maxLength: 100 })}
        />
        <Input
          type="text"
          label="Image"
          {...register("image", { required: true })}
        />
        <Textarea
          variant="outlined"
          label="Body"
          {...register("body", { required: true })}
        />
        <Button type="submit" disabled={mutation.isLoading}>
          Post
        </Button>
      </form>
    </>
  );
}
