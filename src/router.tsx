import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import Kr from "./routes/Kr";
import Jp from "./routes/Jp";
import NotFound from "./routes/NotFound";
import Main from "./routes/main";



const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Main />,
              },        
            {
                path:"kr",
                element: <Kr />,

            },
            {
                path:"Jp",
                element: <Jp />,
            }
        ]
    },
]);

export default router;