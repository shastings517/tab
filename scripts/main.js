var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router  = ReactRouter.Router;
var Route = ReactRouter.Route;
var History = ReactRouter.History;
var createBrowserHistory = require('history/lib/createBrowserHistory');

var h = require('./helpers');
/*
  App
*/

var App = React.createClass({
  getInitialState : function(){
    return {
      tabLine: {}
      // dash: {value: "-"}
    };
  },

  updateTabLine: function(length){
    console.log("length", length);
    console.log("tabLine", this.state.tabLine);

    // this.setState({
    //   value:modifiedValue
    // })
    // this.setState({ tabLine : {}});
    var tabLine = this.state.tabLine

    for(var i=0; i<length;i++){
      console.log(this.state.tabLine)
      tabLine[i] = {key:i, display:'-', value:'-'};
      // return tabLine;
    }

    this.setState({ tabLine : tabLine });
    
  },

  render : function() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="write and save tabs"/>
        </div>  
        <OptionsContainer value={this.state.tabLine} updateTabLine={this.updateTabLine}/>
        <TabLines tabLine={this.state.tabLine}/>
      </div>
    )
  }
});

var OptionsContainer = React.createClass({
  render : function() {
    return (
      <div>
        <h1>Options</h1>
        <Options {...this.props}/>
      </div>
    )
  }
});

var Options = React.createClass({
  // createTabLine : function(event){
  //   // update to do this by window width
  //   event.preventDefault();
  //   //set tabline length to input value 
  //   var length = this.refs.length.value;
    
  //   this.props.makeTabLine(length)
  // },
  // value: 60,
  update:function(){
    var modifiedValue=this.refs.length.value;
    this.props.updateTabLine(modifiedValue);
  },
  render : function() {

    return (
      // <form className="fish-edit" ref="fishForm" onSubmit={this.createTabLine(this.refs.length.value)}>
      <div className="options">
        <h3>tab line length</h3>
          <input type='number' ref='length' placeholder='length' value={this.props.value} onChange={this.update}/>
      </div>
    )
  }
  // render : function() {

  //   return (
  //     // <form className="fish-edit" ref="fishForm" onSubmit={this.createTabLine(this.refs.length.value)}>
  //     <div className="options">
  //       <h3>tab line length</h3>
  //       <form onSubmit={this.createTabLine}>
  //         <input type='text' ref='length' placeholder='length' onChange={this.update}/>
  //         <input type='submit'/>
  //       </form>
  //     </div>
  //   )
  // }
});

/*
  Inventory
  <Inventory/>
*/
var TabLines = React.createClass({
  // selectDash: function() {

  // },
  renderDash : function(key){
    var dash = this.props.tabLine[key];
    var dashStyle = {display: "inline"};
    // console.log(dash)
    return (
      <div style={dashStyle} key={key} details={dash}>{dash.display} </div>
    )
  },
  render : function() {
    console.log(Object.keys(this.props.tabLine))
    var dashIds = Object.keys(this.props.tabLine);
    return (
      <div className="tabLineContainer">
        <div className="tabLine1">{dashIds.map(this.renderDash)}</div>
        <div className="tabLine2">{dashIds.map(this.renderDash)}</div>
        <div className="tabLine3">{dashIds.map(this.renderDash)}</div>
        <div className="tabLine4">{dashIds.map(this.renderDash)}</div>
        <div className="tabLine5">{dashIds.map(this.renderDash)}</div>
        <div className="tabLine6">{dashIds.map(this.renderDash)}</div>
      </div>
    )
  }
});

/*
  Header
  <Header/>
*/
var Header = React.createClass({
  render : function() {
    return (
      <header className="title">
        <h1>Tab Writer</h1>
        <h3 className="tagline">{this.props.tagline}</h3>
      </header>
    )
  }
});

/* 
  StorePicker
  This will let us make <StorePicker/>
*/

var SignIn = React.createClass({
  mixins : [History],
  signIn : function(event) {
    event.preventDefault();
    // get the data from the input
    var userId = this.refs.userId.value;
    this.history.pushState(null, '/user/' + userId);
  },

  render : function() {
    return (
      <form className="store-selector" onSubmit={this.signIn}>
        <h2>username</h2>
        <input type="text" ref="userId" required />
        <h2>password</h2>
        <input type="text" ref="password" required />
        <input type="Submit" />
      </form>
    )
  }
});

/*
  Not Found
*/

var NotFound = React.createClass({
  render : function() {
    return <h1>Not Found!</h1>
  }
});


/*
  Routes
*/

var routes = (
  <Router history={createBrowserHistory()}>
    <Route path="/" component={SignIn}/>
    <Route path="/user/:userId" component={App}/>
    <Route path="*" component={NotFound}/>
  </Router>
)

ReactDOM.render(routes, document.querySelector('#main'));