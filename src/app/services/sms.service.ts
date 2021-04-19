import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


@Injectable({
    "providedIn": "root"
})
export class SMSService {

    constructor(private http: HttpClient) { }

    sendNewCode(ownerId: string): Observable<any> {
        return this.http.post(environment.api + "activationCodes/sendNewCode", { ownerId: ownerId });
    }

    activateUser(code: string, ownerId: string): Observable<any> {
        return this.http.post(environment.api + "users/activateUser", { code: code, ownerId: ownerId });
    }
}