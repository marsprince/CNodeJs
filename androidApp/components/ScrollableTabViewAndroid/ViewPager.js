'use strict';

var React = require('react-native');
var {
  View,
  ViewPagerAndroid,
  Text
} = React;

var ViewPagerTabs = require("./ViewPagerTabs");
var ViewPagerDots = require("./ViewPagerDots");
var DimensionsHelper = require("./DimensionsHelper");

var ViewPager = React.createClass({
  componentDidMount: function(){
    console.log("ViewPager componentDidMount");
  },

  getDefaultProps: function(){
  },

  getInitialState: function(){
    return {
      activeTab:0
    }
  },

  goToPage: function(page){
    this.setState({activeTab: page});
  },

  onPageScroll: function(e){
    this.tabs.onPageScroll(e);
  },

  onPageSelected: function(e){
    this.tabs.onPageSelected(e);
    this.props.onChangeTab && this.props.onChangeTab({
      i: e
    });
  },

  renderTabBar() {
    if (this.props.bar === 'tabs') {
      return <ViewPagerTabs children={this.props.children} viewPager={() => {return this.viewPager}} ref={(comp) => {this.tabs = comp}} />;;
    } else {
      return <ViewPagerDots children={this.props.children} viewPager={() => {return this.viewPager}} ref={(comp) => {this.tabs = comp}} />;;
    }
  },

  render() {
    return (
      <View >
        {this.props.position == 'top' ? this.renderTabBar() : null}
        <ViewPagerAndroid ref={(comp) => {this.viewPager = comp}}
          onPageScroll={this.onPageScroll}
          onPageSelected={this.onPageSelected.bind(this)}
          style={{
            flexDirection:'row',
            backgroundColor:'#ccc',
            height: this.props.height || DimensionsHelper.SCREEN_HEIGHT,
            width: this.props.width || DimensionsHelper.SCREEN_WIDTH
          }}
          >
          {this.props.children}
        </ViewPagerAndroid>
        {this.props.position == 'bottom' ? this.renderTabBar() : null}
      </View>
    );
  }
});



module.exports = ViewPager;
