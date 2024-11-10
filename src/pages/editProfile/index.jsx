import { useForm } from "react-hook-form";
import { useProfImg, useUser } from "../../utils/zustand";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/axios";
import { useMutation, useQuery } from "react-query";
import { Button, Input } from "@material-tailwind/react";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { user, setUser } = useUser();
  const { image, setImage } = useProfImg();
  const { id } = useParams();

  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("username", user.username);
      setValue("password", user.password);
      setValue("image", user.image);
    }
  }, [user, setValue]);

  const submitData = (data) => {
    return api.put(`/users/${id}`, data);
  };

  const mutation = useMutation({ mutationFn: submitData });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    setUser({ ...data, id });
    setImage(data.image);
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Profile updated!");
        navigate("/");
      },
      onError: (e) => {
        console.error(e);
      },
    });
  };

  return (
    <>
      <h1 className="m-5">Edit Your Profile</h1>

      <form
        className="flex gap-2 m-5 flex-wrap"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          label="Name"
          {...register("name", {
            required: {
              value: true,
              message: "Required field",
            },
          })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors?.name?.message}</p>
        )}
        <Input
          type="text"
          label="Username"
          {...register("username", {
            required: {
              value: true,
              message: "Required field",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">
            {errors?.username?.message}
          </p>
        )}
        <div className="w-full">
          <Input
            type="password"
            label="Password"
            {...register("password", {
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
              maxLength: {
                value: 12,
                message: "Password must not exceed 12 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors?.password?.message}
            </p>
          )}
        </div>

        <Input type="text" label="Profile image" {...register("image")} />

        <Button type="submit" disabled={mutation.isLoading}>
          Update
        </Button>
      </form>
    </>
  );
}
