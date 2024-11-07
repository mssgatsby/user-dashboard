import { Button, Input } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { api } from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitData = (data) => {
    return api.post("/users", data);
  };

  const mutation = useMutation({ mutationFn: submitData });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data, {
      onSuccess: () => {
        toast.success("Registered");
        navigate("/login");
      },
    });
  };

  return (
    <>
      <h1 className="m-5">Registration Page</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 m-5 flex-wrap"
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
              required: { value: true, message: "Required field" },
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

        <Button type="submit" disabled={mutation.isLoading}>
          Sign In
        </Button>
      </form>
    </>
  );
}
