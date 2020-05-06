import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    static angularRoutes: IAngularRoutes = {
        fullPath: 'full',
        redirectTo: '/user/login',
        user: 'user',
        login: 'login',
        image: 'image',
        upload: 'upload',
        list: 'list',
        paymentDetail: 'paymentDetail',
        weather: 'weather',
        home: 'home',
        forbidden: 'forbidden',
        adminPanel: 'adminPanel'
    };

    static angularImages: IAngularImages = {
        newImage: 'assets/img/new_image.png',
        imgSrcPlaceholder: 'http://placehold.jp/24/cccccc/ffffff/250x120.png?text=click here to upload'
    };

    static roles: IRoles = {
        admin: 'Admin',
        user: 'User'
    };

    static fireBase: IFireBase = {
        imageDetailListUrl: '/imageDetailList'
    };

    apiRoutes: IApiRoutes = {
        homeBaseUrl: 'http://localhost:56283',
        workBaseUrl: 'http://localhost:60702',
        userRegisterUrl: '/api/ApplicationUser/Register',
        userLoginUrl: '/api/ApplicationUser/Login',
        userProfileUrl: '/api/UserProfile',
        paymentDetailUrl: '/api/PaymentDetail'
    };
}

export interface IAngularRoutes {
    fullPath: string;
    redirectTo: string;
    user: string;
    login: string;
    image: string;
    upload: string;
    list: string;
    paymentDetail: string;
    weather: string;
    home: string;
    forbidden: string;
    adminPanel: string;
}

export interface IApiRoutes {
    homeBaseUrl: string;
    workBaseUrl: string;
    userRegisterUrl: string;
    userLoginUrl: string;
    userProfileUrl: string;
    paymentDetailUrl: string;
}

export interface IFireBase {
    imageDetailListUrl: string;
}

export interface IAngularImages {
    newImage: string;
    imgSrcPlaceholder: string;
}

export interface IRoles {
    admin: string;
    user: string;
}
