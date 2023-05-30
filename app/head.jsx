 "use client"
import { useState } from "react";
import { useEffect } from "react";
import { useCookies } from "react-cookie";


export default function Head() {

  const [cookies, setCookie] = useCookies(["language"]);
  const [title, setTitle] = useState(`Жигүүр өөд ХХК`);

  return (
    <>
      <title>{title}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content={title} />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
