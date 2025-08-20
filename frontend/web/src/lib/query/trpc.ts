"use client";

import type { TrpcRouter } from "@packages/trpc";
import { createTRPCContext } from "@trpc/tanstack-react-query";

export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<TrpcRouter>();
