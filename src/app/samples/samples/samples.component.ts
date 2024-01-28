import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../../pages/pages-menu';

@Component({
  selector: 'ngx-samples',
  styleUrls: ['./samples.component.scss'],
  template: `
    
    <nb-layout>
    <nb-layout-header >
        <div class="container">
            <div class="row top-buffer">
         
              <div class="col-sm-6 col-xs-6 col-lg-8">
                LOGO
             </div>
              <div class="col-sm-6 col-xs-6 col-lg-4">
                <div class="row top-buffer bottom-buffer">
                    <div class="col-sm-3 col-xs-3 col-lg-3"><div class="col-sm-12 col-xs-12 col-lg-12">Topic 1</div> </div>
                    <div class="col-sm-3 col-xs-3 col-lg-3"><div class="col-sm-12 col-xs-12 col-lg-12">Topic 2</div> </div>
                    <div class="col-sm-3 col-xs-3 col-lg-3"><div class="col-sm-12 col-xs-12 col-lg-12">Topic 3</div> </div>
                    <div class="col-sm-3 col-xs-3 col-lg-3"> <div class="col-sm-12 col-xs-12 col-lg-12">Topic 4</div></div>
                 </div>
                 <div class="row float-right bottom-buffer"> 
                    <div class="col-sm-12 col-xs-12 col-lg-12 "><div class="col-sm-12 col-xs-12 col-lg-12">
                        <div class="input-group">
                            <input class="form-control border-end-0 border" type="search" value="search" id="example-search-input">
                            <span class="input-group-append">
                                <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                        </div>
                    </div> </div>
                    
                 </div>
              </div>
            </div>
        </div>
    </nb-layout-header>

    <nb-layout-header subheader ><div class="container text-center"> <div class="row">Header name</div></div>  </nb-layout-header>
    <nb-sidebar>    <nb-card>
    <nb-menu [items]="menu"></nb-menu>
    </nb-card></nb-sidebar>
    <nb-layout-column > 
      <router-outlet></router-outlet>
  </nb-layout-column >
      <nb-layout>
  `,
})
export class SamplesComponent {
  menu = MENU_ITEMS;
}

