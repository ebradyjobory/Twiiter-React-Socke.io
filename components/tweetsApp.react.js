module.exports = TweetsApp = React.createClass({
  render: function () {
    return (
      <div className="tweets-app">
        <Tweets tweets={ this.state.tweets }/>
	<Loader paging={ this.state.paging }/>
	<NotifucationsBar count={ this.state.count } onShowNewTweets={ this.showNewTweets }/>
      </div>
    );
  
  }
});
