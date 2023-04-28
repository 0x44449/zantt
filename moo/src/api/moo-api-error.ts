import { Nabi } from "@/models/nabi";
import { AxiosError } from "axios";

export function ensureApiSuccess<T>(result: Nabi.ApiResult<T>): T {
  if (!result.success) {
    throw new MooApiError(result.message);
  }
  return result.data;
}

export class MooApiError extends Error {
  from: "api" | "http" | "unknown" = "api";
  status = 200;
  message = "";

  constructor(message: string, from: "api" | "http" | "unknown" = "api", status = 200) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MooApiError);
    }

    this.from = from;
    this.status = status;
    this.message = message;
  }

  static fromError(e: unknown): MooApiError {
    if (e instanceof MooApiError) {
      return e;
    }

    if (e instanceof AxiosError) {
      return new MooApiError(e.message, "http", e.response?.status);
    }

    if (e instanceof Error) {
      const errorMessage = e.message || e.toString();
      return new MooApiError(errorMessage, "unknown", 200);
    }

    return new MooApiError("Not a error type object", "unknown", 200);
  }
}