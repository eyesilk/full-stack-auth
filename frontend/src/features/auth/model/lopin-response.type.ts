import { User } from "@/entities/auth";
import { MessageResponse } from "./message-response.type";

export type LoginResponse = User | MessageResponse;
