import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import DishDetailComponent from './DishdetailComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postComment, fetchDishes, fetchPromos, fetchComments, fetchLeaders } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

class Main extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchPromos();
        this.props.fetchComments();
        this.props.fetchLeaders();
    }

    onDishSelect(dishId){
        this.setState({ selectedDish: dishId });
    }


    render(){

        const HomePage = () => {
            return(
                <Home dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                      dishesLoading={this.props.dishes.isLoading}
                      dishesErrMess={this.props.dishes.errMess}
                      promotion={this.props.promotions.promotions.filter((promo) => promo.featured)[0]}
                      promosLoading={this.props.promotions.isLoading}
                      promosErrMess={this.props.promotions.errMess}
                      leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                      leadersIsLoading={this.props.leaders.isLoading}
                      leadersErrMess={this.props.leaders.errMess}
            />
            )
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetailComponent
                    dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMess={this.props.dishes.errMess}
                    comments={this.props.comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
                    commentsErrMess={this.props.comments.errMess}
                    postComment={this.props.postComment}
                />
            )
        };

        return (
            <div>
                <Header/>
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route exact path="/menu" component={ () => <Menu dishes={this.props.dishes} /> }/>
                    <Route path="/menu/:dishId" component={DishWithId}/>
                    <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/> }/>
                    <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/> }/>
                    <Redirect to="/home"/>
                </Switch>
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promotions: state.promotions,
    }
};

const mapDispatchToProps = (dispatch) => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: ()  => { dispatch(fetchDishes()) },
    fetchPromos: ()  => { dispatch(fetchPromos()) },
    fetchComments: ()  => { dispatch(fetchComments()) },
    fetchLeaders: () => { dispatch(fetchLeaders())},
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
