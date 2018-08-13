import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import firebase from 'firebase';
import favorited from '../../firebaseReq/myPicsFavorited';
import './Dashboard.css';

class Dashboard extends React.Component {
  state = {
    data: [],
  }

  componentDidMount () {
    const myId = firebase.auth().currentUser.uid;

    //  Gets all pics that have been saved by users, then filters to return only the pics whose photogIds match the current user's id.
    favorited
      .getFavTotals()
      .then((savedPics) => {
        const mySavedWork = savedPics.filter(savedPic => {
          return (savedPic.photogId === myId);
        });
        this.setState({ data: mySavedWork });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const { data } = this.state;
    const picList = this.state.data.map(pic => {
      return (
        <div className="row pic-id-list row-eq-height" key={pic.picId}>
          <h5 className="col-md-1 col-md-offset-4 pic-id">{pic.picId}</h5>
          <p className="col-md-4 pic-name">{pic.name}</p>
        </div>
      );
    });

    //  Creates appropriate photographer dahsboard display based on whether any pics have been saved by users.
    let photogDisplay;
    (data.length > 0) ?
      (
        photogDisplay = (
          <div className="photog-display">
            <h4>Here's a list of your pics that have been saved by users:</h4>
            {picList}
          </div>
        )
      ) : (
        photogDisplay = (
          <div className="photog-display">
            <h4>No pics have been saved by users yet!</h4>
          </div>
        )
      );

    return (
      <div className="Dashboard col-md-12">
        <h1>My Dashboard</h1>
        {
          //  Only show a bar chart if this photographer's pics have been saved by users.
          (data.length > 0) ?
            (
              <ResponsiveContainer width="100%" height={500}>
                <BarChart width={800} height={500} data={this.state.data}>
                  <XAxis dataKey="picId" stroke="#717171" />
                  <YAxis />
                  <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }} />
                  <Legend width={100} wrapperStyle={{ top: 30, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
                  <CartesianGrid stroke="#ccc" fill="#163b34" strokeDasharray="5 5" />
                  <Bar type="monotone" dataKey="total" fill="#69ab0b" barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              null
            )
        }
        {photogDisplay}
      </div>
    );
  }
}

export default Dashboard;
