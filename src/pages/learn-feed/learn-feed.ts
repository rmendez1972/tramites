import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { isPresent } from 'ionic-angular/util/util';
import { LearnDetailsPage } from '../learn-details/learn-details';
import { LearnService } from '../../services/learn.service';
import { CategoryModel } from '../../services/learn.model';

@Component({
  selector: 'learn-feed-page',
  templateUrl: 'learn-feed.html',
})
export class LearnFeedPage {
  _query : string = 'all';
  data : Array<CategoryModel> = new Array<CategoryModel>();
  solicitud:Array<CategoryModel> = new Array<CategoryModel>();
  tramite:Array<CategoryModel> = new Array<CategoryModel>();
  seguimientos:Array<CategoryModel> = new Array<CategoryModel>();
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public learnService: LearnService
  ) {
    let query_param = navParams.get('query');
    this._query = isPresent(query_param) ? query_param : 'all';
  }

  ionViewWillEnter() {
    this.learnService.getFeedCategories()
    .subscribe(
      (data) => {this.data = data.data;},
    );
    this.learnService.getSolicitudes()
    .subscribe(
      (solicitud) => {this.solicitud = solicitud.solicitud;},
      );
    this.learnService.getTramite()
    .subscribe(
      (tramite)=> {this.tramite =tramite.tramite;},
      );
    this.learnService.getSeguimientos()
    .subscribe(
      (seguimientos)=>{this.seguimientos = seguimientos.seguimientos;}
      )
  }

  openDetails(params) {
    this.navCtrl.push(LearnDetailsPage, params);
  }

}
