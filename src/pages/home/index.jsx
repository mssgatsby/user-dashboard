import { Card, Typography } from "@material-tailwind/react";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-screen-md py-12">
        <Card className="mb-12 overflow-hidden">
          <img
            alt="nature"
            className="h-[32rem] w-full object-cover object-center"
            src="https://images.unsplash.com/photo-1485470733090-0aae1788d5af?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2717&q=80"
          />
        </Card>
        <Typography variant="h2" color="blue-gray" className="mb-2">
          Welcome to Your Dashboard!
        </Typography>
        <Typography color="gray" className="font-normal">
          This is your space to connect, share, and stay informed! Here, you
          can:
          <li>
            <b>Create Your Own Posts:</b> Share your thoughts, ideas, and
            updates with others. Whether it's a quick note or a detailed post,
            your voice matters here.
          </li>
          <br />
          <li>
            <b>Explore Posts from Others:</b> Stay engaged with what’s happening
            around you by browsing through posts from other users. Discover new
            perspectives and connect with like-minded people.
          </li>
          <br />
          <li>
            <b>Easy Access and Control:</b> Quickly access all your posts and
            manage them from one place. Make edits, view responses, and engage
            with the community effortlessly.
          </li>
          <br />
          We’re excited to see what you’ll share!
        </Typography>
      </div>
    </>
  );
}
