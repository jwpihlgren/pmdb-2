import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { CustomPageTitle } from '../interfaces/custom-page-title';

@Injectable({
    providedIn: 'root'
})
export class CustomTitleStrategyService extends TitleStrategy {

    protected readonly title: Title = inject(Title)
    constructor() {
        super()
    }


    override updateTitle(snapshot: RouterStateSnapshot): void {
        const baseTitle = "Pmdb2"

        const resolvedData = snapshot.root.children[snapshot.root.children.length - 1].data ?? undefined
        const dataKey = Object.keys(resolvedData)[0] ?? undefined
        const innerData: CustomPageTitle | undefined = resolvedData[dataKey] as CustomPageTitle || undefined
        const customPageTitle: string | undefined = innerData?.customPageTitle ?? undefined
        console.log(resolvedData)
        console.log(dataKey)
        console.log(customPageTitle)
        if(customPageTitle) {
            this.title.setTitle(`${baseTitle} - ${customPageTitle}`)
            return 
        }
        this.title.setTitle(baseTitle)

    }
}


