import { HomePage, Login } from "../pages"

/**
 * Here we are going to define all the routes of the application.
 * Also, if there are pages that need to be decorated with our authentication hoc,
 * this is the place to do it.
 */

export const routeConfig = [
  {
    path: '/',
    element : <HomePage />,
    exact: true
  },
  {
    path: '/login',
    element : <Login />,
    exact: true
  },
  {
    path: "*",
    element : <div>404 - PAGE NOT FOUND</div>
  }
]
