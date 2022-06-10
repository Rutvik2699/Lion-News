import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
    }
    capitalizeFirstLetter = (string)=> {
        return string.charAt(0).toUpperCase()+string.slice(1);
    }
    constructor(props){
        super(props);
        this.state = {
            articles:[],
            loading: true,
            page:1,
            totalResults:0
    }
     document.title= `${this.capitalizeFirstLetter(this.props.category)} - Lion News`;   
    }

    async updateNews(){

        this.props.setProgress(0);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json()
        console.log(data);
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults, loading: false})
        this.props.setProgress(0);
    }
   
   async componentDidMount(){
       this.updateNews();
       /* let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89ce4ce085e74f77b6b60e4ef4c62863&page=1&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json()
        console.log(data);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })*/
    }

    handlePrevClick= async()=>{

            console.log("Previous");
        /*    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89ce4ce085e74f77b6b60e4ef4c62863&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
            this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json()
        console.log(parsedData);
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading:false
        }) */
            this.setState({page: this.state.page-1});
            this.updateNews();
    }

    handleNextClick= async()=>{
        console.log("Next");
    /*    if(!(this.state.page + 1  > Math.ceil(this.state.totalResults/this.props.pageSize))){
       
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=89ce4ce085e74f77b6b60e4ef4c62863&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true});
        let data= await fetch(url);
        let parsedData= await data.json()
      
        this.setState({
            page:this.state.page + 1,
            articles: parsedData.articles,
            loading:false
        })*/
        this.setState({page: this.state.page+1});
       this.updateNews();
    
    }

    fetchMoreData = async() => {

        this.setState({page: this.state.page + 1})
        this.updateNews()  
   };

    render(){
        console.log("render");
        return (
            <>


                <h1 className="text-center" style={{margin:'35px', marginTop:'90px'}}>Lion News - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h1>
               {this.state.loading&&<Spinner/>}
               
             <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!== this.state.totalResults}
          loader={<Spinner/>}
        >
               


               <div className="container">
                <div className="row">
                {this.state.articles.map((element)=>{
                    return   <div className="col-md-4" key={element.url}> 
                    <NewsItems  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,88):""}
                    imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
                </div>

                })}

                </div>
                </div>
                </InfiniteScroll>
                
               
                  
                    
                    
                
            
            </>
        )
    }

}
export default News

