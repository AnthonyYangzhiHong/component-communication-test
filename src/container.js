import React, {ReactDOM} from 'react'


var EventEmitter = {
    _events: {},
    dispatch: function (event, data) {
        if (!this._events[event]) return; // no one is listening to this event
        for (var i = 0; i < this._events[event].length; i++)
            this._events[event][i](data);
    },
    subscribe: function (event, callback) {
      if (!this._events[event]) this._events[event] = []; // new event
      this._events[event].push(callback);
      console.log(this._events);
    },
    unSubscribe: function(event){
    	if(this._events && this._events[event]) {
    		delete this._events[event];
    	}
    }
}

var MyContainer = React.createClass({
 
	render: function(){
		return (
			<div>
				<CurItemPanel />
				<SelectionButtons/>
			</div>
		)
	}
});
 
var CurItemPanel = React.createClass({
	getInitialState: function(){
		return {
			curItem: 'item1'
		}
	},
	componentDidMount: function(){
		var self = this;
		EventEmitter.subscribe('changeItem', function(newItem){
			self.setState({
				curItem: newItem
			});
		})
	},
	componentWillUnmount: function(){
		EventEmitter.unSubscribe('changeItem');
	},
	render: function(){
		return (
			<p>
				The curItem is:  {this.state.curItem}
			</p>
		)
	}
 
});
 
var SelectionButtons = React.createClass({
	onClickItem: function(item){
		EventEmitter.dispatch('changeItem', item);
	},
	render: function(){
		return (
			<div>
				<button onClick={this.onClickItem.bind(this, 'item1')}>item1</button>
				<button onClick={this.onClickItem.bind(this, 'item2')}>item2</button>
			</div>
		)
	}
});


export default MyContainer;