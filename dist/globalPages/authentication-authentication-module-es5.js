(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["authentication-authentication-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/authentication/forget-password/forget-password.component.html":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authentication/forget-password/forget-password.component.html ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"flat-row flat-login parallax1\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 col-sm-12\">\r\n        <div class=\"forget-form\">\r\n          <h3>{{'restorePassword' | translate}}</h3>\r\n          <form novalidate (submit)=\"submit(form.value)\" #form=\"ngForm\" accept-charset=\"utf-8\">\r\n            <div class=\"wrap-signup\">\r\n              <label>{{'email' | translate}}</label>\r\n              <input type=\"text\" class=\"email\" name=\"email\" ngModel #email=\"ngModel\" email required>\r\n            </div>\r\n            <app-form-validation-message [control]=\"email\" [messages]=\"{required:'emailIsRequired',email:'notAValidEmail'}\">\r\n            </app-form-validation-message>\r\n            <button type=\"submit\">\r\n              <div class=\"btn-more\">\r\n                <a title=\"\">{{'sendVerificationCode' | translate}}</a>\r\n              </div>\r\n            </button>\r\n          </form><!-- /form -->\r\n          <div *ngIf=\"verificationCode\" class=\"alert alert-info\" style=\"margin-top:50px\">\r\n            {{\"checkYourEmailForLink\"|translate}}\r\n          </div>\r\n        </div><!-- /.login-form -->\r\n      </div><!-- /.col-lg-4 -->\r\n\r\n    </div><!-- /.row -->\r\n  </div><!-- /.container -->\r\n  <div class=\"overlay1\"></div>\r\n</section><!-- /.flat-login -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authentication/log-in/log-in.component.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authentication/log-in/log-in.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"flat-row flat-login parallax1\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 col-sm-12\">\r\n        <div class=\"login-form\">\r\n          <h3>{{'login' | translate}}</h3>\r\n          <form novalidate (submit)=\"submit(form)\" #form=\"ngForm\" accept-charset=\"utf-8\">\r\n            <div class=\"wrap-login\">\r\n              <label>{{'username' | translate}}</label>\r\n              <input type=\"text\" class=\"username\" name=\"email\" ngModel #username=\"ngModel\" required>\r\n            </div>\r\n            <app-form-validation-message [control]=\"username\" [messages]=\"{'required':'usernameIsRequired'}\">\r\n            </app-form-validation-message>\r\n            <div class=\"wrap-login\">\r\n              <label>{{'password' | translate}}</label>\r\n              <input type=\"password\" class=\"password\" name=\"password\" ngModel required #password=\"ngModel\">\r\n            </div>\r\n            <app-form-validation-message [control]=\"password\" [messages]=\"{'required':'passwordIsRequired'}\">\r\n            </app-form-validation-message>\r\n            <div class=\"wrap-login remember\">\r\n              <div class=\"checkbox\">\r\n                <label>\r\n                  <input type=\"checkbox\">{{'rememberMe' | translate}}\r\n                </label>\r\n              </div>\r\n              <a [routerLink]=\"'/auth/forget'\" class=\"forgot\" title=\"\">{{'forgetPassword' | translate}}</a>\r\n\r\n              <a [routerLink]=\"'/auth/signup'\" class=\"forgot\" title=\"\">{{'createAccount' | translate}}&nbsp; &nbsp; &nbsp;</a>\r\n            </div>\r\n            <button type=\"submit\" [disabled]=\"form.invalid && form.submitted\">\r\n              <div class=\"btn-more\" >\r\n                <a title=\"\" >{{'login' | translate}}</a>\r\n              </div>\r\n            </button>\r\n          </form><!-- /form -->\r\n          <div class=\"alert alert-danger\" *ngIf=\"message\" style=\"margin-top: 20px\"> {{message | translate}}</div>\r\n        </div><!-- /.login-form -->\r\n      </div><!-- /.col-lg-4 -->\r\n\r\n    </div><!-- /.row -->\r\n  </div><!-- /.container -->\r\n  <div class=\"overlay1\"></div>\r\n</section><!-- /.flat-login -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authentication/reset/reset.component.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authentication/reset/reset.component.html ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"flat-row flat-login parallax1\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 col-sm-12\">\r\n        <div class=\"reset-form\">\r\n          <h3>{{ 'enterCodeAndNewPassword' | translate}}</h3>\r\n          <form novalidate (submit)=\"submit(form.value)\" #form=\"ngForm\" accept-charset=\"utf-8\">\r\n            <div class=\"wrap-reset\">\r\n              <label>{{ 'verificationCode' | translate}}</label>\r\n              <input type=\"text\" class=\"username\" name=\"username\" ngModel #verificationCode=\"ngModel\" required>\r\n            </div>\r\n            <app-form-validation-message [control]=\"verificationCode\" [messages]=\"{required:'verificationCodeIsRequired'}\">\r\n            </app-form-validation-message>\r\n            <div class=\"wrap-reset\">\r\n              <label>{{'newPassword' | translate}}</label>\r\n              <input type=\"password\" class=\"password\" name=\"password\" ngModel #password=\"ngModel\" required>\r\n            </div>\r\n            <app-form-validation-message [control]=\"password\" [messages]=\"{required:'passwordIsRequired'}\">\r\n\r\n            </app-form-validation-message>\r\n            <div class=\"wrap-reset\">\r\n              <label>{{'confirmNewPassword' | translate}}</label>\r\n              <input type=\"password\" class=\"password\" name=\"repassword\" ngModel #repassword=\"ngModel\" required>\r\n            </div>\r\n            <app-form-validation-message [control]=\"form\" [messages]=\"{passwordMatcher:'confirmPasswordAndPasswordNotSame'}\">\r\n            </app-form-validation-message>\r\n            <app-form-validation-message [control]=\"repassword\" [messages]=\"{required:'confirmPasswordIsRequired'}\">\r\n            </app-form-validation-message>\r\n            <button type=\"submit\" [disabled]=\"form.invalid\">\r\n              <div class=\"btn-more\">\r\n                <a title=\"\">{{ 'changePassword' | translate}}</a>\r\n              </div>\r\n            </button>\r\n          </form><!-- /form -->\r\n        </div><!-- /.login-form -->\r\n      </div><!-- /.col-lg-4 -->\r\n\r\n    </div><!-- /.row -->\r\n  </div><!-- /.container -->\r\n  <div class=\"overlay1\"></div>\r\n</section><!-- /.flat-login -->\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/authentication/sign-up/sign-up.component.html":
/*!*****************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/authentication/sign-up/sign-up.component.html ***!
  \*****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<section class=\"flat-row flat-login parallax1\">\r\n  <div class=\"container\">\r\n    <div class=\"row\">\r\n      <div class=\"col-lg-12 col-sm-12\">\r\n\r\n        <div class=\"signup-form\">\r\n          <h3>{{'createAccount' | translate}} </h3>\r\n          <form  novalidate (submit)=\"submit(form.value)\" #form=\"ngForm\" accept-charset=\"utf-8\" class=\"row\">\r\n            <div class=\"wrap-signup col-lg-6 col-sm-12\">\r\n              <label>{{'username' | translate}}</label>\r\n              <input type=\"text\" class=\"username\" name=\"username\" ngModel #username=\"ngModel\"  required>\r\n              <app-form-validation-message [control]=\"username\" [messages]=\"{required:'usernameIsRequired'}\">\r\n              </app-form-validation-message>\r\n            </div>\r\n            <div class=\"wrap-signup col-lg-6 col-sm-12\">\r\n              <label>{{'email' | translate}}</label>\r\n              <input type=\"text\" class=\"email\" name=\"email\" ngModel #email=\"ngModel\" email required>\r\n              <app-form-validation-message [control]=\"email\" [messages]=\"{required:'usernameIsRequired',email:'notAValidEmail'}\">\r\n              </app-form-validation-message>\r\n            </div>\r\n            <div class=\"wrap-signup col-lg-6 col-sm-12\">\r\n              <label>{{'password' | translate}}</label>\r\n              <input type=\"password\" class=\"password\" name=\"password\" ngModel #password=\"ngModel\" required>\r\n              <app-form-validation-message [control]=\"password\" [messages]=\"{required:'passwordIsRequired'}\">\r\n\r\n              </app-form-validation-message>\r\n            </div>\r\n            <!--<div class=\"wrap-signup col-lg-6 col-sm-12\">-->\r\n              <!--<label>{{'confirmPassword' | translate}}</label>-->\r\n              <!--<input type=\"password\" class=\"password\" name=\"repassword\" ngModel #repassword=\"ngModel\" required>-->\r\n            <!--</div>-->\r\n            <!--<app-form-validation-message [control]=\"form\" [messages]=\"{passwordMatcher:'confirmPasswordAndPasswordNotSame'}\">-->\r\n            <!--</app-form-validation-message>-->\r\n            <!--<app-form-validation-message [control]=\"repassword\" [messages]=\"{required:'confirmPasswordIsRequired'}\">-->\r\n            <!--</app-form-validation-message>-->\r\n            <div class=\"wrap-signup col-lg-6 col-sm-12 phone\">\r\n              <label>{{'phoneNumber' | translate}}</label>\r\n              <input type=\"text\" class=\"phoneNumber\" name=\"phoneNumber\" ngModel #phoneNumber=\"ngModel\" required>\r\n              <app-form-validation-message [control]=\"phoneNumber\" [messages]=\"{required:'phoneNumberIsRequired'}\">\r\n              </app-form-validation-message>\r\n            </div>\r\n            <!--<div class=\"wrap-signup col-lg-6 col-sm-12 category\">-->\r\n              <!--<label>{{'gender' | translate}}</label>-->\r\n              <!--<span class=\"ti-angle-down\"></span>-->\r\n              <!--<select name=\"gender\" ngModel #gender=\"ngModel\" required>-->\r\n                <!--<option value=\"male\">{{'male' | translate}} </option>-->\r\n                <!--<option value=\"female\">{{'female' | translate}}</option>-->\r\n              <!--</select>-->\r\n              <!--<app-form-validation-message [control]=\"gender\" [messages]=\"{required:'genderIsRequired'}\">-->\r\n              <!--</app-form-validation-message>-->\r\n            <!--</div>-->\r\n            <!--<div class=\"wrap-signup col-lg-6 col-sm-12\">-->\r\n              <!--<label>{{'birth' | translate}}</label>-->\r\n              <!--<input type=\"date\"  name=\"birthDate\" ngModel #birth=\"ngModel\" required>-->\r\n              <!--<app-form-validation-message [control]=\"birth\" [messages]=\"{required:'birthIsRequired'}\">-->\r\n              <!--</app-form-validation-message>-->\r\n            <!--</div>-->\r\n            <button type=\"submit\" [disabled]=\"form.invalid && form.submitted\">\r\n              <div class=\"btn-more\">\r\n                <a title=\"\">{{'createAccount' | translate}}</a>\r\n              </div>\r\n            </button>\r\n          </form><!-- /form -->\r\n        </div><!-- /.login-form -->\r\n      </div><!-- /.col-lg-4 -->\r\n\r\n    </div><!-- /.row -->\r\n  </div><!-- /.container -->\r\n  <div class=\"overlay1\"></div>\r\n</section><!-- /.flat-login -->\r\n"

/***/ }),

/***/ "./src/app/authentication/authentication.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/authentication.module.ts ***!
  \*********************************************************/
/*! exports provided: AuthenticationModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationModule", function() { return AuthenticationModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _log_in_log_in_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./log-in/log-in.component */ "./src/app/authentication/log-in/log-in.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./sign-up/sign-up.component */ "./src/app/authentication/sign-up/sign-up.component.ts");
/* harmony import */ var _reset_reset_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./reset/reset.component */ "./src/app/authentication/reset/reset.component.ts");
/* harmony import */ var _forget_password_forget_password_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./forget-password/forget-password.component */ "./src/app/authentication/forget-password/forget-password.component.ts");
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @ngx-translate/core */ "./node_modules/@ngx-translate/core/fesm5/ngx-translate-core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");











var route = [
    { path: '', component: _log_in_log_in_component__WEBPACK_IMPORTED_MODULE_3__["LogInComponent"] },
    { path: 'login', component: _log_in_log_in_component__WEBPACK_IMPORTED_MODULE_3__["LogInComponent"] },
    { path: 'signup', component: _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_6__["SignUpComponent"] },
    { path: 'reset', component: _reset_reset_component__WEBPACK_IMPORTED_MODULE_7__["ResetComponent"] },
    { path: 'forget', component: _forget_password_forget_password_component__WEBPACK_IMPORTED_MODULE_8__["ForgetPasswordComponent"] },
];
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_4__["RouterModule"].forChild(route),
                _ngx_translate_core__WEBPACK_IMPORTED_MODULE_9__["TranslateModule"].forChild(),
                _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"]
            ],
            declarations: [_log_in_log_in_component__WEBPACK_IMPORTED_MODULE_3__["LogInComponent"], _sign_up_sign_up_component__WEBPACK_IMPORTED_MODULE_6__["SignUpComponent"], _reset_reset_component__WEBPACK_IMPORTED_MODULE_7__["ResetComponent"], _forget_password_forget_password_component__WEBPACK_IMPORTED_MODULE_8__["ForgetPasswordComponent"],]
        })
    ], AuthenticationModule);
    return AuthenticationModule;
}());



/***/ }),

/***/ "./src/app/authentication/forget-password/forget-password.component.css":
/*!******************************************************************************!*\
  !*** ./src/app/authentication/forget-password/forget-password.component.css ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button{\r\n  display: contents;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aGVudGljYXRpb24vZm9yZ2V0LXBhc3N3b3JkL2ZvcmdldC1wYXNzd29yZC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvYXV0aGVudGljYXRpb24vZm9yZ2V0LXBhc3N3b3JkL2ZvcmdldC1wYXNzd29yZC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9ue1xyXG4gIGRpc3BsYXk6IGNvbnRlbnRzO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/authentication/forget-password/forget-password.component.ts":
/*!*****************************************************************************!*\
  !*** ./src/app/authentication/forget-password/forget-password.component.ts ***!
  \*****************************************************************************/
/*! exports provided: ForgetPasswordComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ForgetPasswordComponent", function() { return ForgetPasswordComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");




var ForgetPasswordComponent = /** @class */ (function () {
    function ForgetPasswordComponent(http) {
        this.http = http;
        this.verificationCode = false;
    }
    ForgetPasswordComponent.prototype.ngOnInit = function () {
    };
    ForgetPasswordComponent.prototype.submit = function (data) {
        var _this = this;
        if (this.form.valid)
            this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api + 'users/forgotPassword', data).toPromise().then(function (data) {
                _this.verificationCode = true;
            });
    };
    ForgetPasswordComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('form', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ForgetPasswordComponent.prototype, "form", void 0);
    ForgetPasswordComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-forget-password',
            template: __webpack_require__(/*! raw-loader!./forget-password.component.html */ "./node_modules/raw-loader/index.js!./src/app/authentication/forget-password/forget-password.component.html"),
            styles: [__webpack_require__(/*! ./forget-password.component.css */ "./src/app/authentication/forget-password/forget-password.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], ForgetPasswordComponent);
    return ForgetPasswordComponent;
}());



/***/ }),

/***/ "./src/app/authentication/log-in/log-in.component.css":
/*!************************************************************!*\
  !*** ./src/app/authentication/log-in/log-in.component.css ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button{\r\n  display: contents;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aGVudGljYXRpb24vbG9nLWluL2xvZy1pbi5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsaUJBQWlCO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvYXV0aGVudGljYXRpb24vbG9nLWluL2xvZy1pbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiYnV0dG9ue1xyXG4gIGRpc3BsYXk6IGNvbnRlbnRzO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/authentication/log-in/log-in.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/authentication/log-in/log-in.component.ts ***!
  \***********************************************************/
/*! exports provided: LogInComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogInComponent", function() { return LogInComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth.service */ "./src/app/authentication/auth.service.ts");






var LogInComponent = /** @class */ (function () {
    function LogInComponent(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
    }
    LogInComponent.prototype.ngOnInit = function () {
    };
    LogInComponent.prototype.submit = function (form) {
        var _this = this;
        this.message = null;
        if (form.invalid)
            return;
        var data = form.value;
        this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api + 'users/login', data).subscribe(function (data) {
            localStorage.setItem(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].userDetails, JSON.stringify(data));
            _this.auth.logIn(data);
            _this.router.navigate(['']);
        }, function (error) {
            // console.log(error)
            // if(error['error']['error']['statusCode']==401)
            {
                _this.message = error['error']['error']['code'];
            }
        });
    };
    LogInComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }
    ]; };
    LogInComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-log-in',
            template: __webpack_require__(/*! raw-loader!./log-in.component.html */ "./node_modules/raw-loader/index.js!./src/app/authentication/log-in/log-in.component.html"),
            styles: [__webpack_require__(/*! ./log-in.component.css */ "./src/app/authentication/log-in/log-in.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]])
    ], LogInComponent);
    return LogInComponent;
}());



/***/ }),

/***/ "./src/app/authentication/reset/reset.component.css":
/*!**********************************************************!*\
  !*** ./src/app/authentication/reset/reset.component.css ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button{\r\n  display: contents;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aGVudGljYXRpb24vcmVzZXQvcmVzZXQuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQjtBQUNuQiIsImZpbGUiOiJzcmMvYXBwL2F1dGhlbnRpY2F0aW9uL3Jlc2V0L3Jlc2V0LmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyJidXR0b257XHJcbiAgZGlzcGxheTogY29udGVudHM7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/authentication/reset/reset.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/authentication/reset/reset.component.ts ***!
  \*********************************************************/
/*! exports provided: ResetComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResetComponent", function() { return ResetComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_passwordMatcher_password_matcher__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../shared/passwordMatcher/password-matcher */ "./src/app/shared/passwordMatcher/password-matcher.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");





var ResetComponent = /** @class */ (function () {
    function ResetComponent(http) {
        this.http = http;
    }
    ResetComponent.prototype.ngOnInit = function () {
    };
    ResetComponent.prototype.ngAfterViewInit = function () {
        console.log(this.form);
        this.form.form.setValidators(Object(_shared_passwordMatcher_password_matcher__WEBPACK_IMPORTED_MODULE_2__["passwordMatcher"])('password', 'repassword'));
    };
    ResetComponent.prototype.submit = function (data) {
        if (this.form.valid)
            this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api + 'users/resetPassword', data).toPromise().then(function (data) {
            });
    };
    ResetComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('form', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], ResetComponent.prototype, "form", void 0);
    ResetComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reset',
            template: __webpack_require__(/*! raw-loader!./reset.component.html */ "./node_modules/raw-loader/index.js!./src/app/authentication/reset/reset.component.html"),
            styles: [__webpack_require__(/*! ./reset.component.css */ "./src/app/authentication/reset/reset.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]])
    ], ResetComponent);
    return ResetComponent;
}());



/***/ }),

/***/ "./src/app/authentication/sign-up/sign-up.component.css":
/*!**************************************************************!*\
  !*** ./src/app/authentication/sign-up/sign-up.component.css ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button{\r\n  display: contents;\r\n}\r\noption\r\n{\r\n  color:black;\r\n}\r\n\r\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXV0aGVudGljYXRpb24vc2lnbi11cC9zaWduLXVwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBaUI7QUFDbkI7QUFDQTs7RUFFRSxXQUFXO0FBQ2IiLCJmaWxlIjoic3JjL2FwcC9hdXRoZW50aWNhdGlvbi9zaWduLXVwL3NpZ24tdXAuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbImJ1dHRvbntcclxuICBkaXNwbGF5OiBjb250ZW50cztcclxufVxyXG5vcHRpb25cclxue1xyXG4gIGNvbG9yOmJsYWNrO1xyXG59XHJcbiJdfQ== */"

/***/ }),

/***/ "./src/app/authentication/sign-up/sign-up.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/authentication/sign-up/sign-up.component.ts ***!
  \*************************************************************/
/*! exports provided: SignUpComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SignUpComponent", function() { return SignUpComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _auth_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../auth.service */ "./src/app/authentication/auth.service.ts");






var SignUpComponent = /** @class */ (function () {
    function SignUpComponent(http, router, auth) {
        this.http = http;
        this.router = router;
        this.auth = auth;
    }
    SignUpComponent.prototype.ngOnInit = function () {
    };
    SignUpComponent.prototype.ngAfterViewInit = function () {
        // this.form.form.setValidators(passwordMatcher('password','repassword'))
    };
    SignUpComponent.prototype.submit = function (data) {
        var _this = this;
        delete data['repassword'];
        if (!this.form.invalid) {
            this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api + 'users', data).toPromise().then(function (data1) {
                _this.http.post(_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api + 'users/login', { email: data["email"], password: data["password"] }).toPromise().then(function (data2) {
                    // localStorage.setItem(environment.userDetails,JSON.stringify(data2));
                    _this.auth.logIn(data2);
                    _this.router.navigate(['profile'], { fragment: 'chooseCategory' });
                });
                // this.router.navigate(['auth/login'])
            });
        }
    };
    SignUpComponent.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('form', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], SignUpComponent.prototype, "form", void 0);
    SignUpComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-sign-up',
            template: __webpack_require__(/*! raw-loader!./sign-up.component.html */ "./node_modules/raw-loader/index.js!./src/app/authentication/sign-up/sign-up.component.html"),
            styles: [__webpack_require__(/*! ./sign-up.component.css */ "./src/app/authentication/sign-up/sign-up.component.css")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"], _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"], _auth_service__WEBPACK_IMPORTED_MODULE_5__["AuthService"]])
    ], SignUpComponent);
    return SignUpComponent;
}());



/***/ }),

/***/ "./src/app/shared/passwordMatcher/password-matcher.ts":
/*!************************************************************!*\
  !*** ./src/app/shared/passwordMatcher/password-matcher.ts ***!
  \************************************************************/
/*! exports provided: passwordMatcher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "passwordMatcher", function() { return passwordMatcher; });
function passwordMatcher(first, second) {
    return function (control) {
        if (first && second) {
            var f = control.get(first);
            var s = control.get(second);
            if (f && s && f.value && s.value && f.value != s.value) {
                return {
                    passwordMatcher: true
                };
            }
        }
        return undefined;
    };
}


/***/ })

}]);
//# sourceMappingURL=authentication-authentication-module-es5.js.map