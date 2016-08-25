import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
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
  @Input()    hero: Hero;
  @Output()   close = new EventEmitter();
  error: any;
  navigated = false;
  constructor(
    private heroService:HeroService,
    private route:ActivatedRoute
  ) {}
  ngOnInit() {
    this.route.params.forEach((params:Params)=>{
      if (params['id']) {
        let id = +params['id'];
        this.navigated = true;
        this.heroService.getHero(id)
          .then( h => this.hero = h );
      } else {
        this.navigated = false;
        this.hero = new Hero();
      }

    })
  }
  save() {
    this.heroService.save(this.hero)
      .then( h => {this.hero=h; this.goBack(this.hero)})
      .catch( err => this.error=err );
  }
  goBack(savedHero: Hero = null) {
    this.close.emit(savedHero);
    if (this.navigated) {window.history.back()};
  };
}