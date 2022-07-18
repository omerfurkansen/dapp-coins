import SpinnerSvg from '../assets/spinner.svg';

export default function Spinner() {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={SpinnerSvg} alt="loading" width="50%" />
    </div>
  );
}
