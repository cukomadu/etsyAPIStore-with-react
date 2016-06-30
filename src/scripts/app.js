import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'

//Etsy App
const etsyApp = function(){
	
	//::::: REACT APP VIEWS ::::://

	//Main Container (Parent Div) that holds all other elements on the page; it has 4 Div Children
	var EtsyContainerView = React.createClass({
		render: function(){
			//console.log('here comes this object')
			//console.log(this)
			//console.log('here comes props object')
			//console.log(this.props)
			return (
						<div className="etsyContainerView">
							<Header />
							<NavBar />
						{ /* i'm defining a custome key:value pair (listingsColl) to access the etsy object collection props object later */ }
							<ListingsContainer etsyColl={this.props.etsyColl}/>  
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

		_getJsxArray: function(etsyCollArray) {
			var jsxArray = []

			etsyCollArray.forEach(function(etsyCollArrayElement,i){
				jsxArray.push(<ListingCard key={i} listing={etsyCollArrayElement} />)
			})
			return jsxArray
		},

		render: function(){
			//console.log('here comes collection')
			//console.log(this.props.etsyColl)
			return (
						<div className="listings-container">
								{this._getJsxArray(this.props.etsyColl.models)} 
						</div>
					)
		}

		})

			//ListingsContainer Div Child - ListingCard
			var ListingCard = React.createClass({

				_handleListingClick: function(evtObj){
					//console.log(evtObj.currentTarget.dataset['lid'])
					location.hash = `/details/${evtObj.currentTarget.dataset['lid']}`
				},
			
				render:function(){
					//console.log('here comes models')
					//console.log(this.props.etsyColl.listing)
					return (
								<div className="listingCard" data-lid={this.props.listing.get('listing_id')}  onClick={this._handleListingClick}>
									<img src={this.props.listing.get('Images')[0].url_170x135}  />
									<p>{this.props.listing.get('title')}</p>
									<p>{`$ ${this.props.listing.get('price')}`}</p>
									{/*<p>Esty Listings Coming Soon....</p> */}
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


	// Single View

	var EtsySingleView = React.createClass({
		render: function(){
			console.log(this.props.etsyModel)
			return (
						<div className="etsySingleView">
							<img src={this.props.etsyModel.get('Images')[0].url_170x135}  />
							<p>{this.props.etsyModel.get('title')}</p>
							<p>{`$ ${this.props.etsyModel.get('price')}`}</p>
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
		url: function(){
			console.log('here comes listing_id', this.id)
			return 'https://openapi.etsy.com/v2/listings/' + this.id + '.js'
		},
		_includes: 'Images,Shop',
		_apiKey: '9l87ijwnzalacowcpoicgfsb',
		parse: function(rawJSON){
			console.log(rawJSON.results[0])
			return rawJSON.results[0]
		},

		initialize: function(listingId){
			this.id = listingId
		}

	})


	//Backbone Collections
		//Etsy Detail Collection// params URL - includes=Images,Shop&callback=?&api_key=9l87ijwnzalacowcpoicgfsb
	var EtsyMultiCollection = Backbone.Collection.extend({
		url: 'https://openapi.etsy.com/v2/listings/active.js',
		_includes: 'Images,Shop',
		_apiKey: '9l87ijwnzalacowcpoicgfsb',
		parse: function(rawJSON){
			console.log(rawJSON.results)
			return rawJSON.results
		}

	})

		//Etsy Single Collection
	var EtsySingleCollection = Backbone.Collection.extend({

	})


	//Backbone Router
	var EtsyRouter = Backbone.Router.extend({
		routes: {
			'details/:id': 'showSingleView',
			//'search/:query': 'showSingleView',
			'home': 'showMultiView',
			'*catchall': 'redirect'
		},

		showSingleView: function(id){
			console.log('this is Singleview')

			var etsySingleModel = new EtsySingleModel (id)
			etsySingleModel.fetch({
				dataType: 'jsonp',
				data: {
					includes: etsySingleModel._includes,
					api_key: etsySingleModel._apiKey
				}
				
			}).then(function(){
				ReactDOM.render(<EtsySingleView etsyModel={etsySingleModel} />, document.querySelector('.container'))
			})
		},

		showMultiView: function(){
			console.log('this is HomeView')
			var etsyHomeCollection = new EtsyMultiCollection ()
			etsyHomeCollection.fetch({
				dataType: 'jsonp',
				data: {
					includes: etsyHomeCollection._includes,
					api_key: etsyHomeCollection._apiKey
				}
			}).then(function(){
				ReactDOM.render(<EtsyContainerView etsyColl={etsyHomeCollection} />, document.querySelector('.container'))
			})
		},

		redirect: function(){
			location.hash = "home"
		},


		initialize: function(){
			Backbone.history.start()
		}

	})

	new EtsyRouter()
	//ReactDOM.render(<EtsyContainerView />, document.querySelector('.container'))
}

etsyApp()