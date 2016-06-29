import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

//Etsy App
const etsyApp = function(){
	
	//::::: REACT APP VIEWS ::::://

	//Main Container (Parent Div) that holds all other elements on the page; it has 4 Div Children
	var EtsyContainerView = React.createClass({
		render: function(){
			return (
					<div className="etsyContainerView">
						<Header />
						<NavBar />
					{ /* i'm defining a custome key:value pair (listingsColl) to access the etsy object collection props object later */ }
						<ListingsContainer listingsColl={this.props.listingsColl}/>  
						<Footer />
					</div>
				)
		}
	})

		//First Main Container Div Child - Header
		var Header = React.createClass({
		render: function(){
			return (	
				  	<div className="header">
				  		<h1>Etsy</h1>
				  		<input type="text" placeholder="Search for an Item"/>
				  	</div>
				)
		}
		})

		//Second Main Container Div Child - NavBar
		var NavBar = React.createClass({
		render: function(){
			return (
					<div className="nav-buttons">
						<ul className="nav-headings">
							<li>Home</li>
							<li>Clothing</li>
							<li>Jewelry</li>
							<li>Craft Supplies</li>
							<li>Wedding</li>
						</ul>
					</div> 

				)
		}
		})

		//Third Main Container Div Child - ListingsContainer
		var ListingsContainer = React.createClass({
		render: function(){
			return (
					<div className="listings-container">
						<ListingCard />
					</div>
				)
		}
		})

			//ListingsContainer Div Child - ListingCard
			var ListingCard = React.createClass({
			render:function(){
				return (
						<div className="listingCard">
							<p>Esty Listings Coming Soon....</p>

						</div>
					)
			}
			})

		//Fourth Main Container Div Child - Footer
		var Footer = React.createClass({
		render: function(){
			return (
					<div className="footer">
						<p>2016 Chichi Etsy API Project</p>  
						<p>Legal</p>
						<p>Privacy</p> 
						<p>Interest-based ads</p> 	
					</div> 
				)
		}
		})


	//::::: BACKBONE APP ROUTER, COLLECTION AND MODELS ::::://

	//Backbone Models
		//Etsy Detail Model
	var EtsyMultiModel = Backbone.Model.extend({

	})

		//Etsy Single Model
	var EtsySingleModel = Backbone.Model.extend({

	})


	//Backbone Collections
		//Etsy Detail Collection
	var EtsyMultiCollection = Backbone.Collection.extend({

	})

		//Etsy Single Collection
	var EtsySingleCollection = Backbone.Collection.extend({

	})


	//Backbone Router
	var EtsyRouter = Backbone.Router.extend({
		routes: {
			'details/:id': 'showMultiView',
			'search/:query': 'showSingleView',
			'home': 'showHomePage',
			'*catchall': 'redirect'
		},

		redirect: function(){
			location.hash = "home"
		},


		initialize: function(){
			Backbone.history.start()
		}

	})

	//new EtsyRouter()
	ReactDOM.render(<EtsyContainerView />, document.querySelector('.container'))
}

etsyApp()