import { Injectable } from '@angular/core';

@Injectable()
export class Constants {
    static angularImages: IAngularImages = {
        newImage: 'assets/img/new_image.png'
    };

}

export interface IAngularImages {
    newImage: string;
}
