import Map from '../../components/Map/Map';
import Sidebar from '../../components/SideBar/Sidebar';
import styles from './AppLayout.module.css';
import User from '../../components/User/User';

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <User />
      <Map />
    </div>
  );
}

export default AppLayout;
