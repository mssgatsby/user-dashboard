import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProfImg, useUser } from "../../utils/zustand";

import React from "react";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

export default function NavBar() {
  const [openNav, setOpenNav] = useState(false);
  const { user, logout } = useUser();

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const signIn = () => {
    if (user) {
      logout();
    }
  };

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to={"/"}>
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to={"/allposts"}>
          Posts
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to={"/myposts"}>
          My Posts
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link className="flex items-center" to={"/create"}>
          Create Post
        </Link>
      </Typography>
    </ul>
  );

  const profileMenuItems = [
    { label: "Edit Profile", link: `/editprofile/${user?.id}` },
    { label: "Sign Out", link: "/login", onClick: logout },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const { image } = useProfImg();

  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Typography className="mr-4 cursor-pointer py-1.5 font-medium">
            <Link to={"/"}>User Dashboard</Link>
          </Typography>
          <div className="flex items-center gap-4">
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              <Button variant="gradient" size="sm" className=" lg:inline-block">
                <span>
                  <Link to={"/register"} onClick={signIn}>
                    Sign in
                  </Link>
                </span>
              </Button>

              <span>
                {user?.name ? (
                  <Menu
                    open={isMenuOpen}
                    handler={setIsMenuOpen}
                    placement="bottom-end"
                  >
                    <MenuHandler>
                      <Button
                        variant="text"
                        color="blue-gray"
                        className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5"
                      >
                        <Avatar
                          variant="circular"
                          size="sm"
                          alt="Profile"
                          className="border border-gray-900 p-0.5"
                          src={image}
                        />
                        <ChevronUpDownIcon
                          strokeWidth={2.5}
                          className={`h-3 w-3 transition-transform ${
                            isMenuOpen ? "rotate-180" : ""
                          }`}
                        />
                      </Button>
                    </MenuHandler>
                    <MenuList className="p-1">
                      {profileMenuItems.map(({ label, link, onClick }, key) => {
                        const isLastItem = key === profileMenuItems.length - 1;
                        return (
                          <MenuItem
                            key={label}
                            onClick={closeMenu}
                            className={`flex items-center gap-2 rounded ${
                              isLastItem
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                                : ""
                            }`}
                          >
                            <Typography
                              as="span"
                              variant="small"
                              className="font-normal"
                              color={isLastItem ? "red" : "inherit"}
                            >
                              <Link to={link} onClick={onClick}>
                                {label}
                              </Link>
                            </Typography>
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </Menu>
                ) : (
                  <Button
                    variant="gradient"
                    size="sm"
                    className=" lg:inline-block"
                  >
                    <Link to={"/login"}>Login</Link>
                  </Button>
                )}
              </span>
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <Collapse open={openNav}>{navList}</Collapse>
      </Navbar>
    </div>
  );
}
