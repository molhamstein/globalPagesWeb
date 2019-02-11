import {Component, EventEmitter, Input, OnInit,Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.css']
})
export class CategorySelectorComponent implements OnInit {

  Select(id){
    if(this.isSelected(id)) {
      this.selectedSubCategory.splice(this.selectedSubCategory.indexOf(id),1);
    }
    else
      this.selectedSubCategory.push(id);

    this.selectedSubCategoryChange.emit(this.selectedSubCategory)
  }
  constructor(private translteService:TranslateService) { }
  categories;
  subCategories;
  @Input('categories') set categoriesSetter (cat){
    if(cat){
      this.subCategories=[...cat];
      this.selectedCategory=cat[0];
    }
    this.categories=cat;

  }
  selectedCategory;
  @Input('selectedSubCategory') selectedSubCategory=[];
  @Output('changed') selectedSubCategoryChange=new EventEmitter()
  lang;
  ngOnInit() {
    this.lang=this.translteService.currentLang;
    this.translteService.onLangChange.subscribe(()=>{
      this.lang=this.translteService.currentLang;
    });
  }
  isSelected(id){
    if(this.selectedSubCategory)
    return this.selectedSubCategory.indexOf(id)!=-1;
  }

}

