import { withAuthentication } from "../../components/hoc";

const Home = () => {
  return (
    <div></div>
  );
}

export const HomePage = withAuthentication(Home)
