import {Component, Input, OnInit} from '@angular/core';
import {Hero} from './hero';
//below added for detail route...
import {ActivatedRoute, Params} from '@angular/router';
import {HeroService} from './hero.service';
//Input no longer needed(?)


@Component({
  selector: 'my-hero-detail',
  templateUrl: 'app/hero-detail.component.html',
  styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input()
  hero: Hero;
  constructor(
    private heroService:HeroService,
    private route:ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      let id = +params['id'];
      this.heroService.getHero(id)
        .then( h => this.hero = h );
    })
  }
  goBack() {window.history.back()};
}