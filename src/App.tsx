import Layout from "@/components/layout";
import { NavigationProvider } from "@/context";
import Home from "@/pages/home";
import Movies from "@/pages/movies";
import Series from "@/pages/series";
import Sports from "@/pages/sports";
import { init } from "@noriginmedia/norigin-spatial-navigation";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

init({
  debug: false,
  visualDebug: false,
  distanceCalculationMethod: "center",
});

const Providers = () => {
  return (
    <NavigationProvider>
      <Layout />
    </NavigationProvider>
  )
}

const route = [{
  path: "/",
  Component: Providers,
  children: [
    {
      index: true,
      Component: Home,
    },
    {
      path: "movies",
      Component: Movies,
    },
    {
      path: "series",
      Component: Series,
    },
    {
      path: "sports",
      Component: Sports,
    },
  ],
}];

const router = createMemoryRouter(route);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<Fallback />} />
  );
}
export function Fallback() {
  return <>Loading</>;
}