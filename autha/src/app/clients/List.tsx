"use client";

import { getClients } from "@/api/client";
import React from "react";
import { useQuery } from "react-query";

export default function ClientsList() {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients
  });

  return (
    <div>
      <h1>Clients List</h1>
    </div>
  )
}