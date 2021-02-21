import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'volumeFilter'
})
export class VolumeFilterPipe implements PipeTransform {

  transform(volume: any[], filterObject: any): any {

    return volume.filter(ad => {
      let result: boolean = true;
      let byCategoryOrSubCategory: boolean;
      let byCountryOrCityOrLocation: boolean;
      let byKeywords: boolean;

      // Filter By Title
      if (filterObject.title) {
        byKeywords = ad.title.trim().toLowerCase().includes(filterObject.title.trim().toLowerCase())
        result = result && byKeywords;
      }

      // Filter By Category Or Subcategory
      if (filterObject.categoryId) {
        if (filterObject.subCategory && ad.hasOwnProperty('subCategoryId')) {
          byCategoryOrSubCategory = ad.subCategoryId === filterObject.subCategory;
        }
        else {
          byCategoryOrSubCategory = ad.categoryId === filterObject.categoryId;
        }
        result = result && byCategoryOrSubCategory;
      }

      // Filter By Country Or City Or Location
      if (filterObject.countryId) {
        if (filterObject.cityId) {
          if (filterObject.location) {
            byCountryOrCityOrLocation = ad.locationId === filterObject.location;
          }
          else {
            byCountryOrCityOrLocation = ad.cityId === filterObject.cityId;
          }
        }
        else {
          byCountryOrCityOrLocation = ad.countryId === filterObject.countryId;
        }
        result = result && byCountryOrCityOrLocation;
      }

      // retunr true when an AD has (like title) && 
      // (category || subcategory) && 
      // (country || city || location)
      return result;
    });
  }

}
