import axios from "axios";
import { ChangeEvent, useState } from "react";
import { useQuery } from "react-query";

export default function Projects() {
  const {} = useQuery(["projects", "userId"], async () => {
    const result = await axios.get("/api/projects", {
      
    });
    return result.data;
  });

  return (
    <div>
      <h1>Projects</h1>
    </div>
  )
}