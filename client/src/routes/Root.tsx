import '../App.css';
import Preloader from '../components/Preloader/Preloader';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';
import { Outlet } from 'react-router-dom';
import { preloadScreen } from '../utils/utils';

function Root() {
  const { isLoading } = preloadScreen()

  return (
    <>
      {isLoading ? <Preloader /> : (
        <div>
          <Nav />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Root;
