import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider";
import "virtual:plugins";
import * as Sentry from "@sentry/react";

Sentry.init({
	dsn: "https://608d556a5c90582a0df2d17f0edf4298@o4510130402426880.ingest.de.sentry.io/4510130407211088",
	sendDefaultPii: true,
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

const queryClient = new QueryClient();

createRoot(rootElement).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<Suspense fallback={<div className="p-4">Loading...</div>}>
				<AuthProvider>
					<RouterProvider router={router} />
				</AuthProvider>
			</Suspense>
		</QueryClientProvider>
	</StrictMode>,
);
