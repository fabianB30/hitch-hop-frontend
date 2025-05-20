import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";   
import Home from "@/pages/main/Home";
import Sidebar from "@/components/shared/Sidebar";



const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Sidebar />}>
            <Route index element={<Home />} />
        </Route>
    )
    
)

const Router = () => <RouterProvider router={router}/>

export default Router; 