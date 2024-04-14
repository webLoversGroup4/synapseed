import { createBrowserRouter } from "react-router-dom";
import SignUp from "./views/SignUp";
import Dashboard from "./views/Dashboard";
import HomePage from "./views/HomePage";
import SignIn from "./views/SignIn";
import Logout from "./views/Logout";
import Upload from "./views/Upload";
import Settings from "./views/Settings";
import Search from "./views/Search";
import ResearchPaperDetail from "./views/ResearchPaperDetail";
import Notifications from "./views/Notifications";
import UserProfile from "./views/UserProfile";
import CommentsSection from "./views/CommentsSection";
import Chat from "./views/Chat";
import GuestLayout from "./components/GuestLayout"
import DefaultLayout from "./components/DefaultLayout"


const mode = 'light';
const router = createBrowserRouter([
	{
		path: '/',
		element: < DefaultLayout />,
		children: [
	    {
			path: '/',
			element: <Dashboard />
		},

		{
			path: '/upload',
			element: <Upload />
		},

		{
			path: '/chat',
			element: <Chat />
		},

		{
			path: '/settings',
			element: <Settings />
		},

		{
			path: '/search',
			element: <Search />
		},
		{
			path: '/details',
			element: <ResearchPaperDetail />
		},

		{
			path: '/notifications',
			element: <Notifications />,
		},

		{
			path: '/profile',
			element: <UserProfile />
		},

		{
			path: '/comments',
			element: <CommentsSection />
		},

		{
			path: '/logout',
			element: <Logout />
		},
	]
	},
 
	{
		path: '/',
		element: <GuestLayout mode={mode}/>,
		children: [
			{
				path: '/signup',
				element: <SignUp />
			},

			{
				path: '/login',
				element: <SignIn />
			},

			{
				path: '/homepage',
				element: <HomePage />
			},
		]
	}
])

export default router;