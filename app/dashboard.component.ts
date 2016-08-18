import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import {HeroService} from './hero.service';
import {Router} from '@angular/router';


@Component({
  selector: 'my-dashboard',
  templateUrl: 'app/dashboard.component.html',
  styleUrls: ['app/dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  constructor(
    private heroService:HeroService,
    private router:Router) {}
  
  gotoDetail(hero:Hero) {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

  ngOnInit() {
    this.heroService.getHeroes()
      .then( (heroes) => this.heroes = heroes.slice(0,5) )
  }

}//class