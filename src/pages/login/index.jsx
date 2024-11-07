import { useState } from "react";
import { useQuery } from "react-query";
import { api } from "../../utils/axios";
import { Button, Input } from "@material-tailwind/react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../utils/zustand";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useUser();

  const navigate = useNavigate();

  const getData = () => {
    return api.get("/users").then((res) => res.data);
  };

  const { data: users, isLoading, isError } = useQuery("users", getData);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data.</p>;

  const checkData = () => {
    let user = users?.find(
      (user) => user.username == username && user.password == password
    );
    if (user) {
      toast.success("Welcome to Dashboard!");
      navigate("/");
      setUser(user);
    } else {
      setUsername("");
      setPassword("");
      toast.error("Wrong data!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkData();
  };

  return (
    <>
      <h1 className="m-5">Login Page</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 m-5 flex-wrap">
        <Input
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Log In</Button>
      </form>
    </>
  );
}
