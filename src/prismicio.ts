import {
	createClient as baseCreateClient,
	type ClientConfig,
	type Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
	process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */

const routes: Route[] = [
	// Static pages
	{ type: "homepage", path: "/" },
	{ type: "now_page", path: "/now" },
	{ type: "about_me", path: "/about-me" },
	{ type: "colophone", path: "/colophon" },
	{ type: "settings", path: "/settings" },
	
	// Journal
	{ type: "journel_catalog", path: "/journel" },
	{ type: "journel_entry", path: "/journel/:uid" },
	
	// Projects
	{ type: "projects_catalog", path: "/projects" },
	{ type: "project", path: "/projects/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: ClientConfig = {}) => {
	const client = baseCreateClient(repositoryName, {
		routes,
		fetchOptions:
			process.env.NODE_ENV === "production"
				? { next: { tags: ["prismic"] }, cache: "force-cache" }
				: { next: { revalidate: 5 } },
		...config,
	});

	enableAutoPreviews({ client });

	return client;
};
