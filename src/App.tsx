import {createHashRouter, Link, Outlet, RouterProvider} from "react-router-dom";
import {AssetsRoute} from "./AssetsRoute";
import {PlayRoute} from "./PlayRoute";

const router = createHashRouter([
    {
        path: "/play",
        element: <PlayRoute/>,
    },
    {
        path: "/",
        element: <div>
            <div>
                <Link to={""} style={{margin: "0.5em"}}>Play</Link>

                <Link to={"assets"} style={{margin: "0.5em"}}>Assets</Link>
            </div>

            <Outlet/>
        </div>,
        children: [
            {
                path: "/",
                element: <PlayRoute/>,
            },
            {
                path: "/assets",
                element: <AssetsRoute/>,
            },
        ]
    },
]);

export const App = () => <RouterProvider router={router}/>;
