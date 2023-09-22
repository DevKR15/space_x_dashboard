import '../App.css';
import Nav from '../components/Nav';

function Home() {
  return (
    <>
      <Nav />
      <div className="flex w-full h-screen overflow-hidden justify-center items-center">
        <a href="https://www.spacex.com/human-spaceflight/" target="_blank">
          <img
            src={require('../assets/icon.png')}
            className="self-center"
            alt=""
          />
        </a>
      </div>
    </>
  );
}

export default Home;
