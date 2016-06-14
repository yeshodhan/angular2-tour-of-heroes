import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Hero} from "./hero";
import {RouteParams} from "@angular/router-deprecated";
import {HeroService} from "./hero.service";

@Component({
    selector: 'my-hero-detail',
    templateUrl:'app/hero-detail.component.html',
    styleUrls:['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    ngOnInit() {
        if(this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id');
            this.navigated = true;
            this.heroService.getHero(id)
                .then(hero => this.hero = hero)
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    navigated: boolean = false;
    error: any;
    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams ) {
    }
    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        if(this.navigated) {
            window.history.back();
        }
    }
    save() {
        this.heroService
            .save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack(hero);
            })
            .catch(error => this.error = error);
    }
}