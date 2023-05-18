"use client";

import { Hydrate, HydrateProps } from "react-query";

export default function ClientHydrate(props: HydrateProps) {
  return (
    <Hydrate {...props} />
  )
}