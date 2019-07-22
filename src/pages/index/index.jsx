import Taro, { Component } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'

import { add, minus, asyncAdd } from '../../actions/counter'
import {
  AtButton,
  AtAvatar,
  AtModal, AtModalHeader, AtModalContent, AtModalAction
} from 'taro-ui'

import './index.styl'


@connect(({ counter }) => ({
  counter
}), (dispatch) => ({
  add () {
    dispatch(add())
  },
  dec () {
    dispatch(minus())
  },
  asyncAdd () {
    dispatch(asyncAdd())
  }
}))

class Index extends Component {

  state = {
    modalOpened: false,
    geoLocation: {
      longitude: 0,
      latitude: 0
    },
    avatarUrl: ''
  };

  dishes = ['猫屎', '老乡鸡','东北水饺', '宁夏枸杞', '大鼓米线','牛百碗', '小圆唐'];

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidMount() {
     // wx.showToast({
     //   title: 'hi 看看今天吃啥吧',
     //   icon: 'success',
     //   duration: 2000
     //  });
     wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setState({
          ...this.state.geoLocation,
          latitude: res.latitude,
          longitude: res.longitude
        });
      }
     });
     wx.getUserInfo({
        success: function(res) {
            var userInfo = res.userInfo
            // var nickName = userInfo.nickName
            // var avatarUrl = userInfo.avatarUrl
            // var gender = userInfo.gender //性别 0：未知、1：男、2：女
            // var province = userInfo.province
            // var city = userInfo.city
            // var country = userInfo.country
            this.setState({avatarUrl: userInfo.avatarUrl});
        }
    });
  }

  componentDidShow () {
    // console.log(wx.getUserInfo())
  }

  componentDidHide () { }

  _getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  render () {
    const {modalOpened, longitude, latitude, avatarUrl} = this.state;
    const restaurant = this.dishes[this._getRand(0, this.dishes.length)];

    return (
      <View className='index'>
        <AtAvatar circle image={avatarUrl}></AtAvatar>
        <map longitude={longitude} latitude={latitude}></map>
        {/*<Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View><Text>{this.props.counter.num}</Text></View>*/}
        
        <AtButton type='primary' className='btn' onClick={() => {
            this.setState({
              modalOpened: true
            });
        }}>今天吃啥</AtButton>
        <AtModal
          isOpened={modalOpened}
          title='决定了～今天这吃个！'
          cancelText='取消'
          confirmText='确认'
          onCancel={() => this.setState({modalOpened: false})}
          onConfirm={() => {
              this.setState({modalOpened: false},
                () => {
                    wx.showToast({
                    title: `${restaurant} 走起！`,
                    icon: 'success',
                    duration: 2500
                  });
                }
              )
          }}
          content={`吃 ${restaurant}`}
        />
      </View>
    )
  }
}

export default Index
