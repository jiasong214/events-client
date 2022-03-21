import '../style/loading.scss';

const Loading = ({loading}) => {
  return (
    <div className={`loading ${loading}`}>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading;