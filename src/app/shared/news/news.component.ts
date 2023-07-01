import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input() category_text: String = "agriculture"
  @Input() country:String='in'
  @Input() isOnlyNewsHeadlines:boolean=true

  newsData: any[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {

    if(this.isOnlyNewsHeadlines){
      this.getHealines()
    }else[
      this.getgategoryNews()
    ]
   

  }


  getHealines(){
    this.http.get(`https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=dac7a82efad74e56a64fbe71b82fcaab`).subscribe((res: any) => {
      console.log("News", res);
      if(res.status=='ok' && res.articles.length>0){
        this.newsData=res.articles;
      }

    })
  }


  getgategoryNews(){
    this.http.get(`https://newsapi.org/v2/everything?q=${this.category_text}&apiKey=dac7a82efad74e56a64fbe71b82fcaab`).subscribe((res: any) => {
      console.log("Category News", res);
      if(res.status=='ok' && res.articles.length>0){
        this.newsData=res.articles;
      }

    })

  }

}
