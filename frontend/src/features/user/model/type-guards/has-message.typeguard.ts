import { MessageResponse } from "../message-response.type";

export function hasMessage(data: unknown): data is MessageResponse {
  return (
    typeof data === "object" &&
    data !== null &&
    "message" in data &&
    typeof (data as MessageResponse).message === "string"
  );
}
