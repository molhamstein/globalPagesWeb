import {Component, OnInit, ViewChild} from '@angular/core';
import {RequestsService} from '../../requests.service';
import {ActivatedRoute} from '@angular/router';
import {format} from 'date-fns'
import {HttpParams} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../authentication/auth.service';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  constructor(private api:RequestsService,private route:ActivatedRoute,private translteService:TranslateService,private auth:AuthService) { }
  user
  id
  ads
  businesses
  postCategories
  lang
  categories={}
  selectedSubCategory=[]
  @ViewChild('myModal',{static:false}) modal
  ngAfterViewInit() {
   this.route.fragment.subscribe((f)=>{
     console.log(f)
     if(f=="chooseCategory")
       setTimeout(()=>{
         this.modal.open();
       })
   })

  }
  ngOnInit() {
    this.lang=this.translteService.currentLang
    this.translteService.onLangChange.subscribe(()=>{
      this.lang=this.translteService.currentLang
    })
    this.auth.userData.subscribe((data)=>{
      this.id=data['id']
      // this.api.get('users').toPromise().then((data)=>{
      //
      // })
      this.api.get('users/'+data['id']).toPromise().then((data)=>{
        data['birthDate']= format(new Date(data['birthDate']),'DD-MM-YYYY')
        this.user=data;
        this.user['postCategoriesIds'].forEach((id)=>{
          this.categories[id]=true;
        })
      })
      var p=new HttpParams()
      p=p.set('filter',JSON.stringify({
        where:{
          ownerId:this.id
        }
      }))
      this.api.get('posts',p).toPromise().then((data)=>{
        this.ads=data
      })
      this.api.get('businesses',p).toPromise().then((data)=>{
        this.businesses=data
      })
    })
    let postParams=new HttpParams()
    postParams=postParams.set('filter',JSON.stringify({
      include:'subCategories',
      where:{parentCategoryId:{exists:false}},
    }))
    this.api.get('postCategories',postParams).toPromise().then((data)=>{
      this.postCategories=data
    })

  }
  editCat(data){
    // var categories =Object.entries(this.categories).filter(cat => cat[1]).map(cat=>cat[0])
    this.api.put('users/' + this.id, {postCategoriesIds: data}).toPromise().then((data) => {
    })
  }

  removeBusiness(business,index){
    this.api.delete('businesses',business['id']).subscribe(data=>{
      this.businesses.splice(index,1);
    })

  }
  removePost(ad,index){
    this.api.delete('posts',ad['id']).subscribe(data=>{
      this.ads.splice(index,1);
    })

  }


}
