import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, favorite} = props
  const {id, title, date, isStartd} = appointmentDetails
  const star = isStartd
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const isFave = () => {
    favorite(id)
  }

  return (
    <li>
      <div className="title-star">
        <p className="apo-title">{title}</p>
        <button type="button" className="str-button" onClick={isFave}>
          <img src={star} alt="star" />
        </button>
      </div>
      <p className="date-style">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
