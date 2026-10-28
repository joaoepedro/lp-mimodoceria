import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // landing de página única: não restaura rolagem (no Chrome do iPhone isso devolvia a página ~112px abaixo do topo)
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
