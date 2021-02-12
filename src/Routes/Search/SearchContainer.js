/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import { moviesApi, tvApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

export default class extends Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: true
    };

    // componentDidMount() {
    //     this.handleSubmit();
    // }

    handleSubmit = (event) => {
        event.preventDefault();
        const { searchTerm } = this.state;
        if(searchTerm !== ""){
            this.searchByTerm(searchTerm);
        }
    }

    updateTerm = (event) => {
        const { target: { value } } = event;
        this.setState({
            searchTerm: value
        })
    }

    searchByTerm = async() => {
        const { searchTerm } = this.state;
        try{
            const { 
                data: { results: movieResults}
            } = await moviesApi.search(searchTerm);
            const {
                data: { results: showResults}
            } = await tvApi.search(searchTerm);
            console.log(movieResults, showResults);
            this.setState({loding: true })
        }catch{
            this.setState({ error: "Can't find results."})
        }finally{
            this.setState({ loading: false })
        }
    }

    render() {
        const { movieResults, tvResults, searchTerm, error, loading } = this.state;
        console.log(this.state);
        return (
            <SearchPresenter 
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        )
    }
}