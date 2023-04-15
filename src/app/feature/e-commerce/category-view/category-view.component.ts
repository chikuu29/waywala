import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiParameterScript } from 'src/app/script/api-parameter';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss']
})
export class CategoryViewComponent implements OnInit {

  public category:string='';
  constructor(
    private _rout: ActivatedRoute,
    private router: Router,
    private apiParameterScript: ApiParameterScript,
    private appservices: AppService,
  ) { }

  ngOnInit(): void {
    this._rout.params.subscribe((res: any) => {
      console.log(res);
      this.category=res.category
      
    })
  }

}
