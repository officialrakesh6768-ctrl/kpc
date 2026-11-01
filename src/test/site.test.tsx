import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";
import { routeTree } from "@/routeTree.gen";
import { services } from "@/data/site";
import { enquirySchema } from "@/lib/enquiry";

describe("KPC site", () => {
  it.each(["/", "/about", "/services", "/why-choose-us", "/gallery", "/enquiry"])("route %s exists", (p) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes(p).at(-1)?.routeId).not.toBe(rootRouteId);
  });
  it("lists all eight services", () => expect(services).toHaveLength(8));
  it("rejects an enquiry without a valid email", () => {
    expect(enquirySchema.safeParse({ name: "Jo Smith", email: "bad", phone: "2045996969", service: "Decks", message: "Need a new deck built" }).success).toBe(false);
  });
});
