
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateHealth,damageByEnemy,getArmorPoints,getFoodPoints,getWeapon} from '../reducers/coodinates';
import './Info.scss';

class Info extends Component {

  render() {
    return (
      <div className="info-box">
        <ul className="info-list">
          <li>Health :{this.props.health}</li>
          <li>Food : {this.props.food}</li>
          <li>Armor : {this.props.armorPoints}</li>
          <li>Damage : {this.props.damage}</li>
        </ul>
      </div>
    );
  }

}

export default connect(
  (state)=>({health:state.score.health,damage:state.score.damage,
    armorPoints:state.score.armor,food:state.score.food}),{updateHealth,damageByEnemy,getArmorPoints,getFoodPoints,getWeapon}
)(Info);
