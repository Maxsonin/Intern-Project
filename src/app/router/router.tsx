import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";

const HomePage = lazy(() => import("../pages/HomePage"));
const NewsPage = lazy(() => import("../pages/NewsPage"));

export const router = createBrowserRouter([
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
