import styles from './error-modal.module.css';
import errorIcon from '../../assets/icons/error_icon.svg';
import { ERROR_HEAD_LINE } from '../../utils/constants/constants';
type ErrorModalProps = {
  errorMessage: string;
  buttonText: string;
  buttonClick: () => void;
};

/**
 * A modal component for displaying error messages.
 */

function ErrorModal({
  errorMessage,
  buttonText,
  buttonClick,
}: ErrorModalProps): JSX.Element {
  return (
    <div className={styles.modal_container}>
      <div className={styles.modal_body}>
        <img src={errorIcon} alt="Error icon" />
        <h2 className={styles.modal_header}>{ERROR_HEAD_LINE}</h2>
        <div>
          <p>{errorMessage}</p>
        </div>
        <div>
          <button className={styles.modal_button} onClick={buttonClick}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModal;
