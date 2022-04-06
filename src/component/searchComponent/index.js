import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import  './styles.css'
import 'react-datepicker/dist/react-datepicker.css';

const SearchComponent = (props) => {
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    /**
     * Passing search name to the parent AppComponent
     * @param $event
     */
     const onChange = ($event) => {
        props.onChange($event.target.value);
    }
    return (
        <div className="form-inline search-header">
            <div className="row">
                <div className="col-xs-8">
                    <div className="row">
                        <div className="col-xs-4">
                            <DatePicker
                                placeholderText="Start Date"
                                className="form-control"
                                selected={startDate}
                                onSelect={(startDate) => {
                                    setStartDate(startDate)
                                    props.onStartDateChange(startDate)
                                }}
                            />
                        </div>
                        <div className="col-xs-4">
                            <DatePicker
                                placeholderText="End Date"
                                className="form-control date-picker"
                                selected={endDate}
                                onSelect={(endDate) => {
                                    setEndDate(endDate)
                                    props.onEndDateChange(endDate, startDate)
                                }}
                                minDate={new Date(startDate)}
                            />
                        </div>
                        <div className="col-xs-4">
                            &nbsp;
                        </div>
                    </div>
                </div>
                <div className="col-xs-4 margin-bottom">
                    <div className="input-group pull-right">
                        <input type="text"
                               className="form-control"
                               id="name"
                               onChange={($event) => onChange($event)}
                               placeholder="Search By Name"/>
                        <div className="input-group-btn">
                            <button className="btn btn-primary" type="submit" disabled>
                                <i className="glyphicon glyphicon-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchComponent;
