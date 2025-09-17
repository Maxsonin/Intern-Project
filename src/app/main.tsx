import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import NewsPage from "./pages/NewsPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./index.css";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

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
		<RouterProvider router={router} />
	</StrictMode>,
);
