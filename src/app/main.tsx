import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

// Lazy load only NewsPage
const NewsPage = lazy(() => import("./pages/NewsPage"));

const router = createBrowserRouter([
	{
		element: <MainLayout />,
		errorElement: <NotFoundPage />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "news", element: <NewsPage /> },
		],
	},
	{ path: "signup", element: <AuthPage /> },
]);

createRoot(rootElement).render(
	<StrictMode>
		<Suspense fallback={<div className="p-4">Loading...</div>}>
			<RouterProvider router={router} />
		</Suspense>
	</StrictMode>,
);
