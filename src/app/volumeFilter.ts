import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "volumeFilter", pure: false })
export class volumeFilter implements PipeTransform {
    transform(value: any[], searchObject: any) {

        if (Object.values(searchObject).every(elem => {
            return (
                (elem == undefined) || (elem && elem == '0' && elem != searchObject.keywords)
            )
        })) {
            return value
        }

        return value.filter(it => {
            let result: boolean = true;
            let byCategoryOrSubCategory: boolean;
            let byCityOrLocation: boolean;
            let byKeywords: boolean;

            if (searchObject.categoryId && searchObject.categoryId != '0') {
                if (searchObject.subCatId && searchObject.subCatId != '0' && it.hasOwnProperty('subCategoryId')) {
                    byCategoryOrSubCategory = it.subCategoryId == searchObject.subCatId;
                } else {
                    byCategoryOrSubCategory = it.categoryId == searchObject.categoryId;
                }
                result = result && byCategoryOrSubCategory;
            }
            if (searchObject.cityId && searchObject.cityId != '0') {
                if (searchObject.locationId && searchObject.locationId != '0') {
                    byCityOrLocation = it.locationId == searchObject.locationId;
                } else {
                    byCityOrLocation = it.cityId == searchObject.cityId;
                }
                result = result && byCityOrLocation;
            }
            if (searchObject.keywords) {
                byKeywords = it.title.trim().toLowerCase().includes(searchObject.keywords.trim().toLowerCase())
                result = result && byKeywords;
            }


            return result;
        })
    }
}