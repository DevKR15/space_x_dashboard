import '../App.css';
import Nav from '../components/Nav';
import Launches from '../components/launches';
import UpcomingLaunches from '../components/upcomingLaunches';

function Dashboard() {
  return (
    <>
      <Nav />
      <div className="w-full h-screen overflow-auto">
        <div className="pt-24 ml-3 mr-3">
          <div className="text-3xl text-white">Launches</div>
          <Launches />
        </div>
        <div className="pt-10 ml-3 mr-3 pb-4">
          <div className="text-3xl text-white">Upcoming Launches</div>
          <UpcomingLaunches />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
