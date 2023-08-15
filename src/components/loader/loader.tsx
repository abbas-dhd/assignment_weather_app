import styles from './loader.module.css';

/**
 * Component to display loader animation
 * @returns Loader Component
 */
function Loader() {
  return <div className={styles.lds_dual_ring}></div>;
}

export default Loader;
