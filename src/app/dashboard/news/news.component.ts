import { ArticleService } from './../../_services/article.service'
import { Component, OnInit } from '@angular/core'
import { ArticleModel } from 'src/app/_models/article'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  articles: ArticleModel[]

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.articleService.get().subscribe((res) => {
      this.articles = res
    })
  }
}
