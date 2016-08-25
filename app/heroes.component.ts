import { Component, OnInit } from '@angular/core';
import { Hero } from './hero'
//import {} from './hero-detail.component' //not needed because of app.module.ts
import {HeroService} from './hero.service'
import {Router} from '@angular/router';

@Component({
    selector: 'my-heroes',
    templateUrl: 'app/heroes.component.html',
    styleUrls:  ['app/heroes.component.css']
    //providers: [HeroService]    //not needed because of provider in app.module.ts
})
export class HeroesComponent implements OnInit { 
  //hero:Hero = {id:1, name:'Windstorm'};    // hero:Hero = new Hero(1,'Windstormy');
  // public heroes = HEROES;
  title = 'Tour of Heroes';
  selectedHero: Hero;
  addingHero: boolean;
  heroes: Hero[];
  error:any;

  constructor(
    private heroService: HeroService,
    private router:Router) {}

  getHeroes() {
    // this.heroes = this.heroService.getHeroes()
    this.heroService.getHeroes().then(
      (heroes) => this.heroes = heroes 
    )
  }
  onSelect (hero: Hero) {this.selectedHero=hero};
  gotoDetail(hero:Hero) {
    let link = ['/detail', this.selectedHero.id];
    this.router.navigate(link);
  }
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }
  deleteHero(hero:Hero, event:any) {
    event.stopPropagation();
    this.heroService
      .delete(hero)
      .then(res => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) {this.selectedHero = null};
      })
      .catch(err => this.error = err)
  }
  close(savedHero:Hero) {
    this.addingHero = false;
    if (savedHero) {this.getHeroes()};
  }

  ngOnInit() {
    this.getHeroes();
  }
}





// const HEROES: Hero[] = [
//   { id: 11, name: 'Mr. Nice' },
//   { id: 12, name: 'Narco' },
//   { id: 13, name: 'Bombasto' },
//   { id: 14, name: 'Celeritas' },
//   { id: 15, name: 'Magneta' },
//   { id: 16, name: 'RubberMan' },
//   { id: 17, name: 'Dynama' },
//   { id: 18, name: 'Dr IQ' },
//   { id: 19, name: 'Magma' },
//   { id: 20, name: 'Tornado' }    
// ];

