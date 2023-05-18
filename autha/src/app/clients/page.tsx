import { getClients } from "@/api/client";
import ClientHydrate from "@/utils/ClientHydrate";
import getQueryClient from "@/utils/get-query-client"
import { dehydrate } from "react-query";
import List from "./List";

export default async function Clients() {
  const queryClient = getQueryClient();
  queryClient.prefetchQuery(["clients"], getClients);

  const dehydrateState = dehydrate(queryClient);

  return (
    <ClientHydrate state={dehydrateState}>
      <List />
    </ClientHydrate>
  )
}