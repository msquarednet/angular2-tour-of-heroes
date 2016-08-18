import {Injectable} from '@angular/core'
import {HEROES} from './mock-heroes'


@Injectable()
export class HeroService {
  getHeroes() {
    return Promise.resolve(HEROES);
  }
  getHeroesSlowly() {
    return new Promise((resolve, reject)=>{
      setTimeout(()=>resolve(HEROES), 2000)
    })
  }
  getHero(id:number) {
    return this.getHeroes()
      .then( heroes => heroes.find( h => h.id===id) )
  }
}