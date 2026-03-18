import { QueryClient } from "@tanstack/react-query";
import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { AppProviders } from "../providers";
import type { SupabaseManagerLike } from "../shared/lib/supabase/manager.types";

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

type RenderWithProvidersOptions = {
  manager: SupabaseManagerLike;
  queryClient?: QueryClient;
  renderOptions?: Omit<RenderOptions, "wrapper">;
};

export const renderWithProviders = (
  ui: ReactElement,
  { manager, queryClient, renderOptions }: RenderWithProvidersOptions
) => {
  const resolvedQueryClient = queryClient ?? createTestQueryClient();

  return render(
    <AppProviders manager={manager} queryClient={resolvedQueryClient}>
      {ui}
    </AppProviders>,
    renderOptions
  );
};
