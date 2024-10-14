import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express'
import { count } from 'console';
import { findIndex } from 'rxjs';

export class Felhasznalo{
    name: string;
    email: string;
    date: string;
    count: number;
    constructor(){
      this.name = "";
      this.email = "";
      this.date = new Date().toString();
      this.count = 1;
    }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('login')
  getHello() {
    return {
      data: new Felhasznalo(),
      errors: []
    };
  }

  @Post()
  getPost(@Body() felhasznalo : Felhasznalo, @Res() response : Response){
    var errors = []
    var date = new Date(felhasznalo.date);
    var date2 = new Date();
    
    console.log(date);
    console.log(date2);
    if(felhasznalo.name == ""){
      errors.push("Meg kell adni a neved")
    }
    if(date < date2){
      console.log("he");
      errors.push("A megadott dátum nem érvényes");
    }
    if(!count){
      errors.push("Meg kell adni a létszámot");
    }
    if(!/[A-z]@[A-z]./.test(felhasznalo.email)){
        errors.push("Az email nem megfelelő");
    }
    if(errors.length > 0){
      let fel = new Felhasznalo();
      fel.name = felhasznalo.name;
      fel.email = felhasznalo.email;
      fel.date = felhasznalo.date;
      fel.count = felhasznalo.count;
      response.render('login',{
        data: fel,
        errors: errors
      })
      return;
    }
    response.redirect('/success');
  }

  @Get('/success')
  @Render('success')
  successyey(){
  }
}
