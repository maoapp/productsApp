import Products from '../components/product/Product';
import Clients from '../components/clients/Clients';
import Home from '../components/home/Home';
import Contact from '../components/contact/Contact';

const Routes = [
  {
      path: "/home",
      component: Home
  },
  {
      path: "/contact",
      component: Contact
  },
  {
      path: "/client",
      component: Clients
  },
  {
      path: "/products",
      exact: true,
      component: Products,
  },
  {
      path: "/products/:productCategory",
      component: Products,
  },
  {
      path: "/:wrongRoute",
      component: WrongRoute
  }
];

export default Routes;
