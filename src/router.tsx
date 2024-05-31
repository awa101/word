import { createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";

import WordProvider from './components/WordProvider';
import Kr from "./routes/Kr";
import WordDetail from "./routes/WordDetail";
import NotFound from "./routes/NotFound";
import Main from "./routes/main";



const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <WordProvider>
              <Root />
            </WordProvider>
          ),
        errorElement: <NotFound />,
        children: [
            {
                path: "",
                element: <Kr />,
              },        
            {
                path:":numbering",
                element: <WordDetail />,

            },
            {
              path:"today", 
              element: <Main />
          },       
          {
            path: "not-found",
            element: <NotFound />
          },    
        ]
    },
]);

export default router;