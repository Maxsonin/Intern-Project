import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "@/shared/components/routers/ProtectedRoute";
import MainLayout from "../layouts/MainLayout";
import AuthPage from "../pages/AuthPage";
import LineItemPage from "../pages/LineItemPage";
import LogPage from "../pages/LogPage";
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

			{
				element: <ProtectedRoute />,
				children: [{ path: "lineitem", element: <LineItemPage /> }],
			},
		],
	},
	{ path: "signin", element: <AuthPage /> },
	{ path: "log", element: <LogPage /> },
]);
