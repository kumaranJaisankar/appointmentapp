import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    staredList: [],
    title: '',
    date: '',
    strBtn: false,
  }

  onInputTitle = event => {
    this.setState({title: event.target.value})
  }

  onInputDate = event => {
    this.setState({date: event.target.value})
  }

  bookAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date: format(new Date(date), 'dd MMMM yyyy, EEEE'),
      isStartd: false,
    }
    this.setState(prev => ({
      appointmentList: [...prev.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  favorite = id => {
    this.setState(prev => ({
      appointmentList: prev.appointmentList.map(each => {
        if (id === each.id) {
          return {...each, isStartd: !each.isStartd}
        }
        return each
      }),
    }))
  }

  onStaredBtn = () => {
    const {appointmentList} = this.state
    const filterStared = appointmentList.filter(each => each.isStartd === true)
    this.setState(prev => ({
      staredList: filterStared,
      strBtn: !prev.strBtn,
    }))
  }

  render() {
    const {appointmentList, staredList, title, date, strBtn} = this.state
    const strBtnStyle = strBtn ? 'str-clicked-button' : 'star-btn'
    const listOfAppoinment = strBtn ? staredList : appointmentList

    return (
      <div className="container">
        <div className="inside-card">
          <div className="inside-card-container">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.bookAppointment}>
                <label htmlFor="inputTitle">TITLE</label>
                <input
                  value={title}
                  type="text"
                  id="inputTitle"
                  placeholder="Title"
                  onChange={this.onInputTitle}
                />
                <label htmlFor="date">DATE</label>
                <input
                  value={date}
                  id="date"
                  type="date"
                  onChange={this.onInputDate}
                />
                <button type="submit" className="button">
                  Add
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img-size"
            />
          </div>
          <hr />
          <div className="appointment">
            <h1 className="para">Appointments</h1>
            <button
              onClick={this.onStaredBtn}
              type="button"
              className={strBtnStyle}
            >
              Starred
            </button>
          </div>
          <ul className="unorder-list">
            {listOfAppoinment.map(each => (
              <AppointmentItem
                key={each.id}
                appointmentDetails={each}
                favorite={this.favorite}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
