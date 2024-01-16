"use client";
import React, { useEffect } from "react";
import ThemeSelectorButton from "./ThemeSelectorButton";
import ThemeSelector from "./ThemeSelector";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "next-auth/react";
import UserAvatarSkeleton from "../ui/UserAvatarSkeleton";
import { logoutUser } from "@/features/user/userSlice";
const Nav = () => {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    dispatch(logoutUser());
    await signOut();
  };
  const user = useSelector((state) => state.userState?.user);

  const numItemsInCart = useSelector((state) => state.cartState.numItemsInCart);
  const cartTotal = useSelector((state) => state.cartState.cartTotal);
  return (
    <div className="navbar bg-base-100 mb-0 border-b border-b-neutral">
      <div className="navbar-start lg:hidden md:flex">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:navbar-start">
        <a className="btn btn-ghost text-xl">TechHub</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li> */}
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>

      <div className="navbar-end">
        <div className=" flex">
          <div className="lg:flex hidden">
            <ThemeSelector />
          </div>
          <ThemeSelectorButton />
        </div>
        <div className="flex ">
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {numItemsInCart}
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <span className="font-bold text-lg">
                  {numItemsInCart} Items
                </span>
                <span className="text-info">Subtotal: ${cartTotal}</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    <Link href="/cart">View cart</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {user?.status === "loading" && <UserAvatarSkeleton />}
          {user?.status === "authenticated" && user && (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full border border-accent">
                    <img alt="dp" src={user?.image} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href="/profile" className="justify-between">
                      Profile
                      <span className="badge-secondary badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/orders">My Orders</Link>
                  </li>
                  <li>
                    <Link href="/wishlist">My Wishlist</Link>
                  </li>
                  <li>
                    <Link href="/adresses">Saved Addresses</Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="text-error"
                      onClick={async () => handleSignOut()}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
