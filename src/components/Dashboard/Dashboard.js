import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import firebase from 'firebase';
import favorited from '../../firebaseReq/myPicsFavorited';
import './Dashboard.css';

class Dashboard extends React.Component {
  state = {
    data: [],
  }

  componentDidMount () {
    const myId = firebase.auth().currentUser.uid;
    favorited
      .getFavTotals()
      .then((savedPics) => {
        savedPics.filter(savedPic => {
          return (savedPic.photogId === myId);
        });
        this.setState({ data: savedPics });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render () {
    const { data } = this.state;
    let photogDisplay;
    if (data) {
      photogDisplay = (
        <h3>Here's a list of your pics that have been saved by users:</h3>
      );
    } else {
      photogDisplay = (
        <h3>No pics have been saved by users yet!</h3>
      );
    }

    return (
      <div className="Dashboard col-md-12">
        <h1>My Dashboard</h1>
        <BarChart width={700} height={400} data={this.state.data}>
          <XAxis dataKey="picId" stroke="#717171" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }} />
          <Legend width={100} wrapperStyle={{ top: 30, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />
          <CartesianGrid stroke="#ccc" fill="#163b34" strokeDasharray="5 5" />
          <Bar type="monotone" dataKey="total" fill="#69ab0b" barSize={30} />
        </BarChart>
        {photogDisplay}
      </div>
    );
  }
}

export default Dashboard;
