import { Autho } from "@/models/autho";
import authoClient from "./autho-client";

export async function getClients(): Promise<Autho.Client[]> {
  const response = await authoClient.get<Autho.Client[]>("/clients");
  return response.data;
}

export async function registClient(clientName: string) {
  const response = await authoClient.post("/clients", {
    clientName,
  });
  return response.data;
}