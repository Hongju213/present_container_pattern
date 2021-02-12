/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

export default class extends Component {
    state = {
        nowPlaying: null,
        upcoming: null,
        popular: null,
        error: null,
        loading: true
    };

    async componentDidMount() {
        //방법 1 : 전체 API 요청을 여기에서 처리
        try{
            //async, await 작업 => javascript는 await를 기다려준다.
            //
            const  { 
                data: { results: nowPlaying }
            } = await moviesApi.nowPlaying();
            const {
                data: { results: upcoming }
            } = await moviesApi.upcoming();
            const {
                data: { results: popular }
            } = await moviesApi.popular();
            //javaScript는 nowPlaying: nowPlaying 이거나 nowPlaying 이거나 같다고 본다.
            this.setState({
                nowPlaying,
                upcoming,
                popular
            })
        }catch{
            this.setState({
                error: "Can't find movies information."
            })
        }finally{
            //뭐가 발생하든 로딩 끝
            this.setState({
                loading: false
            });
        }
        //방법 2 : 각각의 요청을 분리된 함수로 만들어서 따로 요청 => 만들고 여기에서 this.로 쓰면 됨.
    }

    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state;
        console.log(this.state);
        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upcoming={upcoming}
                popular={popular}
                error={error}
                loading={loading}
            />
        )
    }
}